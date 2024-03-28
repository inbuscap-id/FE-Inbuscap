import { CustomFormField } from '@/components/custom-formfield';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'

import { RegisterType, registerSchema, userRegister } from '@/utils/apis/auth';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Register = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const form = useForm<RegisterType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullname: "",
            email: "",
            handphone: "",
            password: "",
            ktp: "",
            npwp: "",
        },
    });

    async function onSubmit(data:RegisterType) {
        try{
            const result = await userRegister(data);
            toast({
                description: result.message,
            });
            navigate("/login");
        }catch(error){
            toast({
                title: "Oops! Something went wrong.",
                description: (error as Error).message,
                variant: "destructive",
            });
        }
        
    }

  return (
    <div className="flex w-full h-screen">
        <div className="w-full flex items-center justify-center md:w-1/2">
        <Card className="w-3/5 md:1/2">
        <CardHeader>
          <CardTitle className="text-center">Register</CardTitle>
          <CardDescription className="text-center">
            Already have an account? sign <Link to="/login" className="text-primary underline">here</Link>
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <Form {...form}>
            <form
              data-testid="form-register"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
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
                    {...field} className="rounded-full"
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
                    {...field} className="rounded-full"
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="handphone"
                label="Handphone"
              >
                {(field) => (
                  <Input
                    placeholder="Phone Number"
                    type="phone number"
                    data-testid="input-phone-number"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field} className="rounded-full"
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
                    placeholder="Password"
                    type="password"
                    data-testid="input-password"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field} className="rounded-full"
                  />
                )}
              </CustomFormField>
              <CustomFormField
                control={form.control}
                name="ktp"
                label="KTP"
              >
                {(field) => (
                  <Input
                    placeholder="ktp"
                    type="tel"
                    data-testid="input-ktp"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field} className="rounded-full"
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
                    {...field} className="rounded-full"
                  />
                )}
              </CustomFormField>
              <Button
                  type="submit"
                  data-testid="btn-submit"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting} className="rounded-full"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </form>
            </Form>
            </Card>
        </div>
        <div className="hidden lg:flex h-full w-1/2 items-center justify-center rounded-l-[50px] img-bg">
        <p className="z-50 text-7xl text-white text-right font-lora font-semibold tracking-wide leading-snug subpixel-antialiased">Investing<br/>Business Capitol<br/>(Inbuscap.id)</p>
        </div>
    </div>
            
  )
}

export default Register
