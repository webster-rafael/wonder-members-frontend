"use client";
import Image from "next/image";
import { useAuthStore } from "@/store/auth-store";

const Header = () => {
  const { user: currentUser } = useAuthStore();
  return (
    <header className="relative flex h-22 w-full flex-col justify-center lg:h-28">
      <div className="flex items-center justify-between gap-10 px-4 lg:px-10">
        <Image
          src={"/logo.svg"}
          alt="Logo da empresa"
          width={0}
          height={0}
          objectFit="cover"
          className="w-10 lg:w-14"
        />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-3xl border border-zinc-600 bg-zinc-900 p-2">
            <span className="text-zinc-400">
              {currentUser?.name || "Usuário"}
            </span>
            <Image
              src={currentUser?.image || "/user.png"}
              alt="Imagem de usuário"
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      <Image
        src={"/header-border.svg"}
        width={0}
        height={0}
        objectFit="cover"
        className="absolute bottom-0 lg:-bottom-2 left-1/2 mx-auto h-auto w-full -translate-x-1/2"
        alt=""
      />
    </header>
  );
};

export default Header;
