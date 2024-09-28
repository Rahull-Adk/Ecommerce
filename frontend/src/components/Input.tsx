import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelicon: IconProp;
  icon: IconProp;
  disclaimer: string | null;
  valid: boolean;
  value: string;
}

const Input = (props: IInput) => {
  const { label, labelicon, icon, disclaimer, valid } = props;

  return (
    <div className="w-[90%] flex flex-col items-center justify-center">
      <section className="w-[90%] flex   justify-center text-black ">
        <div
          className={`flex items-center w-[22rem] h-10 rounded-sm bg-white px-3`}
        >
          <FontAwesomeIcon icon={labelicon} className="size-4 mr-4" />
          <input
            type={label.toLowerCase()}
            className="w-full outline-none placeholder:text-xs"
            id={label}
            {...props}
            placeholder={label}
          />
          <FontAwesomeIcon
            icon={icon}
            className={`size-4 ${valid ? "text-green-500" : "text-red-500"}`}
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
