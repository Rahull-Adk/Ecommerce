"use client"

import { Provider } from "react-redux";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { store } from "../counter/store";

export default function Home() {
  return (
    <div className="w-full bg-support_primary">
      <Provider store={store}>
        <Navbar />
        <Hero />
      </Provider>
    </div>
  );
}
