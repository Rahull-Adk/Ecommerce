"use client";

import { FormContainer } from "@/src/components/Form";
import {
  faCircleCheck,
  faCircleExclamation,
  faEnvelope,
  faKey,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Title } from "../login/page";
import Button from "@/src/components/Button";
import Link from "next/link";
import Input from "@/src/components/Input";
import useFormData from "@/src/hooks/useFormData";
import { emailRegex, passwordRegex, usernameRegex } from "@/src/utils/storage";
import { useHandleValidInput } from "@/src/hooks/useHandleValidInput";

const page = () => {
  const { formData, handleInputChange, submitForm } = useFormData({
    email: "",
    username: "",
    password: "",
    fullname: "",
  });

  const email = formData["email"];
  const password = formData["password"];
  const username = formData["username"];
  const fullname = formData["fullname"];

  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [usernameValid, setUsernameValid] = useState<boolean>(false);
  const [fullnameValid, setFullnameValid] = useState<boolean>(false);

  useEffect(() => {
    setEmailValid(useHandleValidInput(emailRegex, email));
    setPasswordValid(useHandleValidInput(passwordRegex, password));
    setUsernameValid(useHandleValidInput(usernameRegex, username));
    if (fullname.length > 0) {
      setFullnameValid(true);
    }
  }, [email, password, fullname, username]);

  const register = [
    {
      label: "Email",
      icon: emailValid ? faCircleCheck : faCircleExclamation,
      labelicon: faEnvelope,
      disclaimer: "Error",
      valid: emailValid,
      value: email,
    },
    {
      label: "Username",
      labelicon: faUser,
      icon: usernameValid ? faCircleCheck : faCircleExclamation,
      disclaimer: "Error",
      valid: usernameValid,
      value: username,
    },
    {
      label: "Fullname",
      labelicon: faUser,
      icon: fullnameValid ? faCircleCheck : faCircleExclamation,
      disclaimer: "Error",
      valid: fullnameValid,
      value: fullname,
    },
    {
      label: "Password",
      labelicon: faKey,
      icon: passwordValid ? faCircleCheck : faCircleExclamation,
      disclaimer: "Error",
      valid: passwordValid,
      value: password,
    },
  ];
  return (
    <FormContainer>
      <Title text='Register' />
      <form
        onSubmit={submitForm}
        className='space-y-4 w-full flex flex-col justify-center items-center'
      >
        {register.map((form, i) => (
          <Input
            valid={form.valid}
            value={formData[form.label]}
            onChange={handleInputChange}
            key={i}
            label={form.label.toLowerCase()}
            labelicon={form.labelicon}
            icon={form.icon}
            disclaimer={form.disclaimer}
            autoComplete='off'
          />
        ))}
      </form>
      <div id='checkbox' className='flex justify-between w-[90%]'>
        <div className='space-x-1 items-center'>
          <input type='checkbox' id='register' />
          <label className='text-xs text-gray-400' htmlFor='register'>
            I accept{" "}
            <strong className='text-white'>
              Terms of Service and Privacy Policy.
            </strong>
          </label>
        </div>
      </div>
      <Button text={"Submit"} />
      <p className='text-sm pt-4'>
        have an accout?
        <Link href='/login' className='underline text-blue-500'>
          {" "}
          Sign In
        </Link>
      </p>
    </FormContainer>
  );
};

export default page;
