import { CustomFormField } from "@/components/custom-formfield";
import Layout from "@/components/layout-admin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { updateAdmin } from "@/utils/apis/users/api";
import { ProfileAdminSchema, ProfileAdminType } from "@/utils/apis/users/type";
import { useAuthStore } from "@/utils/zustand/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function MyProfile() {
  const { toast } = useToast();
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const user = useAuthStore((state) => state.user);

  const form = useForm<ProfileAdminType>({
    resolver: zodResolver(ProfileAdminSchema),
    defaultValues: {
      fullname: "",
      email: "",
      handphone: "",
      password: "",
      ktp: "",
      npwp: "",
    },
  });

  useEffect(() => {
    form.setValue("fullname", user?.fullname!);
    form.setValue("email", user?.email!);
    form.setValue("handphone", user?.handphone!);
    form.setValue("password", user?.password!);
    form.setValue("ktp", user?.ktp!);
    form.setValue("npwp", user?.npwp!);
  }, [user, isDisable]);

  const handleUpdate = async (data: ProfileAdminType) => {
    try {
      const result = await updateAdmin(data);

      setIsDisable(!isDisable);
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
    <Layout>
      <div className="w-full grid lg:grid-cols-2 justify-center p-3.5">
        <Form {...form}>
          <form
            data-testid="form-register"
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-6"
          >
            <CustomFormField
              control={form.control}
              name="fullname"
              label="Full Name"
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder="Your Name"
                  id="input-full-name"
                  type="text"
                  disabled={form.formState.isSubmitting || isDisable}
                  aria-disabled={form.formState.isSubmitting}
                  className="rounded-full"
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <CustomFormField control={form.control} name="email" label="Email">
              {(field) => (
                <Input
                  {...field}
                  placeholder="name@mail.com"
                  type="email"
                  id="input-email"
                  disabled={form.formState.isSubmitting || isDisable}
                  aria-disabled={form.formState.isSubmitting}
                  className="rounded-full"
                  value={field.value as string}
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
                  {...field}
                  placeholder="Your Password"
                  type="password"
                  id="input-password"
                  disabled={form.formState.isSubmitting || isDisable}
                  aria-disabled={form.formState.isSubmitting}
                  className="rounded-full"
                  value={field.value as string}
                />
              )}
            </CustomFormField>
            <Button
              type="button"
              id="btn-edit"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
              className="w-20 rounded-2xl px-6 text-primary bg-white hover:text-white border-2 border-primary"
              onClick={() => setIsDisable(!isDisable)}
            >
              {isDisable ? "Edit" : "Cancel"}
            </Button>
            <Button
              type="submit"
              id="btn-submit"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
              className="rounded-2xl px-6 ml-6"
            >
              Save
            </Button>
          </form>
        </Form>
        <div className="lg:ml-48 mt-10 items-end justify-end">
          <Avatar className="lg:w-[250px] lg:h-[250px] w-[300px] h-[300px]">
            <AvatarImage
              src={user?.avatar ? user.avatar : "https://github.com/shadcn.png"}
            />
            <AvatarFallback>{user?.fullname}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </Layout>
  );
}
