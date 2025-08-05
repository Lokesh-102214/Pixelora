/**
 * Fetch a StarryAI creation by ID.
 * @param {string} apiKey - The StarryAI API key.
 * @param {string|number} creationId - The creation ID.
 * @returns {Promise<Object>} - The creation object (with images array).
 */
export async function getCreation({ apiKey, creationId }) {
  // Add a 2-second delay before making the request

  const url = `https://api.starryai.com/creations/${creationId}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-Key': apiKey
    }
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to fetch creation');
  }
  return await response.json();
}