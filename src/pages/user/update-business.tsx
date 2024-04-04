import nasigoreng from "@/assets/nasigoreng.jpg";
import { CustomFormField } from "@/components/custom-formfield";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BusinessSchema, BusinessType } from "@/utils/apis/business/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

export default function UpdateBusiness() {
  const form = useForm<BusinessType>({
    resolver: zodResolver(BusinessSchema),
    defaultValues: {
      image: new File([], ""),
      title: "",
      capital: "",
      description: "",
      proposal: new File([], ""),
    },
  });

  return (
    <Layout>
      <div className="mb-8 mt-2 flex">
        <p className="text-2xl font-semibold">Update Business</p>
      </div>
      <div>
        <Form {...form}>
          <form
            data-testid="form-create-business"
            // onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3"
          >
            <div className="w-1/2">
              <div className="w-11/12 mb-2 my-2">
                <img src={nasigoreng} alt="" className="w-full" />
              </div>
              <CustomFormField
                control={form.control}
                name="image"
                label="Image"
              >
                {(field) => (
                  <Input
                    type="file"
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
                    placeholder="name of your business"
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
                name="description"
                label="Description"
              >
                {(field) => (
                  <Textarea
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
                    placeholder="Your amount of capital"
                    type="amount"
                    data-testid="amount"
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
                data-testid="btn-submit"
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
}
