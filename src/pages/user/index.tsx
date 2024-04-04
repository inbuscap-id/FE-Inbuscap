import CustomAlert from "@/components/custom-alert";
import { CustomFormField } from "@/components/custom-formfield";
import Layout from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { deleteProfile, updateUser } from "@/utils/apis/users/api";
import { ProfileSchema, ProfileType } from "@/utils/apis/users/type";
import { useAuthStore } from "@/utils/zustand/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Profile() {
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = useAuthStore((state) => state.user);
  const resetToken = useAuthStore((state) => state.resetAuth);

  const form = useForm<ProfileType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      fullname: "",
      email: "",
      handphone: "",
      ktp: "",
      npwp: "",
    },
  });

  useEffect(() => {
    form.setValue("fullname", user?.fullname!);
    form.setValue("email", user?.email!);
    form.setValue("ktp", user?.ktp!);
    form.setValue("handphone", user?.handphone!);
    form.setValue("npwp", user?.npwp!);
  }, [user]);

  const handleUpdate = async (data: ProfileType) => {
    try {
      const result = await updateUser(data);

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

  const handleDelete = async () => {
    try {
      const result = await deleteProfile();

      toast({
        description: result.message,
      });
      resetToken();
      navigate("/");
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
        <div className="mb-6 mt-2 flex gap-10">
          <Link to={"/profile"}>
            <p
              className={cn(
                "text-xl text-slate-600 hover:text-black",
                location.pathname === "/profile"
                  ? "text-black font-semibold"
                  : ""
              )}
            >
              My Profile
            </p>
          </Link>
          <Link to={"/invested-business"}>
            <p className="text-xl text-slate-600 hover:text-black">
              Invested Business
            </p>
          </Link>
          <Link to={"/verification"}>
            <p className="text-xl text-slate-600 hover:text-black">
              Verification
            </p>
          </Link>
        </div>
        <div className="grid grid-cols-3 justify-center">
          <Avatar className="w-[250px] h-[250px] m-5">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Card className="w-full sm:block mt-5">
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleUpdate)}
                  data-testid="form-register"
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
                        data-testid="input-full-name"
                        disabled={form.formState.isSubmitting || isDisable}
                        aria-disabled={form.formState.isSubmitting}
                        className="rounded-full"
                        value={field.value as string}
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
                        {...field}
                        placeholder="name@mail.com"
                        type="email"
                        data-testid="input-email"
                        disabled={form.formState.isSubmitting || isDisable}
                        aria-disabled={form.formState.isSubmitting}
                        className="rounded-full"
                        value={field.value as string}
                      />
                    )}
                  </CustomFormField>
                  <CustomFormField
                    control={form.control}
                    name="ktp"
                    label="No KTP"
                  >
                    {(field) => (
                      <Input
                        {...field}
                        placeholder="Your KTP"
                        data-testid="input-ktp"
                        disabled={form.formState.isSubmitting || isDisable}
                        aria-disabled={form.formState.isSubmitting}
                        className="rounded-full"
                        value={field.value as string}
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
                        {...field}
                        placeholder="Phone Number"
                        data-testid="input-phone-number"
                        disabled={form.formState.isSubmitting || isDisable}
                        aria-disabled={form.formState.isSubmitting}
                        className="rounded-full"
                        value={field.value as string}
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
                        {...field}
                        placeholder="npwp"
                        data-testid="input-npwp"
                        disabled={form.formState.isSubmitting || isDisable}
                        aria-disabled={form.formState.isSubmitting}
                        className="rounded-full"
                        value={field.value as string}
                      />
                    )}
                  </CustomFormField>
                  <div>
                    <Button
                      type="button"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      className="w-20 rounded-2xl px-6 border-2 border-primary bg-white text-primary hover:text-white"
                      onClick={() => setIsDisable(!isDisable)}
                    >
                      {isDisable ? "Edit" : "Cancel"}
                    </Button>
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      className="rounded-2xl px-6 mx-6"
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
                    <Button
                      type="button"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      className="rounded-2xl px-6 bg-white text-red-600 hover:bg-red-600 hover:text-white"
                      onClick={() => setShowDeleteDialog(true)}
                    >
                      Delete
                    </Button>
                    <CustomAlert
                      open={showDeleteDialog}
                      title="Kamu Yakin Untuk Menghapus Akun Ini?"
                      description="Semua hal yang terkait akun ini akan terhapus."
                      onCancel={() => {
                        setShowDeleteDialog(false);
                      }}
                      onAction={() => {
                        handleDelete();
                      }}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
}
