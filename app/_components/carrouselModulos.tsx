import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselSize() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6">
            <div className="p-1">
              <Card className="bg-zinc-700 border-none rounded-none">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        size={"lg"}
        className="bg-transparent border-none text-[var(--vermelho)] hover:bg-transparent hover:text-red-800"
      />
      <CarouselNext className="bg-transparent border-none text-[var(--vermelho)] hover:bg-transparent hover:text-red-800" />
    </Carousel>
  );
}
