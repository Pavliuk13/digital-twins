import { useRef, useEffect, useMemo } from 'react';

interface Options {
  condition?: () => boolean;
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
}

export const useEventListener = <T extends keyof WindowEventMap>(
  eventName: T,
  handler: (event: WindowEventMap[T]) => void,
  element: HTMLElement | Document | Window = window,
  options: Options = {},
) => {
  const { condition = () => true, capture, passive, once } = options;
  // Create a ref that stores handler
  const savedHandler = useRef<(event: WindowEventMap[T]) => void>();
  const memoizedCondition = useMemo(() => condition(), [condition]);

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: WindowEventMap[T]) => {
      // TODO: Remove temporary condition to support legacy modals
      if (!window.preventEnterPress && memoizedCondition) {
        savedHandler.current?.(event);
      }
    };
    const opts = { capture, passive, once };

    if (element) {
      element.addEventListener(eventName, eventListener, opts);
    }

    return () => {
      if (element) {
        element.removeEventListener(eventName, eventListener, opts);
      }
    };
  }, [eventName, element, capture, passive, once, memoizedCondition]);
};
