import { CustomFormField } from "@/components/custom-formfield";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { createBusiness } from "@/utils/apis/business/api";
import { BusinessType, businessSchema } from "@/utils/apis/business/type";
import { useAuthStore } from "@/utils/zustand/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateBusiness = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const decodedToken = useAuthStore((state) => state.decodedToken);

  useEffect(() => {
    if (decodedToken?.is_active === 0) {
      navigate("/verification");
    }
  }, []);

  const form = useForm<BusinessType>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      image: new File([], ""),
      title: "",
      description: "",
      capital: "",
      share: "",
      proposal: new File([], ""),
    },
  });

  async function onSubmit(data: BusinessType) {
    try {
      const result = await createBusiness(data);
      toast({
        description: result.message,
      });
      navigate("/my-business");
    } catch (error) {
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
        <p className="text-2xl font-semibold">Create New Business</p>
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
                    id="input-image"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple={false}
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                    className="lg:w-11/12"
                  />
                )}
              </CustomFormField>
            </div>
            <div className="grow space-y-5">
              <CustomFormField
                control={form.control}
                label="Business Title"
                name="title"
              >
                {(field) => (
                  <Input
                    {...field}
                    placeholder="name of your business"
                    type="text"
                    id="input-title"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    className="rounded-full"
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                label="Description"
                name="description"
              >
                {(field) => (
                  <Textarea
                    {...field}
                    placeholder="Your business description..."
                    id="input-description"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    className="rounded-2xl"
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                label="Amount"
                name="capital"
              >
                {(field) => (
                  <Input
                    {...field}
                    placeholder="Your amount of amount"
                    id="input-capital"
                    type="number"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    className="rounded-full"
                    value={field.value as string}
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                label="Share Profit"
                name="share"
              >
                {(field) => (
                  <Input
                    {...field}
                    placeholder="Enter your share profit"
                    id="input-share"
                    type="number"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
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
                    id="input-proposal"
                    accept="application/pdf"
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
                  "Create"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default CreateBusiness;
