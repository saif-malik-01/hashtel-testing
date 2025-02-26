import Image from "next/image";

type BANNER = {
  bannerUrl: string;
  link: string;
  type: "video" | "image" | string;
};

const Banner = ({ link, type, bannerUrl }: BANNER) => {
  return (
    <a
      href={link}
      className={`relative flex flex-col-reverse md:flex-row items-center justify-center w-screen md:min-h-[540px] min-h-[150px]`}
    >
      {type === "video" ? (
        <video
          width={320}
          height={240}
          src={bannerUrl}
          title="banner video"
          preload="auto"
          autoPlay
          className="absolute top-0 left-0 w-full h-full"
        />
      ) : (
        <Image
          src={bannerUrl}
          alt="banner"
          width={1080}
          height={420}
          className="absolute top-0 left-0 w-full h-full"
          style={{ objectFit: "cover" }}
        />
      )}
    </a>
  );
};

export default Banner;
