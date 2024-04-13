import { LogOut, Menu } from "lucide-react";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useAuthStore } from "@/utils/zustand/store";
import { toast } from "./ui/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

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
      <div className="min-h-dvh lg:w-2/12 w-3/12 bg-[#00ad26] rounded-r-2xl text-white flex-col hidden md:block">
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
      <div className="lg:w-10/12 md:w-10/12 w-full">
        <div className="w-full flex justify-end lg:gap-20 gap-10 items-center md:px-20 md:h-24 h-20 px-10 border-b-2 border-green-100">
        <DropdownMenu>
        <DropdownMenuTrigger>
            <Menu className="md:hidden"/>
        </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
            <Link
              to="/admin"
              className={cn(
                "hover:text-green-900",
                location.pathname === "/admin" ? "text-green-500 font-semibold" : ""
              )}
            >
              <p>My Profile</p>
            </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Link
              to="/admin/users"
              className={cn(
                "hover:text-green-900",
                location.pathname === "/admin/users"
                  ? "text-green-500 font-semibold"
                  : ""
              )}
            >
              <p>Users</p>
            </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Link
              to="/admin/businesses"
              className={cn(
                "hover:text-green-900",
                location.pathname === "/admin/businesses"
                  ? "text-green-500 font-semibold"
                  : ""
              )}
            >
              <p>Businesses</p>
            </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
            <Button
              variant="ghost"
              className="text-green-700 hover:bg-transparent hover:text-green-400"
              onClick={handleLogout}
            >
              <LogOut className="me-2 text-green-700 hover:bg-transparent hover:text-green-400" />
              Logout
            </Button>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
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
