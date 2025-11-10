import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5"; // Import close icon

interface ModalThemeWrapperProps {
  children: React.ReactNode;
  onClose?: () => void; // Add onClose prop
}

const ModalThemeWrapper: React.FC<ModalThemeWrapperProps> = ({
  children,
  onClose,
}) => {
  return (
    <div className="relative bg-white rounded-none sm:rounded-xl shadow-lg overflow-hidden w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[950px] mx-auto my-0 sm:my-8">
      {/* Close Button - Top Right Corner */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1 rounded bg-red-500 hover:bg-red-700 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <IoClose className="w-5 h-5 text-white font-bold" />
        </button>
      )}

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-[120px] h-[180px] sm:w-[160px] sm:h-[240px] md:w-[214px] md:h-[300px] rounded-br-full overflow-hidden">
        <Image
          src="/images/modal1.png"
          alt="Background Image"
          width={214}
          height={300}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Right Bottom Decoration */}
      <div className="absolute bottom-0 right-0 w-[120px] h-[130px] sm:w-[160px] sm:h-[180px] md:w-[214px] md:h-[231px] bg-[#38C9BF] rounded-tl-full overflow-hidden" />

      {/* Main Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default ModalThemeWrapper;
