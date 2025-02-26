import React from "react";

interface Block {
  id: string;
  type: string;
  data: {
    text?: string;
    level?: number;
    items?: string[];
    style?: "ordered" | "unordered";
  };
}

interface ProductDescription {
  time: number;
  blocks: Block[];
  version: string;
}

export function Description({
  description,
}: {
  description: string | null | undefined;
}) {
  if (!description)
    return <p className="text-gray-500">No description available.</p>;

  let parsedData: ProductDescription;
  try {
    parsedData = JSON.parse(description);
  } catch (error) {
    console.error("Error parsing product description:", error);
    return <p className="text-red-500">Error loading description.</p>;
  }

  const { blocks } = parsedData;

  if (!blocks || blocks.length === 0) {
    return <p className="text-gray-500">No content available.</p>;
  }

  return (
    <div className="space-y-4 text-gray-600">
      {blocks.map((block) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={block.id}
                className="text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: block.data.text || "" }}
              />
            );

          case "header":
            return (
              <p
                key={block.id}
                className={`font-semibold ${
                  block.data.level === 1
                    ? "text-3xl"
                    : block.data.level === 2
                    ? "text-2xl"
                    : "text-xl"
                }`}
              >
                {block.data.text}
              </p>
            );

          case "list":
            const ListTag = block.data.style === "ordered" ? "ol" : "ul";
            return (
              <ListTag
                key={block.id}
                className={`${
                  block.data.style === "ordered" ? "list-decimal" : "list-disc"
                } pl-6 space-y-2`}
              >
                {block.data.items?.map((item, index) => (
                  <li
                    key={index}
                    className="text-base"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </ListTag>
            );

          default:
            return null; // Ignore unknown block types
        }
      })}
    </div>
  );
}
