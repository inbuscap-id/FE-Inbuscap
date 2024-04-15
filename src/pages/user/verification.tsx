import { CustomFormField } from "@/components/custom-formfield";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { addVerification, getUser } from "@/utils/apis/users/api";
import { VerificationType, verificationSchema } from "@/utils/apis/users/type";
import { useAuthStore } from "@/utils/zustand/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Verification() {
  const { toast } = useToast();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const decodedToken = useAuthStore((state) => state.decodedToken);

  const form = useForm<VerificationType>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      photo_ktp: new File([], ""),
      photo_npwp: new File([], ""),
      photo_selfie: new File([], ""),
    },
  });

  const onSubmit = async (data: VerificationType) => {
    try {
      const result = await addVerification(data);
      toast({
        description: result.message,
      });

      const dataUser = await getUser();
      setUser(dataUser.data);
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
        <div className="mb-10 mt-2 flex md:gap-10 gap-5">
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
        <div className="w-2/3 lg:w-1/2 self-center">
          {user?.photo_ktp && user.photo_npwp && user.photo_selfie ? (
            decodedToken?.is_active !== 0 ? (
              <div className="mx-auto px-4 py-2 mb-4 rounded-full bg-green-50 w-fit">
                <p className="text-center text-green-500 font-medium">
                  Your account was approved!
                </p>
              </div>
            ) : (
              <div className="mx-auto px-4 py-2 mb-4 rounded-full bg-green-50 w-fit">
                <p className="text-center text-green-500 font-medium">
                  You have uploaded the required documents! Wait until admin
                  approve your account.
                </p>
              </div>
            )
          ) : (
            <div className="mx-auto px-4 py-2 mb-4 rounded-full bg-red-50 w-fit">
              <p className="text-center text-red-500 font-medium">
                You must upload the required documents!
              </p>
            </div>
          )}
          <Form {...form}>
            <form
              data-testid="form-register"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <CustomFormField
                control={form.control}
                name="photo_ktp"
                label="Foto KTP"
              >
                {(field) => (
                  <Input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple={false}
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    className="rounded-full"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="photo_npwp"
                label="Foto NPWP"
              >
                {(field) => (
                  <Input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple={false}
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    className="rounded-full"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="photo_selfie"
                label="Foto Selife"
              >
                {(field) => (
                  <Input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple={false}
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    className="rounded-full"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
                )}
              </CustomFormField>
              <CardDescription className="mt-6">
                Note: Pastikan foto anda terlihat jelas
              </CardDescription>
              <div className="flex items-left justify-start p-5 px-1">
                <Button
                  type="button"
                  id="btn-submit"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className="rounded-2xl px-6 bg-white text-primary border-2 border-primary hover:text-white"
                >
                  Edit
                </Button>
                <Button
                  type="submit"
                  id="btn-submit"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className="rounded-2xl mx-10 px-7"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Layout>
    </>
  );
}
