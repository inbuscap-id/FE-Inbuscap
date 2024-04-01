import { CustomFormField } from "@/components/custom-formfield";
import Layout from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterType, registerSchema } from "@/utils/apis/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Profile() {
    const form = useForm<RegisterType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
          fullname: "",
          email: "",
          handphone: "",
          ktp: "",
          npwp: "",
        },
      });


    return (
      <>
        <Layout loggedin={true}>
          <div className="mb-10 mt-2 flex gap-20">
          <Link to={"/profile"}>
            <Button variant="ghost" className="hover:bg-transparent text-2xl font-semibold hover:font-bold">My Profile</Button>
            </Link>
            <Link to={"/invested-business"}>
            <Button variant="ghost" className="hover:bg-transparent text-2xl font-semibold hover:font-bold">Invested Business</Button>
            </Link>
            <Link to={"/verification"}>
            <Button variant="ghost" className="hover:bg-transparent text-2xl font-semibold hover:font-bold">Verification</Button>
            </Link>
            </div>
            <div className="grid grid-cols-3 justify-center">
            <Avatar className="w-[250px] h-[250px] m-5">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
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
                <CustomFormField control={form.control} name="ktp" label="No KTP">
                  {(field) => (
                    <Input
                      placeholder="ktp"
                      type="tel"
                      data-testid="input-ktp"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      {...field}
                      className="rounded-full"
                    />
                  )}
                </CustomFormField>
                <CustomFormField
                  control={form.control}
                  name="handphone"
                  label="No Hp"
                >
                  {(field) => (
                    <Input
                      placeholder="Phone Number"
                      type="phone number"
                      data-testid="input-phone-number"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      {...field}
                      className="rounded-full"
                    />
                  )}
                </CustomFormField>
                <CustomFormField
                  control={form.control}
                  name="npwp"
                  label="NPWP"
                >
                  {(field) => (
                    <Input
                      placeholder="npwp"
                      type="tel"
                      data-testid="input-npwp"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      {...field}
                      className="rounded-full"
                    />
                  )}
                </CustomFormField>
            </form>
        </Form>
        <div className="grid items-start justify-start p-5 px-0 pb-60">
        <Button type="submit"
                  data-testid="btn-submit"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className="rounded-2xl mx-20">Edit
        </Button>
        <Button type="submit"
                  data-testid="btn-submit"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className="rounded-2xl mx-20">Save
        </Button>
        <Button type="submit"
                  data-testid="btn-submit"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className="rounded-2xl mx-20">Delete
        </Button>
        </div>
        </div>
        
          
        </Layout>
      </>
    );
  }