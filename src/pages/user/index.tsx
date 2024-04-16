import defaultAvatar from "@/assets/default-avatar.jpg";
import CustomAlert from "@/components/custom-alert";
import { CustomFormField } from "@/components/custom-formfield";
import Layout from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { deleteProfile, getUser, updateUser } from "@/utils/apis/users/api";
import { ProfileSchema, ProfileType } from "@/utils/apis/users/type";
import { formatRupiah } from "@/utils/format-money";
import { useAuthStore } from "@/utils/zustand/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Profile() {
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const resetToken = useAuthStore((state) => state.resetAuth);

  const form = useForm<ProfileType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      fullname: "",
      email: "",
      handphone: "",
      ktp: "",
      npwp: "",
      avatar: new File([], ""),
    },
  });

  useEffect(() => {
    form.setValue("fullname", user?.fullname!);
    form.setValue("email", user?.email!);
    form.setValue("ktp", user?.ktp!);
    form.setValue("handphone", user?.handphone!);
    form.setValue("npwp", user?.npwp!);
  }, [user, isDisable]);

  const handleUpdate = async (data: ProfileType) => {
    try {
      const result = await updateUser(data);

      setIsDisable(!isDisable);
      toast({
        description: result.message,
      });

      const dataUser = await getUser();
      setUser(dataUser.data);
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
        <div className="mb-6 mt-2 flex md:gap-10 gap-4">
          <Link to={"/profile"}>
            <p
              className={cn(
                "xl:text-xl md:text-xl text-sm text-slate-600 hover:text-black",
                location.pathname === "/profile"
                  ? "text-black font-semibold"
                  : ""
              )}
            >
              My Profile
            </p>
          </Link>
          <Link to={"/invested-business"}>
            <p className="xl:text-xl md:text-xl text-sm text-slate-600 hover:text-black">
              Invested Business
            </p>
          </Link>
          <Link to={"/verification"}>
            <p className="xl:text-xl md:text-xl text-sm text-slate-600 hover:text-black">
              Verification
            </p>
          </Link>
          <Link to={"/topup"}>
            <p className="xl:text-xl md:text-xl text-sm text-slate-600 hover:text-black">
              Top Up
            </p>
          </Link>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            data-testid="form-register"
            className="space-y-6"
          >
            <div className="md:flex sm:grid justify-start gap-4">
              <div>
                <Avatar className="md:w-[250px] md:h-[250px] w-[200px] h-[200px] m-5">
                  <AvatarImage
                    className="object-cover"
                    src={user?.avatar ? user.avatar : defaultAvatar}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CustomFormField
                  control={form.control}
                  name="avatar"
                  label="Avatar"
                >
                  {(field) => (
                    <Input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      multiple={false}
                      disabled={form.formState.isSubmitting || isDisable}
                      aria-disabled={form.formState.isSubmitting}
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                      className="w-11/12"
                    />
                  )}
                </CustomFormField>
              </div>
              <Card className="w-full lg:w-1/3 mt-5">
                <CardContent>
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
                    name="ktp"
                    label="No KTP"
                  >
                    {(field) => (
                      <Input
                        {...field}
                        placeholder="Your KTP"
                        id="input-ktp"
                        type="number"
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
                        id="input-phone-number"
                        type="tel"
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
                        id="input-npwp"
                        type="number"
                        disabled={form.formState.isSubmitting || isDisable}
                        aria-disabled={form.formState.isSubmitting}
                        className="rounded-full"
                        value={field.value as string}
                      />
                    )}
                  </CustomFormField>
                  <div className="w-full flex mt-5">
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
                      className="rounded-2xl px-6 bg-white text-red-600 hover:bg-red-600 hover:text-white border-2 border-red-500"
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
                </CardContent>
              </Card>
              <div className="m-5 flex flex-col gap-4">
                <p className="text-xl font-semibold">
                  Saldo : {formatRupiah.format(user?.saldo!)}
                </p>
              </div>
            </div>
          </form>
        </Form>
      </Layout>
    </>
  );
}
