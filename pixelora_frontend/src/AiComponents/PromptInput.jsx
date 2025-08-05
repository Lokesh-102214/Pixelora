import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, Zap } from 'lucide-react';
import { getStarryAiUserData } from '../Aicontainer/ApiUserData';

const PromptInput = ({ onGenerate, prompt, setPrompt, isGenerating, apiKey }) => {
  const [model, setModel] = useState('lyra');
  const [aspectRatio, setAspectRatio] = useState('square');
  const [steps, setSteps] = useState(20);
  const [credits, setCredits] = useState(null);

  // Fetch credits function
  const fetchCredits = useCallback(async () => {
    if (!apiKey) return;
    try {
      const userData = await getStarryAiUserData(apiKey);
      setCredits(userData.credits ?? userData.balance ?? userData.image_quota ?? null);
    } catch {
      setCredits(null);
    }
  }, [apiKey]);

  // Fetch credits on mount and when apiKey changes
  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  // Reload credits after image generation
  useEffect(() => {
    if (!isGenerating) {
      fetchCredits();
    }
  }, [isGenerating, fetchCredits]);

  const handleGenerate = () => {
    if (prompt.trim() && !isGenerating) {
      onGenerate({
        prompt,
        model,
        aspectRatio,
        steps
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Image Generation Prompt Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Header with credits display */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Image Generation Prompt</h2>
          <span className="p-1 text-gray-700 font-medium">
            Credits: {credits !== null ? credits : '...'}
          </span>
        </div>

        {/* Prompt Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your text description
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate: e.g., 'A majestic lion roaring on a savanna at sunset, photorealistic.'"
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400"
            disabled={isGenerating}
          />
          <div className="mt-2 text-sm text-gray-500">
            {prompt.length}/500 characters • Be specific for better results
          </div>
        </div>

        {/* Options Row */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Model Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model
            </label>
            <div className="relative">
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={isGenerating}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white pr-10 disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="lyra">lyra</option>
                <option value="hydra">hydra</option>
                <option value="fantasy">fantasy</option>
                <option value="portrait">portrait</option>
                <option value="inpunk">inpunk</option>
                <option value="abstractWorld">abstractWorld</option>
                <option value="anime">anime</option>
                <option value="argo">argo</option>
                <option value="cinematic">cinematic</option>
                <option value="photography">photography</option>
                <option value="scifi">scifi</option>
                <option value="detailedIllustration">detailedIllustration</option>
                <option value="3dIllustration">3dIllustration</option>
                <option value="flatIllustration">flatIllustration</option>
                <option value="realvisxl">realvisxl</option>
                <option value="stylevisionxl">stylevisionxl</option>
                <option value="animaginexl">animaginexl</option>
                <option value="anime_2">anime_2</option>
                <option value="anime_stylized">anime_stylized</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Aspect Ratio Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aspect Ratio
            </label>
            <div className="relative">
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                disabled={isGenerating}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white pr-10 disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="square">square</option>
                <option value="landscape">landscape</option>
                <option value="smallPortrait">smallPortrait</option>
                <option value="portrait">portrait</option>
                <option value="wide">wide</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Steps Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Steps
            </label>
            <input
              type="number"
              min={1}
              max={100}
              value={steps}
              onChange={e => setSteps(Number(e.target.value))}
              disabled={isGenerating}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-50 disabled:text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Number of inference steps (Prefer 20-30)
            </p>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-white font-medium py-4 px-6 rounded-lg hover:from-cyan-500 hover:to-cyan-600 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Generate Image</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};


export default PromptInput;