import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="fixed z-0 top-0 bottom-0 md:left-80 right-0">
        <Image className="w-screen h-full  object-cover object-left" src="/Background.png" alt="Tawsil" width={1500} height={1500} />
      </div>
    </div>
  );
}
