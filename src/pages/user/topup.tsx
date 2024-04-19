import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/custom-formfield";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { topUp } from "@/utils/apis/investments/api";
import { ITopup, TopupType, topupSchema } from "@/utils/apis/investments/type";
import { useAuthStore } from "@/utils/zustand/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { CopyIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { formatRupiah } from "@/utils/format-money";

export default function Topup() {
  const [showSummary, setShowSummary] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [responseTopup, setResponseTopup] = useState<ITopup>();

  const decodedToken = useAuthStore((state) => state.decodedToken);

  const banks = ["BCA", "BNI", "BRI", "CIMB"];

  useEffect(() => {
    if (decodedToken?.is_active === 0) {
      navigate("/verification");
    }
  }, []);

  const form = useForm<TopupType>({
    resolver: zodResolver(topupSchema),
    defaultValues: {
      bank: "",
      amount: 0,
    },
  });

  const handleSubmitTopup = async (data: TopupType) => {
    try {
      const result = await topUp(data);
      setResponseTopup(result.data);
      setShowSummary(!showSummary);
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

  const handleCopyToClipboard = () => {
    const textToCopy = responseTopup?.va_numbers[0].va_number;
    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          toast({ description: "Copied to clipboard!" });
        })
        .catch(() => {
          toast({
            title: "Failed to copy",
            description: "Something went wrong while copying to clipboard",
            variant: "destructive",
          });
        });
    }
  };

  return (
    <Layout>
      <div className="mb-10 mt-2 flex md:gap-10 gap-4">
        <Link to={"/profile"}>
          <p className="xl:text-xl md:text-xl text-sm text-slate-600 hover:text-black">
            My Profile
          </p>
        </Link>
        <Link to={"/invested-business"}>
          <p className="xl:text-xl md:text-xl text-sm text-slate-600 hover:text-black">
            Invested Business
          </p>
        </Link>
        <Link to={"/verification"}>
          <p
            className={cn(
              "xl:text-xl md:text-xl text-sm text-slate-600 hover:text-black",
              location.pathname === "/verification"
                ? "text-black font-semibold"
                : ""
            )}
          >
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
      <div className="w-2/3 lg:w-1/2 self-center p-2">
        <Form {...form}>
          <form
            id="form-topup"
            onSubmit={form.handleSubmit(handleSubmitTopup)}
            className="flex flex-col gap-5"
          >
            <CustomFormSelect
              control={form.control}
              name="bank"
              label="Bank"
              placeholder="Select a Bank"
              options={banks}
            />
            <CustomFormField
              control={form.control}
              name="amount"
              label="Amount"
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder="1000000"
                  id="input-amount"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className="rounded-full"
                  type="number"
                  value={field.value as number}
                  onChange={(e) => field.onChange(+e.target.value)}
                />
              )}
            </CustomFormField>

            <Dialog open={showSummary}>
              <DialogTrigger asChild id="btn-detail-topup">
                <Button variant="outline">See Detail Top Up</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Summary</DialogTitle>
                  <DialogDescription className="text-md text-black">
                    <p>ID Top Up : {responseTopup?.order_id}</p>
                    <p>Total : {formatRupiah.format(responseTopup?.amount!)}</p>
                    <p>Status : {responseTopup?.status}</p>
                    <p>Time : {responseTopup?.created_at}</p>
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input
                      defaultValue={responseTopup?.va_numbers[0].va_number}
                      readOnly
                    />
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    className="px-3"
                    onClick={handleCopyToClipboard}
                    id="btn-copy-clipboard"
                  >
                    <span className="sr-only">Copy</span>
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setShowSummary(!showSummary)}
                      id="btn-show-summary"
                    >
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              type="submit"
              id="btn-submit"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
              className="rounded-2xl self-end"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Send"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
}
