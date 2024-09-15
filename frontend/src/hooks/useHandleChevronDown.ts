import { useState } from "react";

export function useHandleChevronDown() {
  const [activeDown, setActiveDown] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>("");

  const toggleMenu = (id: string) => {
    setActiveItem((prevActiveItem): any => (prevActiveItem === id ? null : id));
  };

  function handleActiveDown(id: string) {
    setActiveDown(!activeDown);
    toggleMenu(id);
  }

  return {
    activeDown,
    activeItem,
    handleActiveDown,
  };
}
