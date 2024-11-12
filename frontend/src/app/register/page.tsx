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
import { Facebook, Google, Spacer, Title } from "../login/page";
import Button from "@/src/components/Button";
import Link from "next/link";
import Input from "@/src/components/Input";
import useFormData from "@/src/hooks/useFormData";
import { emailRegex, passwordRegex, usernameRegex } from "@/src/utils/storage";
import { useHandleValidInput } from "@/src/hooks/useHandleValidInput";
import { useHandleCurrent } from "@/src/hooks/useHandleCurrent";
import { register } from "@/src/utils/auth0";

const page = () => {
  const { formData, handleInputChange } = useFormData({
    email: "",
    username: "",
    password: "",
    fullname: "",
  });
  const { currentTraget, handleCurrentTarget } = useHandleCurrent();

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

  const registers = [
    {
      label: "Email",
      icon: emailValid ? faCircleCheck : faCircleExclamation,
      labelicon: faEnvelope,
      disclaimer:
        currentTraget === "Email"
          ? "The email input does not follow the standard address(e.g.,missing @ or .com)"
          : "",
      valid: emailValid,
      value: email,
    },
    {
      label: "Username",
      labelicon: faUser,
      icon: usernameValid ? faCircleCheck : faCircleExclamation,
      disclaimer: null,
      valid: usernameValid,
      value: username,
    },
    {
      label: "Fullname",
      labelicon: faUser,
      icon: fullnameValid ? faCircleCheck : faCircleExclamation,
      disclaimer: null,
      valid: fullnameValid,
      value: fullname,
    },
    {
      label: "Password",
      labelicon: faKey,
      icon: passwordValid ? faCircleCheck : faCircleExclamation,
      disclaimer:
        currentTraget === "Password"
          ? "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character."
          : "",
      valid: passwordValid,
      value: password,
    },
  ];

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      console.log("Register function is working!")
      await register(formData["email"], formData["password"], formData["username"]);
      window.location.href = '/login';

    } catch (err) {
      console.log("Registration Failed!")
    }
  };

  return (
    <FormContainer>
      <Title text="Register New Account" />
      <form
        onSubmit={handleRegister}
        className="space-y-4 w-full flex flex-col justify-center items-center"
      >
        {registers.map((form, i) => (
          <Input
            valid={form.valid}
            value={formData[form.label]}
            onChange={handleInputChange}
            onClick={() => handleCurrentTarget(form.label)}
            key={i}
            label={form.label}
            labelicon={form.labelicon}
            disclaimer={form.disclaimer}
            autoComplete="off"
          />
        ))}
        <div id="checkbox" className="flex justify-between w-[22rem]">
          <div className="space-x-1 items-center">
            <input type="checkbox" id="register" />
            <label className="text-xs text-gray-400" htmlFor="register">
              I accept{" "}
              <strong className="text-white">
                Terms of Service and Privacy Policy.
              </strong>
            </label>
          </div>
        </div>
        <Button text={"Submit"} />
      </form>
      <Spacer />
      <Google />
      <Facebook />
      <p className="text-sm pt-4">
        have an accout?
        <Link href="/login" className="hover:underline text-darkmode_primary">
          {" "}
          Sign In
        </Link>
      </p>
    </FormContainer>
  );
};

export default page;
