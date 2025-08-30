interface InfoCardProps {
  children: React.ReactNode;
  bgColor: string;
}

export default function InfoCard({ children, bgColor }: InfoCardProps) {
  return (
    <div
      className={`w-full md:w-[35%] h-auto items-center ${bgColor} rounded-t-3xl rounded-tr-[150px] p-8 md:p-10 shadow-2xl space-y-8`}
    >
      {children}
    </div>
  );
}
