import { CustomFormField } from "@/components/custom-formfield";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { VerificationType, verificationSchema } from "@/utils/apis/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Verification() {
  const form = useForm<VerificationType>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      photo_ktp: "",
      photo_npwp: "",
      photo_selfie: "",
    },
  });

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
              // onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <CustomFormField
                control={form.control}
                name="photo_ktp"
                label="Foto KTP"
              >
                {(field) => (
                  <Input
                    placeholder="foto KTP"
                    type="file"
                    data-testid="upload-file"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                    className="rounded-full"
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
                    placeholder="NPWP..."
                    type="file"
                    data-testid="upload-file"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                    className="rounded-full"
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
                    placeholder="Upload Foto..."
                    type="file"
                    data-testid="upload-file"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                    className="rounded-full"
                  />
                )}
              </CustomFormField>
            </form>
          </Form>
          <CardDescription className="mt-6">
            Note: Pastikan foto anda terlihat jelas
          </CardDescription>
          <div className="flex items-left justify-start p-5 px-1">
            <Button
              type="submit"
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
        </div>
      </Layout>
    </>
  );
}
