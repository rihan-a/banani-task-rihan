"use client";

import { motion } from "framer-motion";

export default function TableSkeleton() {
    return (
        <motion.div
            className="animate-pulse w-[96vw] sm:w-[200px] md:w-[640px] lg:w-[740px] h-[160px] bg-gray-200 rounded-lg p-4 flex flex-col gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
        >
            {/* mock header */}
            <div className="h-7 bg-gray-300 rounded w-full"></div>
            {/* mock rows */}
            <div className="h-7 bg-gray-300 rounded w-full"></div>
            <div className="h-7 bg-gray-300 rounded w-full"></div>
            <div className="h-7 bg-gray-300 rounded w-full"></div>
        </motion.div>
    );
}
