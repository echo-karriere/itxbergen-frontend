'use client';

import React from "react";
import ButtonIXB from "@/components/utils/button-ixb";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-1">
      <div className="flex space-x-4">
        {/* Primary button */}
        <ButtonIXB
          label="Primary"
          onClick={handleButtonClick}
          variant="primary"
        />

        <ButtonIXB
          label="Secondary"
          onClick={handleButtonClick}
          variant="secondary"
        />
      </div>
    </div>
  );
}
