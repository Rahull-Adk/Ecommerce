import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelicon: IconProp;

  disclaimer: string | null;
  valid: boolean;
  value: string;
}

const Input = (props: IInput) => {
  const { label, labelicon, disclaimer, valid } = props;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <section className="w-full flex   justify-center text-white ">
        <div
          className={`flex items-center w-[22rem] h-11 rounded-md bg-darkmode_support_background border-darkmode_primary border py-4 px-4`}
        >
          <input
            type={label.toLowerCase()}
            className="w-full outline-none placeholder:text-sm bg-darkmode_support_background"
            id={label}
            {...props}
            placeholder={label}
          />
        </div>
      </section>
      {!valid && (
        <p className="text-red-500 w-[22rem] mt-2 ml-2 text-sm">{disclaimer}</p>
      )}
    </div>
  );
};

export default Input;
