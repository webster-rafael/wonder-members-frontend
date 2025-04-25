import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full h-20 flex justify-center items-center gap-4 text-sm text-zinc-400">
      <Link href="/termos">Termos de uso</Link>
      <Link href="/sobre">Sobre nós</Link>
    </footer>
  );
};

export default Footer;
