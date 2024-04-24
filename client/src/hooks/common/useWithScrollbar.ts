import { useState, useRef, RefCallback, MutableRefObject } from 'react';
import { useResizeObserverRef } from 'rooks';

interface UseWithScrollbarOptions<T> {
  targetRef?: MutableRefObject<T | null>;
}

export const useWithScrollbar = <T extends HTMLElement | null>({
  targetRef,
}: UseWithScrollbarOptions<T> = {}) => {
  const [withScrollbar, setWithScrollbar] = useState(false);

  const ref = useRef<T>();
  const actualRef = targetRef || ref;

  const handleResize = () => {
    if (actualRef.current) {
      setWithScrollbar(
        actualRef.current.scrollHeight > actualRef.current.clientHeight,
      );
    }
  };

  const [observerRef] = useResizeObserverRef(handleResize);

  const setRef: RefCallback<T> = (node) => {
    actualRef.current = node;
    observerRef(node);
  };

  return [withScrollbar, setRef] as const;
};
