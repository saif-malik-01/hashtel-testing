"use client";

import Image from "next/image";
import { useState } from "react";
import ImageMagnify from "@/components/image-magnify";
import { VariantDetailsFragment } from "@/gql/graphql";
import { cn } from "@/lib/utils";

export default function ImagesViewer({
  images = [],
  salePercent = 0,
}: {
  images: VariantDetailsFragment["media"];
  salePercent: number;
}) {
  const [index, setIndex] = useState(0);

  const handleChange = (idx: number) => {
    setIndex(idx);
  };

  return (
    <div className="flex gap-2 flex-col-reverse md:flex-row">
      <div className="flex gap-4 justify-start align-center md:flex-col md:w-[220px] md:h-[400px] overflow-y-auto md:overflow-x-hidden overflow-x-auto">
        {images &&
          images.map((item, idx) => (
            <Image
              key={idx}
              className={cn(
                "cursor-pointer rounded-sm w-[120px] object-cover",
                index === idx && "border-2 border-primary"
              )}
              src={item.url}
              width={240}
              height={240}
              onClick={() => handleChange(idx)}
              alt={item.alt}
            />
          ))}
      </div>
      <div className="relative h-full w-full">
        <ImageMagnify
          src={images?.[index]?.url}
          width={600}
          height={600}
          className="w-full object-contain rounded-lg"
          alt={images?.[index]?.alt}
        />
        <p className="absolute top-4 left-4 shadow text-sm font-[500] bg-white px-2 py-1 w-fit rounded-sm">
          New
        </p>
        {!!salePercent && (
          <p className="font-semibold bg-primary absolute top-16 left-4 shadow text-sm text-white px-2 py-1 w-fit rounded-sm">
            {salePercent}%
          </p>
        )}
      </div>
    </div>
  );
}
