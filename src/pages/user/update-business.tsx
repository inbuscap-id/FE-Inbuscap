import { CustomFormField } from "@/components/custom-formfield";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProposalValidation } from "@/utils/apis/auth/types";
import { TProposal } from "@/utils/apis/users/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

export default function UpdateBusiness() {
  const form = useForm<TProposal>({
    resolver: zodResolver(ProposalValidation),
    defaultValues: {
      title: "",
      capital: "",
      description: "",
      proposal: "",
    },
  });

return (
<Layout loggedin={true}>
  <div className="mb-8 mt-2 flex">
    <p className="text-2xl font-semibold">Update Business</p>
  </div>
<div className="grid grid-cols-2">
<div className="m-5 mx-6">
  <Input type="file" name="file" className="px-1 py-28" />
</div>
<Form {...form}>
          <form
            data-testid="form-register"
            // onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <CustomFormField
              control={form.control}
              name="title"
              label="Business Title"
            >
              {(field) => (
                <Input
                  placeholder="name of your capital"
                  type="title"
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
            name="description"
            label="Description"
            >
              {(field) => (
                <Textarea
                  placeholder="Your capital  description..."
                  data-testid="upload-file"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  {...field}
                  className="rounded-2xl"
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
                  placeholder="Amount"
                  type="amount"
                  data-testid="amount"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  {...field}
                  className="rounded-full"
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
                  placeholder=""
                  type="file"
                  data-testid="upload-file"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  {...field}
                  className="rounded-full"
                />
              )}
            </CustomFormField>
            <div className="flex gap-6">
            <Button
              type="submit"
              data-testid="btn-submit"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
              className="rounded-full px-8"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Cancel"
              )}
            </Button>
            <Button
              type="submit"
              data-testid="btn-submit"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
              className="rounded-full px-8"
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
)
}