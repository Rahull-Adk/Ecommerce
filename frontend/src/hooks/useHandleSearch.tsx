"use client";
import { useState } from "react";

export function useHandleSearch() {
  const [active, setActive] = useState<boolean>(false);

  function handleSearchBar() {
    setActive((prev) => !prev);
  }

  return { active, handleSearchBar };
}
