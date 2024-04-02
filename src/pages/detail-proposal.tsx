import Layout from "@/components/layout";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/utils/format-money";
import { useEffect, useState } from "react";
import { IProposals } from "@/utils/apis/proposals/type";
import { getDetailProposal } from "@/utils/apis/proposals/api";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function DetailProposal() {
  const param = useParams();
  const [data, setData] = useState<IProposals>();

  useEffect(() => {
    handleGetDetail();
  }, []);

  const handleGetDetail = async () => {
    try {
      const result = await getDetailProposal(param.id_proposal!);
      setData(result.data);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  };

  let persentase = (data?.collected! / data?.capital!) * 100;

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
            <p>{data?.profit}</p>
            <p className="text-xl">Investor : 30%</p>
            <p className="text-sm">
              Example : profit is 2.000.000, so your profit is 30% x 2.000.000 =
              600.000
            </p>
          </div>
          <div className="mb-5">
            <p className="text-xl">Owner Bussiness : 70%</p>
            <p className="text-sm">
              Example : profit is 2.000.000, so your profit is 70% x 2.000.000 =
              1.400.000
            </p>
          </div>
          <div className="mb-5">
            <p className="text-2xl font-semibold">Proposal File</p>
            <p className="font-bold text-xl text-blue-700">{data?.proposal}</p>
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
