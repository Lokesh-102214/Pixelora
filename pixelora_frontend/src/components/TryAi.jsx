import React from "react";

const GenerateImageButton = () => {
  return (
    <button className="flex items-center justify-center gap-2 w-24 h-12 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold text-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none cursor-pointer overflow-hidden relative">
      {/* Sparkles icon */}
      <span className="text-xl animate-pulse">✨</span>
      {/* Button text */}
      <span className="text-lg z-10">AI</span>
    </button>
  );
};

export default GenerateImageButton;
