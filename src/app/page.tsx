import Image from "next/image";

export default function Home() {
  return (
    <div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-5xl p-10">Dashboard</h1>
          <Image className="bg-blue-600 rounded-3xl" src="/tawsil-start.png" alt="Tawsil" width={500} height={500} />
        </div>
      </div>
  );
}
