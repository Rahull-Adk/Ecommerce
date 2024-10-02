import { useState } from "react";

export const useHandleQuantity = () => {
  const [quantity, setQuantity] = useState<number>(1);

  const increment = () => {
    setQuantity(quantity + 1);
    console.log(quantity);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
    console.log(quantity);
  };

  return { quantity, increment, decrement };
};
