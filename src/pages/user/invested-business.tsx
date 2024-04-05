import Layout from "@/components/layout";
import ProposalCard from "@/components/proposal-card";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IInvestments } from "@/utils/apis/investments/type";
import { getInvestments } from "@/utils/apis/investments/api";
import { toast } from "sonner";
import { useAuthStore } from "@/utils/zustand/store";

export default function InvestedBusiness() {
  const location = useLocation();
  const [datas, setDatas] = useState<IInvestments[]>([]);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    handleGetInvestments();
  }, []);

  const handleGetInvestments = async () => {
    try {
      const result = await getInvestments();
      setDatas(result.data);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  };

  return (
    <Layout>
      <div className="mb-10 mt-2 flex gap-10">
        <Link to={"/profile"}>
          <p className="text-xl text-slate-600 hover:text-black">My Profile</p>
        </Link>
        <Link to={"/invested-business"}>
          <p
            className={cn(
              "text-xl text-slate-600 hover:text-black",
              location.pathname === "/invested-business"
                ? "text-black font-semibold"
                : ""
            )}
          >
            Invested Business
          </p>
        </Link>
        <Link to={"/verification"}>
          <p className="text-xl text-slate-600 hover:text-black">
            Verification
          </p>
        </Link>
      </div>
      {datas.map(
        (data) =>
          data.fullname === user?.fullname && (
            <ProposalCard
              key={data.id}
              title={data.title}
              desc={data.description}
              image={data.image}
              target={data.capital}
              collected={data.collected}
              id={data.id}
              invested
              withOption
            />
          )
      )}
    </Layout>
  );
}
