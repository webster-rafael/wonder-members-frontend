"use client";

import { useModulesData } from "@/hooks/useModulesData";
import { CarouselSize } from "./carrouselModulos";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const Modulos = () => {
  const { data, isLoading, error } = useModulesData();

  if (isLoading)
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-10">
        <h1 className="font-semibold">Módulos</h1>
        <Carousel className="w-full">
          <CarouselContent>
            {Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6">
                <div className="p-1">
                  <Card className="w-full animate-pulse rounded-none border-none bg-zinc-700">
                    <CardContent className="flex aspect-square h-full w-full items-center justify-center p-6"></CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            size={"lg"}
            className="border-none bg-transparent text-[var(--vermelho)] hover:bg-transparent hover:text-red-800"
          />
          <CarouselNext className="border-none bg-transparent text-[var(--vermelho)] hover:bg-transparent hover:text-red-800" />
        </Carousel>
      </section>
    );
  if (error) return <p>Erro ao carregar os módulos.</p>;
  console.log(data);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10">
      <h1 className="font-semibold">Módulos</h1>
      <CarouselSize modulos={data} />
    </section>
  );
};

export default Modulos;
