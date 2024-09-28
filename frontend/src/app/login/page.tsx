"use client";

import Button from "@/src/components/Button";
import { FormContainer } from "@/src/components/Form";
import Input from "@/src/components/Input";
import {
  faCircleCheck,
  faCircleExclamation,
  faEnvelope,
  faKey,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { emailRegex, passwordRegex } from "@/src/utils/storage";
import { useHandleValidInput } from "@/src/hooks/useHandleValidInput";
import useFormData from "@/src/hooks/useFormData";
import { useHandleCurrent } from "@/src/hooks/useHandleCurrent";

const page = () => {
  const { formData, handleInputChange, submitForm } = useFormData({
    email: "",
    password: "",
  });

  const { currentTraget, handleCurrentTarget } = useHandleCurrent();

  const email = formData["email"];
  const password = formData["password"];

  console.log(email);
  console.log(password);

  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);

  useEffect(() => {
    setEmailValid(useHandleValidInput(emailRegex, email));
    setPasswordValid(useHandleValidInput(passwordRegex, password));
  }, [email, password]);

  const login = [
    {
      label: "Email",
      icon: emailValid ? faCircleCheck : faCircleExclamation,
      labelicon: faEnvelope,
      disclaimer: null,
      valid: emailValid,
      value: email,
    },
    {
      label: "Password",
      labelicon: faKey,
      icon: passwordValid ? faCircleCheck : faCircleExclamation,
      disclaimer: null,
      valid: passwordValid,
      value: password,
    },
  ];

  return (
    <FormContainer>
      <Title text="Login" />
      <form
        onSubmit={submitForm}
        className="space-y-4 w-full flex flex-col justify-center items-center"
      >
        {login.map((form, i) => (
          <Input
            valid={form.valid}
            value={formData[form.label]}
            onChange={handleInputChange}
            key={i}
            label={form.label.toLowerCase()}
            labelicon={form.labelicon}
            icon={form.icon}
            disclaimer={form.disclaimer}
          />
        ))}
      </form>
      <div id="checkbox" className="flex justify-between w-[90%]">
        <div className="space-x-1">
          <input type="checkbox" id="login" />
          <label className="text-sm" htmlFor="login">
            Remember me
          </label>
        </div>
        <a className="text-sm text-blue-500 underline">Forget password?</a>
      </div>
      <Button text={"Submit"} />
      <p className="text-sm pt-4">
        Don't have an accout?
        <Link
          href={"/register"}
          className="cursor-pointer underline text-blue-500"
        >
          Register
        </Link>
      </p>
    </FormContainer>
  );
};

export const Title = ({ text }: { text: string }) => {
  return <div className="font-semibold text-4xl ">{text}</div>;
};

export default page;
