"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";

const ProductCarousel = ({ data }: { data: Product[] }) => {
  return (
    <div>
      <Carousel
        className="w-full mb-12"
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent>
          {data.map((product: Product) => (
            <CarouselItem key={product.id}>
              <Link href={`/product/${product.slug}`}>
                <div className="relative mx-auto">
                  {product.banner && (
                    <Image
                      src={product.banner}
                      alt={product.name}
                      width={0}
                      height={0}
                      priority={true}
                      sizes="100vw"
                      className="w-full h-auto object-cover"
                    />
                  )}
                  <div className="absolute inset-0 flex items-end justify-center">
                    <div className="h2 bg-gray-900 bg-opacity-50 text-2xl font-bold px-2 text-white">
                      {product.name}
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
