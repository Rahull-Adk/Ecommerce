"use client";

import { useState } from "react";

export function useHandleMenu() {
  const [activeMenu, setActive] = useState<boolean>(false);

  function handleMenu() {
    setActive(!activeMenu);
  }
  return { activeMenu, handleMenu };
}
