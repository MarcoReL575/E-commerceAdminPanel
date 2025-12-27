import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ToastContainer } from "react-toastify"
import { SigninForm } from "@/components/Login/SingInForm"
import { FieldDescription } from "@/components/ui/field"
import { NavLink } from "react-router"

export default function SigninPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>
                Login with your Apple or Google account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SigninForm />
              <FieldDescription className="text-center pt-2">
                ¿Aún no tines una cuenta? <NavLink to="/login">Sign up</NavLink>
              </FieldDescription>
            </CardContent>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
