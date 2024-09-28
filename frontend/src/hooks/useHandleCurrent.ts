import { useState } from "react";

export function useHandleCurrent() {
  const [currentTraget, setCurrentTarget] = useState<string>("Email");
  function handleCurrentTarget(str: string) {
    setCurrentTarget(str);
  }
  return {
    currentTraget,
    handleCurrentTarget,
  };
}
