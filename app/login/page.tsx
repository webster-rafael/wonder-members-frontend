import Image from "next/image";
import Formlogin from "./_components/form";

const Login = () => {
  return (
    <main className="relative flex h-dvh w-full items-center justify-center overflow-y-hidden lg:py-10 xl:h-screen 2xl:mx-auto 2xl:max-w-7xl">
      <div className="h-full w-full bg-black/50 px-4 py-10 lg:h-auto lg:rounded-xl lg:p-4">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex w-full flex-col items-center justify-center gap-4 lg:relative">
            <h1 className="text-4xl font-semibold">Bem-vindo(a)</h1>
            <p className="text-xs text-zinc-500 lg:text-base">
              O seu caminho para o sucesso começa aqui
            </p>
            <Formlogin />
            <footer className="absolute bottom-2 text-center text-xs text-zinc-500 lg:bottom-40 2xl:bottom-2">
              © 2025 WONDER COSMETICS ALL RIGHTS RESERVED
            </footer>
          </div>
          <div className="hidden w-full lg:block">
            <Image
              src={"/loginArt.svg"}
              alt="Foto de uma mulher com os olhos fechados olhando para cima."
              width={0}
              height={0}
              objectFit="cover"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
