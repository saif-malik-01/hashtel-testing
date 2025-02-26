import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Section */}
      <div className="md:px-32 px-6 mt-8">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16 bg-gray-200" />
          <span className="text-gray-400">/</span>
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <span className="text-gray-400">/</span>
          <Skeleton className="h-4 w-24 bg-gray-200" />
          <span className="text-gray-400">/</span>
          <Skeleton className="h-4 w-32 bg-gray-200" />
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-12 flex md:flex-row flex-col gap-8 md:px-32 px-6">
        {/* Left: Image Viewer */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <Skeleton className="w-full h-[320px] md:h-[500px] bg-gray-200 rounded-md" />
          <div className="hidden md:flex gap-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-20 h-20 bg-gray-200 rounded-md"
                />
              ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="md:w-1/2 flex flex-col gap-6">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24 bg-gray-200" />
            <Skeleton className="h-4 w-16 bg-gray-200" />
          </div>

          {/* Title */}
          <Skeleton className="h-8 md:h-10 w-3/4 bg-gray-200 rounded-md" />

          {/* Description */}
          <Skeleton className="h-4 w-full bg-gray-200 rounded-md" />
          <Skeleton className="h-4 w-5/6 bg-gray-200 rounded-md" />

          {/* Price */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20 bg-gray-200 rounded-md" />
            <Skeleton className="h-4 w-16 bg-gray-200 rounded-md" />
            <Skeleton className="h-4 w-12 bg-gray-200 rounded-md" />
          </div>

          <div className="border-b w-full my-2 border-gray-200" />

          {/* Variant Selector */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24 bg-gray-200 rounded-md" />
            <div className="flex gap-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-12 w-12 bg-gray-200 rounded-md"
                  />
                ))}
            </div>
          </div>

          <div className="border-b w-full my-2 border-gray-200" />

          {/* SKU & Category */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between w-full md:max-w-[400px]">
              <Skeleton className="h-4 w-12 bg-gray-200 rounded-md" />
              <Skeleton className="h-4 w-20 bg-gray-200 rounded-md" />
            </div>
            <div className="flex justify-between w-full md:max-w-[400px]">
              <Skeleton className="h-4 w-16 bg-gray-200 rounded-md" />
              <Skeleton className="h-4 w-24 bg-gray-200 rounded-md" />
            </div>
          </div>

          {/* Add to Cart Button */}
          <Skeleton className="h-12 w-full md:w-[80%] bg-gray-200 rounded-md" />
        </div>
      </div>
    </div>
  );
}
