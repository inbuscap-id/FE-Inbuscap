import { LogOut } from "lucide-react";
import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const { children } = props;

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="w-full min-h-dvh flex">
      <div className="min-h-dvh w-72 bg-[#00ad26] rounded-r-2xl text-white flex flex-col">
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
              to="/admin/users"
              className={cn(
                "hover:text-white",
                location.pathname === "/admin/users" ? "text-white " : ""
              )}
            >
              <p>Users</p>
            </Link>
            <Link
              to="/admin/businesses"
              className={cn(
                "hover:text-white",
                location.pathname === "/admin/businesses" ? "text-white " : ""
              )}
            >
              <p>Businesses</p>
            </Link>
          </div>
          <div className="w-full h-1/4 flex justify-center items-center">
            <Button
              variant="ghost"
              className="text-green-100 hover:bg-transparent hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="me-2 text-green-100 hover:text-white" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="grow h-full">
        <div className="flex justify-end gap-20 items-center px-20 h-24 border-b-2 border-green-100">
          <Link to={"/"}>
            <p className="text-[#00ad26] text-base">See All Bussiness</p>
          </Link>
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
