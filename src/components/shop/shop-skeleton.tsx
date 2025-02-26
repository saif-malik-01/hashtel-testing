import { Skeleton } from "@/components/ui/skeleton";

export default function ShopSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mt-12 md:px-16 p-6 flex">
        {/* Sidebar (Filters) - Hidden on Mobile */}
        <div className="hidden md:block w-[30%] pr-6">
          <div className="mt-8 flex flex-col items-start gap-8">
            {/* Filter Title */}
            <Skeleton className="w-28 h-6 bg-gray-200 rounded-full" />

            {/* Filter Options */}
            <div className="flex flex-col gap-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-[80px] h-[18px] bg-gray-200 rounded-full"
                    style={{ width: `${60 + i * 10}px` }} // Vary widths slightly
                  />
                ))}
            </div>

            {/* Another Filter Section */}
            <Skeleton className="w-20 h-6 bg-gray-200 rounded-full" />
            <div className="w-full flex flex-col gap-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex justify-between w-[60%]">
                    <Skeleton
                      className="w-28 h-[18px] bg-gray-200 rounded-full"
                      style={{ width: `${90 + i * 10}px` }}
                    />
                    <Skeleton className="w-4 h-4 bg-gray-200 rounded-sm" />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-[70%]">
          {/* Sort/Title */}
          <Skeleton className="w-[50%] md:w-32 h-6 mb-8 bg-gray-200 rounded-full" />

          {/* Grid */}
          <div className="grid md:grid-cols-3 grid-cols-2 md:gap-8 gap-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`${
                    i === 3 ? "md:hidden" : ""
                  } w-full flex flex-col items-start gap-4`}
                >
                  <Skeleton className="w-full h-[300px] bg-gray-200 rounded-md" />
                  <Skeleton className="w-[60%] h-[20px] bg-gray-200 rounded-full" />
                  <Skeleton className="w-[80%] h-[20px] bg-gray-200 rounded-full" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}