import Navbar from "@/componenets/NavBar";
import { ReactNode } from "react";

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Main;
