import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const id = setTimeout(() => {
      if (hash) document.querySelector(hash)?.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: "instant" });
    }, 400); // wag vir die uitgaan-animasie
    return () => clearTimeout(id);
  }, [pathname, hash]);

  return null;
}