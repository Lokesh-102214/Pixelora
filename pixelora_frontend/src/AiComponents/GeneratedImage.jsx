import React from 'react';
import { X, Search, ChevronDown, Download, Edit, RotateCcw , Zap } from 'lucide-react';

const GeneratedImage = ({ isGenerating = false, generatedImage = null }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 mb-8">Generated Image</h2>
        
        {/* Image Display Area */}
        <div className="min-h-96 bg-gray-50 rounded-lg flex flex-col items-center justify-center p-12">
          {isGenerating ? (
            // Loading state
            <div className="text-center">
              <div className="animate-spin w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full mb-4 mx-auto"></div>
              <p className="text-gray-600 text-lg mb-2">Generating your image...</p>
              <p className="text-gray-400">This may take a few moments</p>
            </div>
          ) : generatedImage ? (
            // Generated image state
            <div className="w-full max-w-lg">
              <img 
                src={generatedImage} 
                alt="Generated AI Image" 
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>
          ) : (
            // Empty state (default)
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-cyan-500 text-2xl">⚡</span>
              </div>
              <p className="text-gray-600 text-lg mb-2">Your AI-generated image will appear here.</p>
              <p className="text-gray-400">Enter a prompt above and click "Generate Image" to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default GeneratedImage;