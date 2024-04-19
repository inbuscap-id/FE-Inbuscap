import Layout from "@/components/layout";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/utils/format-money";
import { useEffect, useState } from "react";
import { IDetailBusiness } from "@/utils/apis/business/type";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailBusiness } from "@/utils/apis/business/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/utils/zustand/store";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InvestType, investSchema } from "@/utils/apis/investments/type";
import { CustomFormField } from "@/components/custom-formfield";
import { investBusiness } from "@/utils/apis/investments/api";
import { useToast } from "@/components/ui/use-toast";

export default function DetailBusiness() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const param = useParams();
  const [data, setData] = useState<IDetailBusiness>();
  const user = useAuthStore((state) => state.user);

  let persentase = Math.round((data?.collected! / data?.capital!) * 100);

  const form = useForm<InvestType>({
    resolver: zodResolver(investSchema),
    defaultValues: {
      proposal_id: 0,
      amount: 0,
    },
  });

  useEffect(() => {
    handleGetDetail();
    form.setValue("proposal_id", +param.id_business!);
  }, []);

  const handleGetDetail = async () => {
    try {
      const result = await getDetailBusiness(param.id_business!);
      setData(result.data);
    } catch (error) {
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleInvest = async (data: InvestType) => {
    try {
      const result = await investBusiness(data);
      navigate("/invested-business");
      toast({
        description: result.message,
      });
    } catch (error) {
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

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
          </div>
          <div className="mb-5">
            <p className="text-2xl font-semibold">Proposal File</p>
            <a href={data?.document} target="_blank">
              <p className="font-bold text-xl text-blue-700">
                business-proposal
              </p>
            </a>
          </div>
          <div className="self-end bg-red-100">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="w-40 h-12 text-lg bg-[#00AC26] hover:bg-[#006516]"
                  disabled={user?.email === data?.user.email}
                  id="btn-show-invest-dialog"
                >
                  {user?.email === data?.user.email ? (
                    <>Your Own Business</>
                  ) : (
                    <>Invest</>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-xl">
                    Ready to Invest?
                  </DialogTitle>
                  <DialogDescription className="text-md">
                    You will invest in{" "}
                    <span className="font-semibold underline">
                      {data?.title}
                    </span>{" "}
                    with share profit{" "}
                    <span className="font-semibold underline">
                      {data?.share}%
                    </span>
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    data-testid="form-register"
                    onSubmit={form.handleSubmit(handleInvest)}
                    className="flex flex-col gap-5"
                  >
                    <div className="w-full px-5 flex flex-col gap-3">
                      <div>
                        <Label htmlFor="saldo" className="text-right ">
                          Your Inbuscap Saldo :
                        </Label>
                        <Input
                          id="saldo"
                          className="col-span-3 text-md font-semibold border-none bg-green-50 rounded-full mt-2"
                          value={formatRupiah.format(user?.saldo!)}
                          readOnly
                        />
                      </div>
                      <div>
                        <CustomFormField
                          control={form.control}
                          name="amount"
                          label="Amount :"
                        >
                          {(field) => (
                            <Input
                              {...field}
                              placeholder="input your amount to invest"
                              id="input-amount"
                              disabled={form.formState.isSubmitting}
                              aria-disabled={form.formState.isSubmitting}
                              className="rounded-full w-full mt-2"
                              type="number"
                              value={field.value as number}
                              onChange={(e) => field.onChange(+e.target.value)}
                            />
                          )}
                        </CustomFormField>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" id="btn-invest">
                        Go Invest
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Layout>
    </>
  );
}
