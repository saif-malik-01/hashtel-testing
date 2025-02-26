export const Pair = ({
  title,
  value,
  orientation,
}: {
  title: string;
  value: string;
  orientation: "vertical" | "horizontal";
}) => {
  return (
    <div
      className={`w-full md:max-w-[400px] flex ${
        orientation === "vertical" ? "flex-col" : "flex-row"
      } items-start gap-2 justify-between`}
    >
      <p className="text-sm text-gray-600">{title}</p>
      <span className="text-right text-sm">{value}</span>
    </div>
  );
};
