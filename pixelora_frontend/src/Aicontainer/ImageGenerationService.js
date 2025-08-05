/**
 * Generate an image using StarryAI API.
 * @param {Object} params
 * @param {string} params.apiKey - The StarryAI API key (from ApiTokenPrompt.jsx)
 * @param {string} params.prompt - The prompt text (from PromptInput.jsx)
 * @param {string} params.imageStyle - The image style (e.g. 'Realistic', 'Artistic', etc.)
 * @param {string} params.aspectRatio - The aspect ratio (e.g. 'square')
 * @returns {Promise<Object>} - The StarryAI API response
 */
export async function generateImage({ apiKey, prompt, model = 'lyra', aspectRatio = 'square', steps = 20 }) {
  const url = 'https://api.starryai.com/creations/';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-API-Key': apiKey
    },
    body: JSON.stringify({
      model,
      aspectRatio,
      highResolution: false,
      images: 1,
      steps,
      initialImageMode: 'color',
      prompt,
    })
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Image generation failed or API key may be invalid.');
  }
  return await response.json();
}