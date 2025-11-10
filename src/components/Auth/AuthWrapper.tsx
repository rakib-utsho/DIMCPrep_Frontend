'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Images */}

      {/* Top Left Bars (bar-1 twice) */}
      <div className="absolute top-10 left-0 flex flex-col space-y-4 opacity-30">
        <Image
          src="/images/bar-1.png"
          alt="Bar 1 - First"
          width={314}
          height={128}
          className="object-contain"
        />
        <Image
          src="/images/bar-2.png"
          alt="Bar 1 - Second"
          width={314}
          height={128}
          className="object-contain"
        />
      </div>

      {/* Bottom Right Bars (bar-2 twice) */}
      <div className="absolute bottom-10 right-0 flex flex-col space-y-4 opacity-30">
        <Image
          src="/images/bar-2.png"
          alt="Bar 2 - First"
          width={314}
          height={128}
          className="object-contain"
        />
        <Image
          src="/images/bar-1.png"
          alt="Bar 2 - Second"
          width={314}
          height={128}
          className="object-contain"
        />
      </div>

      {/* Login/Register Content */}
      <div className="z-10 w-full max-w-md p-8 bg-white bg-opacity-80 rounded-md shadow-md">
        {children}
      </div>
    </div>
  );
}
