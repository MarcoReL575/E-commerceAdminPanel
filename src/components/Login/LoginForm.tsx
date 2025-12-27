import { useForm  } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { CreateUserForm } from "@/types/auth"
import ButtonAppleForm from "./ButtonAppleForm"
import ButtonGoogleForm from "./ButtonGoogleForm"
import { useAuth } from "@/services/authService"
import { useNavigate } from "react-router"
import { useAuthStore } from "@/store/useAuthStore"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const {session} = useAuthStore()
    const navigate = useNavigate()
    const { signUpSession } = useAuth()
    const { register, handleSubmit, formState:{ errors }, watch } = useForm<CreateUserForm>()
    const onSubmit = handleSubmit(async(data) => {
        const { email, password, username } = data
        await signUpSession({email, password, username})
        navigate('/');
    });

    if(session) navigate('/')

    return (
        <form onSubmit={onSubmit}>
            <FieldGroup>
                <Field>
                    <ButtonAppleForm />
                    <ButtonGoogleForm />
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    Or continue with
                </FieldSeparator>
                <Field>
                    <FieldLabel>Ingresa tu Username:</FieldLabel>
                    <Input
                        type="text"
                        placeholder="user575" 
                        {...register('username', {required: '*El username es obligatorio'})}
                    />
                    {errors.email && <span className="text-sm text-red-600 font-semibold">{errors.email.message}</span>}
                </Field>
                <Field>
                    <FieldLabel>Ingresa tu Email</FieldLabel>
                    <Input
                        type="email"
                        placeholder="m@example.com" 
                        {...register('email', {
                            required: '*El email es obligatorio',
                            minLength: {
                                value: 5, message:'*La contraseña debe de tener al menos 6 caracteres'
                            }
                        })}
                    />
                    {errors.email && <span className="text-sm text-red-600 font-semibold">{errors.email.message}</span>}
                </Field>
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Crear Password:</FieldLabel>
                    </div>
                    <Input 
                        type="password" 
                        placeholder="Ej. c0ntr@aenas3gur4"
                        {...register('password', {
                            required: '*La contraseña es obligatoria',
                            minLength: {value: 5, message:'*La conytraseña debe de tener al menos 6 caracteres'}
                        })}
                        />
                    {errors.password && <span className="text-sm text-red-600 font-semibold">{errors.password.message}</span>}
                </Field>
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Confirmar Password:</FieldLabel>
                    </div>
                    <Input 
                        type="password" 
                        placeholder="Ej. c0ntr@aenas3gur4"
                        {...register('confirmPassword', {
                            validate: (value)=> value === watch('password') ? true : '*Las contraseñas deben coincidir' 
                        })}
                    />
                    {errors.confirmPassword && <span className="text-sm text-red-600 font-semibold">{errors.confirmPassword.message}</span>}
                </Field>
                <Field>
                    <Button type="submit">Login</Button>
                </Field>
            </FieldGroup>
        </form>
    )
}
