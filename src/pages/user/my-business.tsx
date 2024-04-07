import Layout from "@/components/layout";
import ProposalCard from "@/components/proposal-card";
import { Button } from "@/components/ui/button";
import { getBusinesses } from "@/utils/apis/business/api";
import { IBusiness } from "@/utils/apis/business/type";
import { useAuthStore } from "@/utils/zustand/store";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function MyBusiness() {
  const [business, setBusiness] = useState<IBusiness[]>([]);
  const user = useAuthStore((state) => state.user);

  useEffect (() => {
    fetchData();
  }, []);

  const fetchData =  async () => {
    try {
      const result = await getBusinesses();
      setBusiness(result.data)
    } catch (error: any) {
      toast(
        (error as Error).message.toString());
      };
  }


  return (
    <>
      <Layout>
        <div className="mb-5 mt-2 flex justify-between">
          <p className="text-2xl font-semibold">My Business</p>
          <Link to="/create-business">
            <Button className="bg-[#00ad26] hover:bg-[#006516]">
              + Create A Bussiness
            </Button>
          </Link>
        </div>
        {business.map(
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
              withOption
            />
          )
      )}
      </Layout>
    </>
  );
}
