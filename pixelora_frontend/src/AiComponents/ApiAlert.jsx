import React from 'react';
import { AlertCircle, X } from 'lucide-react';

// API Configuration Alert Component
const ApiAlert = ({ onDismiss }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="text-blue-900 font-medium">Demo Mode Active</h4>
          <p className="text-blue-700 text-sm mt-1">
            Using placeholder images. To use real AI generation, add your Hugging Face API key in the code.
            Get your free key at <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="underline">huggingface.co/settings/tokens</a>
          </p>
        </div>
        <button 
          onClick={onDismiss}
          className="text-blue-600 hover:text-blue-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ApiAlert;
