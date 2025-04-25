import Image from "next/image";

const Banner = () => {
  return (
    <section>
      <Image
        src={"/banner.svg"}
        alt="Banner da página"
        width={0}
        height={0}
        objectFit="cover"
        className="w-full"
      />
    </section>
  );
};

export default Banner;
