import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/utils/zustand/store";
import { Archive, DollarSignIcon, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dropdown() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      {isLoggedIn ? (
        <DropdownMenuContent align="end" forceMount>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/my-profile">
            <DropdownMenuItem className="cursor-pointer flex gap-2">
              <User className="w-5" />
              My Profile
            </DropdownMenuItem>
          </Link>
          <Link to="/archive-proposals">
            <DropdownMenuItem className="cursor-pointer flex gap-2">
              <Archive className="w-5" />
              Archive Proposals
            </DropdownMenuItem>
          </Link>
          <Link to="/withdraw">
            <DropdownMenuItem className="cursor-pointer flex gap-2">
              <DollarSignIcon className="w-5" />
              Withdraw
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer flex gap-2">
            <LogOut className="w-5" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent align="end" forceMount>
          <Link to="/login">
            <DropdownMenuItem className="cursor-pointer">
              Login
            </DropdownMenuItem>
          </Link>
          <Link to="/register">
            <DropdownMenuItem className="cursor-pointer">
              Register
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
