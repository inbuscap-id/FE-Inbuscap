import { LogOut } from "lucide-react";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  const location = useLocation();
  const { children } = props;

  return (
    <div className="w-full min-h-dvh flex">
      <div className="min-h-dvh w-2/12 bg-[#00ad26] rounded-r-2xl text-white flex flex-col">
        <div className="w-full h-1/6 flex justify-center items-center tracking-wide">
          <p className="font-lora font-bold text-2xl">Inbuscap.id</p>
        </div>
        <div className="grow flex flex-col justify-between">
          <div className="w-fit mx-auto py-10 flex flex-col gap-5 text-green-100">
            <Link
              to="/admin"
              className={cn(
                "hover:text-white",
                location.pathname === "/admin" ? "text-white " : ""
              )}
            >
              <p>My Profile</p>
            </Link>
            <Link
              to="/admin/list-of-users"
              className={cn(
                "hover:text-white",
                location.pathname === "/admin/list-of-users"
                  ? "text-white "
                  : ""
              )}
            >
              <p>List of Users</p>
            </Link>
            <Link
              to="/admin/list-of-proposals"
              className={cn(
                "hover:text-white",
                location.pathname === "/admin/list-of-proposals"
                  ? "text-white "
                  : ""
              )}
            >
              <p>List of Proposals</p>
            </Link>
          </div>
          <div className="w-full h-1/4 flex justify-center items-center">
            <LogOut className="me-2 text-green-100 hover:text-white" />
            <p className="text-green-100 hover:text-white">Logout</p>
          </div>
        </div>
      </div>
      <div className="grow h-full">
        <div className="flex justify-end gap-20 items-center px-20 h-24 border-b-2 border-green-100">
          <p className="text-[#00ad26] text-base">See All Bussiness</p>
          <Avatar className="bg-black">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="px-20 py-5 h-full">{children}</div>
      </div>
    </div>
  );
}
