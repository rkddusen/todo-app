import { useState, useRef, useEffect } from "react";

export const useTheme = () => {
  let initTheme = "";
  if (window.localStorage.getItem("themeMode")) {
    initTheme = window.localStorage.getItem("themeMode");
  } else {
    // 브라우저 테마 정보 확인
    const isBrowserDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    initTheme = isBrowserDarkMode ? "dark" : "light";
  }

  const [themeMode, setThemeMode] = useState(initTheme);

  const mediaQuery = useRef(null);

  useEffect(() => {
    mediaQuery.current = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setThemeMode(mediaQuery.current.matches ? "dark" : "light");
    };

    mediaQuery.current.addListener(handleChange);
    return () => mediaQuery.current.removeListener(handleChange);
  }, []);

  return [themeMode, setThemeMode];
};
