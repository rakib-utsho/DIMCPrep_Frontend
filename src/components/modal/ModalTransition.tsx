import React, { FC } from "react";

import { motion } from "framer-motion";

export interface PageProps {
    children?: React.ReactNode;
}

export const ModalTransition: FC<PageProps> = ({ children }) => {
    return (
        <motion.div
            key="page"
            initial={{ x: "20%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-20%", opacity: 0, transition: { duration: 0.2 } }}
            transition={{ delay: 0, duration: 0.2 }}
        >
            <div>{children}</div>
        </motion.div>
    );
};