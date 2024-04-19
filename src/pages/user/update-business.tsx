import { CustomFormField } from "@/components/custom-formfield";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { getDetailBusiness, updateBusiness } from "@/utils/apis/business/api";
import { useNavigate, useParams } from "react-router-dom";
import {
  UpdateBusinessType,
  updateBusinessSchema,
} from "@/utils/apis/business/type";

const UpdateBusiness = () => {
  const param = useParams();
  const navigate = useNavigate();

  const form = useForm<UpdateBusinessType>({
    resolver: zodResolver(updateBusinessSchema),
    defaultValues: {
      image: new File([], ""),
      title: "",
      capital: "",
      share: "",
      description: "",
      proposal: new File([], ""),
    },
  });

  useEffect(() => {
    handleGetDetail();
  }, []);

  const handleGetDetail = async () => {
    try {
      const result = await getDetailBusiness(param.id_business!);
      form.setValue("title", result.data.title);
      form.setValue("capital", result.data.capital.toString());
      form.setValue("share", result.data.share.toString());
      form.setValue("description", result.data.description);
    } catch (error) {
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  async function onSubmit(data: UpdateBusinessType) {
    try {
      const result = await updateBusiness(param.id_business!, data);
      toast({
        description: result.message,
      });

      navigate("/my-business");
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  return (
    <Layout>
      <div className="mb-8 mt-2 flex">
        <p className="text-2xl font-semibold">Update New Business</p>
      </div>
      <div>
        <Form {...form}>
          <form
            id="form-create-business"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3"
          >
            <div className="w-1/2">
              <CustomFormField
                control={form.control}
                name="image"
                label="Image"
              >
                {(field) => (
                  <Input
                    type="file"
                    id="input-image"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple={false}
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                    className="w-11/12"
                  />
                )}
              </CustomFormField>
            </div>
            <div className="grow space-y-5">
              <CustomFormField
                control={form.control}
                name="title"
                label="Business Title"
              >
                {(field) => (
                  <Input
                    id="input-title"
                    placeholder="name of your business"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                    value={field.value as string}
                    className="rounded-full"
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="description"
                label="Description"
              >
                {(field) => (
                  <Textarea
                    id="input-description"
                    placeholder="Your business description..."
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                    className="rounded-2xl"
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="capital"
                label="Amount"
              >
                {(field) => (
                  <Input
                    placeholder="Your amount of amount"
                    id="input-capital"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                    className="rounded-full"
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="share"
                label="Share Profit"
              >
                {(field) => (
                  <Input
                    placeholder="Enter your share profit"
                    id="input-share"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                    className="rounded-full"
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="proposal"
                label="File Proposal"
              >
                {(field) => (
                  <Input
                    type="file"
                    accept="application/pdf"
                    id="input-proposal"
                    multiple={false}
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
                )}
              </CustomFormField>
              <Button
                type="submit"
                id="btn-submit"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
                className="rounded-full px-8 mt-7"
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
  );
};

export default UpdateBusiness;
