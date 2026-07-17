"use client";

import { useEffect, useState } from "react";

export default function useLaunch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const launched = sessionStorage.getItem("portfolio-launch");

    if (launched) {
      setOpen(true);
    }
  }, []);

  function enterPortfolio() {
    sessionStorage.setItem("portfolio-launch", "true");
    setOpen(true);
  }

  return {
    open,
    enterPortfolio,
  };
}