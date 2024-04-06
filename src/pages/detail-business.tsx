import Layout from "@/components/layout";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/utils/format-money";
import { useEffect, useState } from "react";
import { IBusiness } from "@/utils/apis/business/type";
import { useParams } from "react-router-dom";
import { getDetailBusiness } from "@/utils/apis/business/api";
import { toast } from "sonner";

export default function DetailBusiness() {
  const param = useParams();
  const [data, setData] = useState<IBusiness>();

  useEffect(() => {
    handleGetDetail();
  }, []);

  const handleGetDetail = async () => {
    try {
      const result = await getDetailBusiness(param.id_business!);
      setData(result.data);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  };

  let persentase = Math.round((data?.collected! / data?.capital!) * 100);

  return (
    <>
      <Layout>
        <div className="w-2/3 mx-auto mb-5">
          <img className="w-full aspect-auto" src={data?.image} alt="" />
        </div>
        <div className="flex flex-col">
          <div className="mb-1">
            <p className="text-3xl font-semibold">{data?.title}</p>
          </div>
          <div className="mb-2">
            <p className="text-2xl">
              {formatRupiah.format(data?.collected!)} /{" "}
              {formatRupiah.format(data?.capital!)}
            </p>
          </div>
          <div className="w-1/2 mb-2">
            <p className="text-lg">{persentase}%</p>
            <Progress
              value={persentase}
              className="mb-4 border border-[#006516] bg-slate-200"
            />
          </div>
          <div className="mb-5">
            <p className="text-lg">{data?.description}</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">Share Profit</p>
            <p className="text-xl">Investor : {data?.share}%</p>
            {/* <p className="text-sm">
              Example : your investment is 2.000.000, so your profit is{" "}
              {data?.share}% x 2.000.000 = 200.000
            </p> */}
          </div>
          <div className="mb-5">
            <p className="text-2xl font-semibold">Proposal File</p>
            <a href={data?.proposal}>
              <p className="font-bold text-xl text-blue-700">
                business-proposal
              </p>
            </a>
          </div>
          <div className="self-end bg-red-100">
            <Button className="w-56 h-12 text-lg bg-[#00AC26] hover:bg-[#006516]">
              Invest
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
}
