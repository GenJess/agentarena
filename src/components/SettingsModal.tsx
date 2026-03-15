import React, { useState, useEffect } from 'react';
import { X, Key } from 'lucide-react';
import { getApiKey, saveApiKey } from '../utils/apiKey';

interface SettingsModalProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    setApiKey(getApiKey());
  }, []);

  const handleSave = () => {
    saveApiKey(apiKey);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-white/90 rounded-3xl w-full max-w-md shadow-xl border border-gray-200/50">
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <div className="flex items-center space-x-3">
            <Key className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">API Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100/70 hover:bg-gray-200/70 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-200 border border-gray-200/50"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="w-full bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSave}
            className="w-full px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
