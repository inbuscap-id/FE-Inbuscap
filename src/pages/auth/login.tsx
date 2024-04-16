import { CustomFormField } from "@/components/custom-formfield";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { userLogin } from "@/utils/apis/auth/api";
import { LoginType, loginSchema } from "@/utils/apis/auth/types";
import { setAxiosConfig } from "@/utils/apis/axiosWithConfig";
import { getUser } from "@/utils/apis/users/api";
import { useAuthStore } from "@/utils/zustand/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const addToken = useAuthStore((state) => state.addAuth);

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGetUser = async () => {
    try {
      const result = await getUser();
      useAuthStore.getState().setUser(result.data);
    } catch (error) {
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleLogin = async (data: LoginType) => {
    try {
      const result = await userLogin(data);
      addToken(result.data);
      setAxiosConfig(result.data.token);
      await handleGetUser();

      if (useAuthStore.getState().decodedToken?.is_admin) {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast({
        description: "Hello, Welcome to Inbuscap.id",
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
    <div className="flex w-full justify-between h-screen">
      <div className="w-full md:w-2/3 flex mx-auto items-center justify-center ">
        <Card className="w-3/4 md:w-3/4 lg:w-1/2">
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Don't have an account? Create account{" "}
              <Link to="/register" className="text-primary underline">
                here
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="form-login"
                onSubmit={form.handleSubmit(handleLogin)}
                className="space-y-4"
              >
                <CustomFormField
                  control={form.control}
                  name="email"
                  label="Email"
                >
                  {(field) => (
                    <Input
                      {...field}
                      id="input-email"
                      placeholder="name@mail.com"
                      type="email"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
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
                      {...field}
                      id="input-password"
                      placeholder="Password"
                      type="password"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      className="rounded-full"
                    />
                  )}
                </CustomFormField>

                <Button
                  id="btn-submit"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                  className="rounded-full"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    " Login "
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="img-bg lg:w-1/3 h-full hidden lg:flex items-center justify-end rounded-l-[50px] px-12">
        <p className="z-50 text-5xl text-white text-right font-lora font-semibold tracking-wide leading-snug subpixel-antialiased">
          Investing Business Capital (Inbuscap.id)
        </p>
      </div>
    </div>
  );
}
