"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Banner from "./banner";

const banners = [
  {
    type: "video",
    link: "https://hashtel.in/bcb/shop/air-buds",
    bannerUrl: "/banners/1.mp4",
  },
  {
    type: "video",
    link: "https://hashtel.in/bcb/shop/neckbands",
    bannerUrl: "/banners/2.mp4",
  },
];

const Hero = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>
        {banners.map((b, idx) => (
          <CarouselItem key={idx}>
            <Banner {...b} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Hero;
