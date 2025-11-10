import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { LuX } from "react-icons/lu";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  isLoading = false,
}) => {
  const [isInternalLoading, setInternalLoading] = useState(true);

  if (typeof window === "undefined") return null;

  useEffect(() => {
    if (isOpen) {
      setInternalLoading(true);
      const timer = setTimeout(() => setInternalLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const showLoading = isLoading || isInternalLoading;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          />

          {/* Modal Container */}
          <motion.div
            initial={{
              opacity: 0,
              y: "100%",
              scale: window.innerWidth >= 768 ? 0.75 : 1,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: window.innerWidth < 768 ? "100%" : 20,
              scale: window.innerWidth >= 768 ? 0.75 : 1,
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="fixed inset-0 z-50 flex justify-end md:justify-center items-end md:items-center"
          >
            {/* Click Outside Close Area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-transparent z-20"
            />

            {/* Modal Content - Added fixed width during loading on large screens */}
            <div
              className={`bg-white w-full min-w-screen md:min-w-0 ${
                showLoading ? "md:w-[400px]" : "md:w-auto"
              } md:max-w-2xl max-h-[90vh] md:max-h-[90vh] md:rounded-xl shadow-xl z-30 overflow-hidden relative`}
            >
              {/* Loading Overlay */}
              <AnimatePresence>
                {showLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/80 z-40 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="w-10 h-10 border-4 border-black border-t-transparent rounded-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Close Button */}
              <div className="absolute z-50 top-2 right-2">
                <button className="cursor-pointer" onClick={onClose}>
                  <LuX className="text-white bg-[#EB3C13] w-6 h-6 rounded cursor-pointer" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex flex-col">
                <div className="overflow-y-auto">{children}</div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
