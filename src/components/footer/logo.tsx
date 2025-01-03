import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center h-10">
      <Image
        src="/logo.png"
        alt="Logo"
        width={120}
        height={45}
        className="h-full w-auto"
      />
    </div>
  );
}
