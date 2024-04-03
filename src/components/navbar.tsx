import Dropdown from "@/components/dropdown";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/utils/zustand/store";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isLoggedIn = useAuthStore((state) => state.token);

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
            {isLoggedIn ? (
              <>
                <li
                  className={cn(
                    "hover:text-white text-green-200",
                    location.pathname === "/create-business"
                      ? "text-white"
                      : ""
                  )}
                >
                  <Link to="/create-business">Create Bussiness</Link>
                </li>
                <li
                  className={cn(
                    "hover:text-white text-green-100",
                    location.pathname === "/my-business" ? "text-white " : ""
                  )}
                >
                  <Link to="/my-business">My Business</Link>
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
                    location.pathname === "/create-business"
                      ? "text-white"
                      : ""
                  )}
                >
                  <Link to="/create-business">Create Bussiness</Link>
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
              <Dropdown />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
