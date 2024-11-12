"use client";

import Button from "@/src/components/Button";
import { FormContainer } from "@/src/components/Form";
import Input from "@/src/components/Input";
import {
  faCircleCheck,
  faCircleExclamation,
  faEnvelope,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { emailRegex, passwordRegex } from "@/src/utils/storage";
import { useHandleValidInput } from "@/src/hooks/useHandleValidInput";
import useFormData from "@/src/hooks/useFormData";
import { Roboto } from "next/font/google";
import { login } from "@/src/utils/auth0";
import { cookies } from "next/headers";

export const roboto = Roboto({
  subsets: ["latin"], // You can also add 'latin-ext' or other subsets if needed
  weight: ["400", "500", "700"], // Specify the font weights you want to use
  style: ["normal", "italic"], // Optionally, add italic if needed
  display: "swap",
})

const page = () => {
  const { formData, handleInputChange } = useFormData({
    email: "",
    password: "",
  });



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

  const logins = [
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

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const token = login(formData["email"], formData["password"]);
      console.log(token);
      window.location.href = '/'
    } catch (err) {
      console.log("Login failed")
    }
  }

  return (
    <FormContainer>
      <Title text="Login to your account" />
      <form
        onSubmit={handleLogin}
        className="space-y-4 w-full flex flex-col justify-center items-center"
      >
        {logins.map((form, i) => (
          <Input
            valid={form.valid}
            value={formData[form.label]}
            onChange={handleInputChange}
            key={i}
            label={form.label}
            labelicon={form.labelicon}
            disclaimer={form.disclaimer}
          />
        ))}
      </form>
      <RememberAndLink />
      <Button text={"Submit"} />
      <Spacer />
      <Google />
      <Facebook />
      <p className="text-sm py-4 text-text_for_form ">
        Dont have an account yet?
        <Link
          href={"/register"}
          className="cursor-pointer underline text-darkmode_primary"
        >
          Sign Up
        </Link>
      </p>
    </FormContainer>
  );
};

export const Spacer = () => {
  return (
    <div className="flex items-center space-x-8 mt-4">
      <div className="h-[1px] w-24 bg-white" />
      <h3 className="font-extralight text-xs text-text_for_form">Or register with</h3>
      <div className="h-[1px] w-24 bg-white" />
    </div>
  )
}

export const Google = () => {
  return (
    <button className="w-[22rem] py-2 mt-4 rounded-md bg-white flex justify-center items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
        <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
      </svg>
      <h1 className="text-black">Login In with Google</h1>
    </button>
  )
}



export const Facebook = () => {
  return (
    <button className="w-[22rem] py-2 mt-4 rounded-md bg-white flex justify-center items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="33" height="33" viewBox="0 0 48 48">
        <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
      </svg>
      <h1 className="text-black">Login In with Facebook</h1>
    </button>
  )
}

const RememberAndLink = () => {
  return (
    <div className="w-[22rem]">
      <div id="checkbox" className="flex justify-between">
        <div className="space-x-1 items-center">
          <input type="checkbox" id="login" />
          <label className="text-sm" htmlFor="login">
            Remember me
          </label>
        </div>
        <a className="text-sm text-darkmode_primary hover:underline">Forget my password</a>
      </div>
    </div>
  )
}

export const Title = ({ text }: { text: string }) => {
  return <div className={`font-medium text-4xl ${roboto.className} w-72 text-center leading-normal pb-4`}>{text}</div>;
};

export default page;
