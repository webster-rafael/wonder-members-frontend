"use client";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { login } from "@/lib/auth";
import { useAuthStore } from "@/store/auth-store";
import Image from "next/image";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "O email é obrigatório.",
    })
    .email({
      message: "O email deve ser um endereço de email válido.",
    }),
  password: z
    .string()
    .min(8, {
      message: "A senha deve conter pelo menos 6 caracteres.",
    })
    .max(100)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
      },
    ),
});

const Formlogin = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { token, user } = await login(values.email, values.password);
      useAuthStore.getState().setAuthenticated(true);
      useAuthStore.getState().setUser(user);

      document.cookie = `token=${token}; path=/; secure; samesite=strict; max-age=86400`;

      router.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-[90%] flex-col space-y-6 py-5 lg:w-3/5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  className="border-zinc-800 focus:border-none focus:ring-offset-0 focus-visible:ring-1"
                  placeholder="Digite seu email..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  className="border-zinc-800 focus:border-none focus:ring-offset-0 focus-visible:ring-1"
                  placeholder="Digite sua senha..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <Link
                className="decoration-red-900 underline-offset-4 hover:underline"
                href={"/forgot-password"}
              >
                <p className="text-end text-xs text-zinc-500">
                  Esqueceu a senha?
                </p>
              </Link>
            </FormItem>
          )}
        />

        <Button className="bg-[var(--vermelho)]" type="submit">
          Entrar
        </Button>
      </form>
      <div>
        <Image
          src={"/logo.svg"}
          alt="Logo da WONDER COSMETICS"
          width={50}
          height={50}
        />
      </div>
    </Form>
  );
};

export default Formlogin;
