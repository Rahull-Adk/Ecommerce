import { createContext } from "react";

interface NavbarContextType {
  activeNavbar: number | null; // Active navbar item can be a number or null
  setActiveNavbar: React.Dispatch<React.SetStateAction<number>>; // Function to set the active navbar
}

export const NavbarContext = createContext<NavbarContextType | null>(null);
