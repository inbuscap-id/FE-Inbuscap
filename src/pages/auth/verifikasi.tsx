import { CustomFormField } from '@/components/custom-formfield'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { VerificationType, userVerification, verificationSchema } from '@/utils/apis/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

const Verifikasi = () => {
    // const navigate = useNavigate();
    // const { toast } = useToast();

    const form = useForm<VerificationType>({
        resolver: zodResolver(verificationSchema),
        defaultValues: {
            photo_ktp: "",
            photo_npwp: "",
            photo_selfie: "",
        },
    });

    // async function onSubmit(data:VerificationType) {
    //     try{
    //         const result = await userVerification(data);
    //         toast({
    //             description: result.message,
    //         });
    //         navigate("/login");
    //     }catch(error){
    //         toast({
    //             title: "Oops! Something went wrong.",
    //             description: (error as Error).message,
    //             variant: "destructive",
    //         });
    //     }


    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center md:w-1/2">
            <Card className="w-3/5 md:1/2">
            <CardHeader>
              <CardTitle className="text-center">Verifikasi</CardTitle>
            </CardHeader>
            <CardContent>
            
            <Form {...form}>
                <form
                  data-testid="form-verification"
                //   onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <CustomFormField
                    control={form.control}
                    name="photo_ktp"
                    label="Foto KTP"
                  >
                    {(field) => (
                      <Input
                        placeholder="Upload foto ktp"
                        type="file"
                        data-testid="upload-ktp"
                        disabled={form.formState.isSubmitting}
                        aria-disabled={form.formState.isSubmitting}
                        {...field} className="rounded-full"
                      />
                    )}
                  </CustomFormField>
                  <CustomFormField
                    control={form.control}
                    name="photo_npwp"
                    label="Foto NPWP"
                  >
                    {(field) => (
                      <Input
                        placeholder="npwp..."
                        type="file"
                        data-testid="upload-npwp"
                        disabled={form.formState.isSubmitting}
                        aria-disabled={form.formState.isSubmitting}
                        {...field} className="rounded-full"
                      />
                    )}
                  </CustomFormField>
                  <CustomFormField
                    control={form.control}
                    name="photo_selfie"
                    label="Foto Selfie"
                  >
                    {(field) => (
                      <Input
                        placeholder="Upload Foto..."
                        type="file"
                        data-testid="upload-foto-selfie"
                        disabled={form.formState.isSubmitting}
                        aria-disabled={form.formState.isSubmitting}
                        {...field} className="rounded-full"
                      />
                    )}
                  </CustomFormField>
                  <CardDescription>Note: Pastikan foto anda terlihat jelas</CardDescription>
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
                </CardContent>
            </Card>
            </div>
            <div className="hidden lg:flex h-full w-1/2 items-center justify-center rounded-l-[50px] img-bg">
        <p className="z-50 text-7xl text-white text-right font-lora font-semibold tracking-wide leading-snug subpixel-antialiased">Investing<br/>Business Capitol<br/>(Inbuscap.id)</p>
        </div>
        </div>
    )
}


export default Verifikasi
