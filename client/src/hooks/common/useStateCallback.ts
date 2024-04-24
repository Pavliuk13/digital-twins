import {
  SetStateAction,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

type SetStateCallback<T> = (state: T) => void;

export const useStateCallback = <T>(
  initialState: T | (() => T),
): [T, (state: SetStateAction<T>, cb?: SetStateCallback<T>) => void] => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef<SetStateCallback<T> | null>(null); // mutable ref to store current callback

  const setStateCallback = useCallback(
    (setStateAction: SetStateAction<T>, cb?: SetStateCallback<T>): void => {
      if (cb) {
        cbRef.current = cb; // store passed callback to ref
      }

      setState(setStateAction);
    },
    [],
  );

  useEffect(() => {
    // cb.current is null on initial render, so we only execute cb on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
};
