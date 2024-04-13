import Layout from "@/components/layout";
import ProposalCard from "@/components/proposal-card";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IInvestments } from "@/utils/apis/investments/type";
import { getInvestments } from "@/utils/apis/investments/api";
import { toast } from "sonner";

export default function InvestedBusiness() {
  const location = useLocation();
  const [datas, setDatas] = useState<IInvestments[]>([]);

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
      <div className="mb-10 mt-2 flex md:gap-10 gap-5">
        <Link to={"/profile"}>
          <p className="xl:text-xl md:text-xl text-sm text-slate-600 hover:text-black">My Profile</p>
        </Link>
        <Link to={"/invested-business"}>
          <p
            className={cn(
              "xl:text-xl md:text-xl text-sm text-slate-600 hover:text-black",
              location.pathname === "/invested-business"
                ? "text-black font-semibold"
                : ""
            )}
          >
            Invested Business
          </p>
        </Link>
        <Link to={"/verification"}>
          <p className="xl:text-xl md:text-xl text-sm text-slate-600 hover:text-black">
            Verification
          </p>
        </Link>
        <Link to={"/topup"}>
          <p
            className={cn(
              "xl:text-xl md:text-xl text-sm text-slate-600 hover:text-black",
              location.pathname === "/topup" ? "text-black font-semibold" : ""
            )}
          >
            Top Up
          </p>
        </Link>
      </div>
      {datas.length === 0 ? (
        <p className="text-center">No Data</p>
      ) : (
        datas.map((data) => (
          <ProposalCard
            key={data.id}
            title={data.title}
            desc={data.description}
            image={data.image}
            target={data.capital}
            collected={data.collected}
            id={data.id}
            invested
          />
        ))
      )}
    </Layout>
  );
}
