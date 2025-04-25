import Image from "next/image";
import { FilePenLine, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full h-28 flex flex-col justify-center relative">
      <div className="flex justify-between items-center gap-10 px-10">
        <Image
          src={"/logo.svg"}
          alt="Logo da empresa"
          width={0}
          height={0}
          objectFit="cover"
          className="w-14"
        />
        <div className="flex items-center gap-4">
          <span>
            <Search className="text-zinc-400" />
          </span>
          <span>
            <FilePenLine className="text-zinc-400" />
          </span>
          <div className="flex items-center gap-2 rounded-3xl bg-zinc-900 p-2 border border-zinc-600">
            <span className="text-zinc-400">Username</span>
            <Image
              src={"/user.svg"}
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
        className="w-full mx-auto h-auto absolute -translate-x-1/2 left-1/2 -bottom-2"
        alt=""
      />
    </header>
  );
};

export default Header;
