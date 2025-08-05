import React from 'react';
import { Download, Edit, RotateCcw } from 'lucide-react';


const DownloadActions = ({ onDownload, onModifyPrompt, onResetForm, isDownloading }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-4">
      <div className="flex items-center space-x-4">
        {/* Download Image Button */}
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className={`flex items-center space-x-2 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-cyan-500 hover:to-cyan-600 transition-all duration-200 shadow-sm font-medium ${isDownloading ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {isDownloading ? (
            <>
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              <span>Downloading...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download Image</span>
            </>
          )}
        </button>

        {/* Modify Prompt Button */}
        <button
          onClick={onModifyPrompt}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          <Edit className="w-4 h-4" />
          <span>Modify Prompt</span>
        </button>

        {/* Reset Form Button */}
        <button
          onClick={onResetForm}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Form</span>
        </button>
      </div>
    </div>
  );
};

export default DownloadActions;