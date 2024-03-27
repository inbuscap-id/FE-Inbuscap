import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface Props {
  loggedin?: boolean;
}

export default function Dropdown(props: Props) {
  const { loggedin } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      {loggedin ? (
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/my-profile">
            <DropdownMenuItem className="cursor-pointer">
              My Profile
            </DropdownMenuItem>
          </Link>
          <Link to="/archive-proposals">
            <DropdownMenuItem className="cursor-pointer">
              Archive Proposals
            </DropdownMenuItem>
          </Link>
          <Link to="/withdraw">
            <DropdownMenuItem className="cursor-pointer">
              Withdraw
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Logout</DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent>
          <Link to="/loggedin">
            <DropdownMenuItem className="cursor-pointer">
              loggedin
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
