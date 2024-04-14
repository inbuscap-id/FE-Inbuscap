import { LogOut } from "lucide-react";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useAuthStore } from "@/utils/zustand/store";
import { toast } from "./ui/use-toast";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  const location = useLocation();
  const resetToken = useAuthStore((state) => state.resetAuth);
  const user = useAuthStore((state) => state.user);

  const { children } = props;

  const handleLogout = () => {
    resetToken();
    toast({
      description: "Logout Successfully",
    });
  };

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
                location.pathname === "/admin" ? "text-white font-semibold" : ""
              )}
            >
              <p>My Profile</p>
            </Link>
            <Link
              to="/admin/users"
              className={cn(
                "hover:text-white",
                location.pathname === "/admin/users"
                  ? "text-white font-semibold"
                  : ""
              )}
            >
              <p>Users</p>
            </Link>
            <Link
              to="/admin/businesses"
              className={cn(
                "hover:text-white",
                location.pathname === "/admin/businesses"
                  ? "text-white font-semibold"
                  : ""
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
      <div className="w-10/12 h-full">
        <div className="w-full flex justify-end gap-20 items-center px-20 h-24 border-b-2 border-green-100">
          <Link to={"/"}>
            <p className="text-[#00ad26] text-base">See All Bussiness</p>
          </Link>
          <Avatar className="bg-black">
            <AvatarImage
              className="object-cover"
              src={user?.avatar ? user.avatar : "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full px-20 py-5">{children}</div>
      </div>
    </div>
  );
}
