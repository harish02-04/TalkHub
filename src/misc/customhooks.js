import { useCallback, useState, useEffect } from 'react';

// eslint-disable-next-line no-unused-vars
export function useModalstate(_defaultValue = false) {
  const [isopen, setisopen] = useState();
  const open = useCallback(() => setisopen(true), []);
  const close = useCallback(() => setisopen(false), []);
  return { isopen, open, close };
}
export const useMediaQuery = query => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  // eslint-disable-next-line no-undef
  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = evt => setMatches(evt.matches);

    queryList.addListener(listener);
    return () => queryList.removeListener(listener);
  }, [query]);

  return matches;
};
