import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelicon: IconProp;
  icon: IconProp;
  disclaimer: string;
  valid: boolean;
  value: string;
}

const Input = (props: IInput) => {
  const { label, labelicon, icon, disclaimer, valid } = props;

  return (
    <section className='w-[90%] text-black '>
      <div className='flex items-center w-full h-10 rounded-sm bg-white px-3'>
        <FontAwesomeIcon icon={labelicon} className='size-4 mr-4' />
        <input
          type={label.toLowerCase()}
          className='w-full outline-none placeholder:text-xs'
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
  );
};

export default Input;
