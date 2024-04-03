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
import { getUser } from "@/utils/apis/users/api";
import { useAuthStore } from "@/utils/zustand/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
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
    const result = await getUser();
    useAuthStore.getState().setUser(result);
  };

  async function handleLogin(data: LoginType) {
    try {
      const result = await userLogin(data);
      addToken(result.data);
      handleGetUser();
      toast({
        description: "Hello, Welcome to Inbuscap.id",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex w-full justify-between h-screen">
      <div className="w-full flex items-center justify-center md:w-2/3">
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
                data-testid="form-login"
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
                      data-testid="input-email"
                      placeholder="name@mail.com"
                      type="email"
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
                      data-testid="input-password"
                      placeholder="Password"
                      type="password"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      {...field}
                      className="rounded-full"
                    />
                  )}
                </CustomFormField>

                <Button
                  data-testid="btn-submit"
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
      <div className="img-bg hidden lg:flex h-full w-1/3 items-center justify-end rounded-l-[50px] px-12">
        <p className="z-50 text-5xl text-white text-right font-lora font-semibold tracking-wide leading-snug subpixel-antialiased">
          Investing Business Capital (Inbuscap.id)
        </p>
      </div>
    </div>
  );
};

export default Login;
