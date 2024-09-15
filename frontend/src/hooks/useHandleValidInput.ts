import { useEffect, useState } from "react";

export function useHandleValidInput(regex: RegExp, value: string) {
  let valid = regex.test(value);

  return valid;
}
