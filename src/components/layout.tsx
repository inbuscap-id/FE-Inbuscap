import { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;

  return (
    <div className="w-full h-screen flex flex-col overflow-auto">
      <Navbar />
      <div className="mx-auto w-10/12 min-h-dvh grow overflow-auto py-4 flex flex-col">
        {children}
      </div>
      <Footer />
    </div>
  );
}
