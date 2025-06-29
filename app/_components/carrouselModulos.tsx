import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface Module {
  id: string;
  title: string;
  image: string;
  slug: string;
}

interface CarouselSizeProps {
  modulos: Module[];
}

export function CarouselSize({ modulos }: CarouselSizeProps) {
  return (
    <Carousel className="h-full w-full">
      <CarouselContent className="h-full w-full">
        {modulos.map((modulo) => (
          <CarouselItem
            key={modulo.id}
            className="h-full w-full md:basis-1/2 lg:basis-1/6"
          >
            <div className="h-full w-full p-1">
              <Link href={`/modulos/${modulo.id}`}>
                <Card className="h-full w-full rounded-none border-none bg-zinc-700">
                  <CardContent className="flex aspect-square h-60 w-full items-center justify-center">
                    <Image
                      src={modulo.image}
                      alt={modulo.title}
                      width={1000}
                      height={1000}
                      className="h-full w-full"
                    />
                  </CardContent>
                </Card>
              </Link>
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
  );
}
