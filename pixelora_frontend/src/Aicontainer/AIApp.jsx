import PromptInput from '../AiComponents/PromptInput';
import "./index.css";
import GeneratedImage from '../AiComponents/GeneratedImage';
import React, { useState, useEffect, useCallback } from 'react';
import SamplePrompts from '../AiComponents/SamplePrompts';
import DownloadActions from '../AiComponents/DownloadActions';
import ApiTokenPrompt from '../AiComponents/ApiTokenPrompt';
import { generateImage } from './ImageGenerationService';
import { getCreation } from "./GetCreationService";

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // API token prompt is handled by conditional rendering below

  // Poll for image until ready
  async function pollForImage({ apiKey, creationId, intervalMs = 3000, maxAttempts = 20 }) {
    let attempts = 0;
    while (attempts < maxAttempts) {
      try {
        const creation = await getCreation({ apiKey, creationId });
        if (creation.images && creation.images[0] && creation.images[0].url) {
          return creation.images[0].url;
        }
      } catch (err) {
        setError(err.message);
        break;
      }
      await new Promise(res => setTimeout(res, intervalMs));
      attempts++;
    }
    throw new Error("Image generation timed out. Please try again.");
  }

  const handleGenerate = async ({ prompt, model, aspectRatio, steps }) => {
    setError("");
    setIsGenerating(true);
    setGeneratedImage(null);
    try {
      const creation = await generateImage({ apiKey, prompt, model, aspectRatio, steps });
      const url = await pollForImage({ apiKey, creationId: creation.id });
      setGeneratedImage({ url, prompt, model, aspectRatio, steps });
    } catch (err) {
      setError(err.message || "Image generation failed. or API key may be invalid.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = useCallback(() => {
    if (!generatedImage || !generatedImage.url) return;
    window.open(generatedImage.url, "_blank", "noopener,noreferrer");
  }, [generatedImage]);

  // Keyboard shortcut for download (Ctrl+S)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s" && generatedImage && !isGenerating) {
        event.preventDefault();
        handleDownload();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [generatedImage, isGenerating, handleDownload]);

  const handleModifyPrompt = () => {
    setGeneratedImage(null);
    setIsGenerating(false);
    document.querySelector("textarea")?.focus();
  };

  const handleResetForm = () => {
    setPrompt("");
    setGeneratedImage(null);
    setIsGenerating(false);
  };

  const handlePromptSelect = (selectedPrompt) => {
    setPrompt(selectedPrompt);
    document.querySelector("textarea")?.focus();
  };

  // Show token prompt if not set
  if (!apiKey) {
    return <ApiTokenPrompt onTokenSubmit={setApiKey} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {error && (
        <div className="max-w-4xl mx-auto mb-2 text-red-600 text-sm text-center">{error}</div>
      )}
      <PromptInput 
        onGenerate={handleGenerate} 
        prompt={prompt} 
        setPrompt={setPrompt} 
        isGenerating={isGenerating}
        apiKey={apiKey}
      />
      <GeneratedImage 
        isGenerating={isGenerating} 
        generatedImage={generatedImage && generatedImage.url}
      />
      {generatedImage && !isGenerating && (
        <DownloadActions 
          onDownload={handleDownload}
          onModifyPrompt={handleModifyPrompt}
          onResetForm={handleResetForm}
          isDownloading={isDownloading}
        />
      )}
      <SamplePrompts onPromptSelect={handlePromptSelect} />
    </div>
  );
}
