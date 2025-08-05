import React from 'react';

const SamplePrompts = ({ onPromptSelect }) => {
  const samplePrompts = [
    "A majestic lion roaring on a savanna at sunset, photorealistic.",
    "Whimsical treehouse village nestled in an ancient forest, fairy tale illustration.",
    "A knight standing on a mountain overlooking a dragon in a stormy sky, fantasy art.",
    "Retro-futuristic car driving through a neon-lit city street at night, 80s aesthetic."
  ];

  const handlePromptClick = (prompt) => {
    if (onPromptSelect) {
      onPromptSelect(prompt);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Sample Prompts</h2>
        
        {/* Prompts List */}
        <div className="space-y-4">
          {samplePrompts.map((prompt, index) => (
            <div
              key={index}
              onClick={() => handlePromptClick(prompt)}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
            >
              {/* Icon */}
              <div className="flex mt-1">
                <div className="w-2 h-2 items-center justify-center bg-cyan-400 rounded-full"></div>
              </div>
              
              {/* Prompt Text */}
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                {prompt}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default SamplePrompts;