import { CustomFormField } from "@/components/custom-formfield";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { addVerification } from "@/utils/apis/users/api";
import { VerificationType, verificationSchema } from "@/utils/apis/users/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Verification() {
  const { toast } = useToast();

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
        <div className="mb-10 mt-2 flex gap-10">
          <Link to={"/profile"}>
            <p className="text-xl text-slate-600 hover:text-black">
              My Profile
            </p>
          </Link>
          <Link to={"/invested-business"}>
            <p className="text-xl text-slate-600 hover:text-black">
              Invested Business
            </p>
          </Link>
          <Link to={"/verification"}>
            <p
              className={cn(
                "text-xl text-slate-600 hover:text-black",
                location.pathname === "/verification"
                  ? "text-black font-semibold"
                  : ""
              )}
            >
              Verification
            </p>
          </Link>
        </div>
        <div className="m-5 mx-20 p-3 px-10 w-2/5">
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
                    // {...field}
                    // placeholder="Upload your KTP"
                    // data-testid="upload-ktp"
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
                    // {...field}
                    // placeholder="Upload Your NPWP"
                    // data-testid="upload-npwp"
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
                    // {...field}
                    // placeholder="Upload Your Selfie"
                    // data-testid="upload-selfie"
                  />
                )}
              </CustomFormField>
              <CardDescription className="mt-6">
                Note: Pastikan foto anda terlihat jelas
              </CardDescription>
              <div className="flex items-left justify-start p-5 px-1">
                <Button
                  type="button"
                  data-testid="btn-submit"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className="rounded-2xl px-6 bg-white text-primary border-2 border-primary hover:text-white"
                >
                  Edit
                </Button>
                <Button
                  type="submit"
                  data-testid="btn-submit"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className="rounded-2xl mx-10 px-7"
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Layout>
    </>
  );
}
