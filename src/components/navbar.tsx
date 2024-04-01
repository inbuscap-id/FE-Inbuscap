import Dropdown from "@/components/dropdown";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface Props {
  loggedin: boolean;
}

export default function Navbar(props: Props) {
  const location = useLocation();
  const { loggedin } = props;

  return (
    <nav className="w-full bg-[#00ad26] flex justify-center items-center sticky top-0 z-10">
      <div className="w-10/12 flex text-white justify-between items-center py-5">
        <div className="font-lora font-bold text-3xl">
          <h1>
            <Link to="/">Inbuscap.id</Link>
          </h1>
        </div>
        <div>
          <ul className="flex justify-center items-center gap-10">
            {loggedin ? (
              <>
                <li
                  className={cn(
                    "hover:text-white text-green-200",
                    location.pathname === "/create-bussiness"
                      ? "text-white"
                      : ""
                  )}
                >
                  <Link to="/create-bussiness">Create Bussiness</Link>
                </li>
                <li
                  className={cn(
                    "hover:text-white text-green-100",
                    location.pathname === "/my-proposals" ? "text-white " : ""
                  )}
                >
                  <Link to="/my-proposals">My Proposals</Link>
                </li>
                <li
                  className={cn(
                    "hover:text-white text-green-100",
                    location.pathname === "/" ? "text-white " : ""
                  )}
                >
                  <Link to="/">See All Bussiness</Link>
                </li>
              </>
            ) : (
              <>
                <li
                  className={cn(
                    "hover:text-white text-green-200",
                    location.pathname === "/create-bussiness"
                      ? "text-white"
                      : ""
                  )}
                >
                  <Link to="/create-bussiness">Create Bussiness</Link>
                </li>
                <li
                  className={cn(
                    "hover:text-white text-green-100",
                    location.pathname === "/" ? "text-white " : ""
                  )}
                >
                  <Link to="/">See All Bussiness</Link>
                </li>
              </>
            )}

            <li>
              <Dropdown loggedin={loggedin} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}