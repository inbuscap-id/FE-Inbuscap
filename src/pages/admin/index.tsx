import { CustomFormField } from "@/components/custom-formfield";
import Layout from "@/components/layout-admin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { adminSchema } from "@/utils/apis/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function MyProfile() {

  const form = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  return (
    <Layout>
      <div className="grid grid-cols-2 justify-center p-3.5 w-4/5">
        <Form {...form}>
              <form
                data-testid="form-register"
                // onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <CustomFormField
                  control={form.control}
                  name="fullname"
                  label="Full Name"
                >
                  {(field) => (
                    <Input
                      placeholder="John Doe"
                      data-testid="input-full-name"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      {...field}
                      className="rounded-full"
                    />
                  )}
                </CustomFormField>
                <CustomFormField
                  control={form.control}
                  name="email"
                  label="Email"
                >
                  {(field) => (
                    <Input
                      placeholder="name@mail.com"
                      type="email"
                      data-testid="input-email"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      {...field}
                      className="rounded-full"
                    />
                  )}
                </CustomFormField>
                <CustomFormField
                  control={form.control}
                  name="password"
                  label="Password"
                >
                  {(field) => (
                    <Input
                      placeholder="password..."
                      type="password"
                      data-testid="password"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      {...field}
                      className="rounded-full"
                    />
                  )}
                </CustomFormField>
            <Button type="submit"
                  data-testid="btn-submit"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className="rounded-2xl px-6">Edit
            </Button>
            <Button type="submit"
                  data-testid="btn-submit"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className="rounded-2xl px-6 ml-6">Save
            </Button>
            </form>           
        </Form>
        <div className="ml-80 items-end justify-end">
        <Avatar className="w-[250px] h-[250px]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        </div>
      </div>
    </Layout>
  );
}
