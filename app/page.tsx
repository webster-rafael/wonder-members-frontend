import { Separator } from "@/components/ui/separator";
import Banner from "./_components/banner";
import Footer from "./_components/footer";
import Header from "./_components/header";
import Modulos from "./_components/módulos";
import ProtectedRouter from "./_components/protectRouter";

export default function Home() {
  return (
    <ProtectedRouter>
      <main className="overflow-x-hidden">
        <Header />
        <Banner />
        <Modulos />
        <Separator />
        <Footer />
      </main>
    </ProtectedRouter>
  );
}
