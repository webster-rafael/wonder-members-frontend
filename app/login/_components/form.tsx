"use client";
import { z } from "zod";

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

const formSchema = z.object({
  username: z
    .string()
    .min(4, {
      message: "O nome de usuário deve conter pelo menos 4 caracteres.",
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "O nome de usuário deve conter apenas letras e números.",
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
      }
    ),
});

const Formlogin = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-3/5 flex flex-col py-5"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input
                  className="focus-visible:ring-1 focus:ring-offset-0 focus:border-none border-zinc-800"
                  placeholder="Seu nome de usuário"
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
                  className="focus-visible:ring-1 focus:ring-offset-0 focus:border-none border-zinc-800"
                  placeholder="Sua senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <Link
                className="hover:underline underline-offset-4 decoration-red-900"
                href={"/forgot-password"}
              >
                <p className="text-xs text-end text-zinc-500">
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
    </Form>
  );
};

export default Formlogin;
