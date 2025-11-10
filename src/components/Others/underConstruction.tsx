// src/components/demo/DemoComponent.tsx
import React from "react";

const UnderConstruction: React.FC<{ name: string }> = ({ name }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                {/* Construction Icon */}
                <div className="text-6xl mb-4">🚧</div>

                {/* Heading */}
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Under Construction</h1>

                {/* Description */}
                <p className="text-gray-600 mb-4">
                    The <span className="font-semibold text-primary">{name}</span> page is currently under construction.
                    Please check back later!
                </p>

                {/* Fun Message */}
                <p className="text-sm text-gray-500">
                    Our team is working hard to bring you an amazing experience. Stay tuned!
                </p>
            </div>
        </div>
    );
};

export default UnderConstruction;