import { ClipboardEventHandler, useEffect, useState } from "react";
import Input, { IInput } from "./Input";
export const FormContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full h-screen space-y-4 flex flex-col justify-center items-center bg-secondary text-white'>
      {children}
    </div>
  );
};
