import { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

interface Props {
  children: ReactNode;
  loggedin: boolean;
}

export default function Layout(props: Props) {
  const { children, loggedin } = props;

  return (
    <div className="w-full  flex flex-col">
      <Navbar loggedin={loggedin} />
      <div className="mx-auto lg:w-10/12 md:w-2/3 w-full grow py-4 flex flex-col ">
        {children}
      </div>
      <Footer />
    </div>
  );
}
