import notfound from "@/assets/404_2.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="w-1/2 text-center mb-20">
        <img src={notfound} alt="" />
        <p className="text-xl font-bold text-[#00AC26]">PAGE NOT FOUND</p>
        <p className="tracking-widest font-medium">
          Sorry, we were unable to find that page
        </p>
        <Link to="/">
          <Button className="mt-5 bg-[#00AC26] hover:bg-[#006516]">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
