import Image from "next/image";
import Formlogin from "./_components/form";

const Login = () => {
  return (
    <main className="w-full 2xl:max-w-7xl 2xl:mx-auto overflow-y-hidden h-full py-10 xl:h-screen flex justify-center items-center">
      <div className="bg-black/50 py-4 2xl:p-4 rounded-xl">
        <div className="grid grid-cols-2 gap-10 w-full">
          <div className="flex items-center justify-center flex-col gap-4 w-full relative">
            <h1 className="font-semibold text-4xl">Bem-vindo(a)</h1>
            <p className="text-zinc-500">
              O seu caminho para o sucesso começa aqui
            </p>
            <Formlogin />
            <footer className="text-center text-sm text-zinc-500 absolute bottom-40 2xl:bottom-2">
              © 2025 WONDER COSMETICS ALL RIGHTS RESERVED
            </footer>
          </div>
          <div className="w-full">
            <Image
              src={"/loginArt.svg"}
              alt="Foto de uma mulher com os olhos fechados olhando para cima."
              width={0}
              height={0}
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
