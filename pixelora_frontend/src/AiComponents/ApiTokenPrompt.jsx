import React, { useState } from 'react';

/**
 * Prompts the user for their StarryAI API token and saves it on submit.
 * Props:
 *   - onTokenSubmit(token: string): called with the token when submitted
 */
const ApiTokenPrompt = ({ onTokenSubmit }) => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token.trim()) {
      setError('API token is required.');
      return;
    }
    setError('');
    onTokenSubmit(token.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Enter your StarryAI API Token</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            API Token
          </label>
          <input
            type="text"
            value={token}
            onChange={e => setToken(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent mb-2"
            placeholder="Paste your StarryAI API token here"
            autoFocus
          />
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 rounded-lg mt-2 transition-colors"
          >
            Save Token
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4">
          You can get your API token from your StarryAI account dashboard.
        </p>
      </div>
    </div>
  );
};

export default ApiTokenPrompt;
