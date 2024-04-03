import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Archive, DollarSignIcon, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface Props {
  loggedin?: boolean;
}

export default function Dropdown(props: Props) {
  const { loggedin } = props;

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      {loggedin ? (
        <DropdownMenuContent align="end" forceMount>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/profile">
            <DropdownMenuItem className="cursor-pointer flex gap-2">
              <User className="w-5" />
              My Profile
            </DropdownMenuItem>
          </Link>
          <Link to="/archive-business">
            <DropdownMenuItem className="cursor-pointer flex gap-2">
              <Archive className="w-5" />
              Archive Business
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
            <Button variant="ghost" className="hover:bg-transparent" onClick={handleLogout}><LogOut className="w-5" />Logout</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent align="end" forceMount>
          <Link to="/loggedin">
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
