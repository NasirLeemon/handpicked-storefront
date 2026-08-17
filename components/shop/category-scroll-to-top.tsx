"use client";

import { useEffect } from "react";

export function CategoryScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
