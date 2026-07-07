import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const [preparedBy, setPreparedBy] = useState(
    () => localStorage.getItem('preparedBy') || ''
  );
  const [saved, setSaved] = useState(false);

  function handleSave() {
    localStorage.setItem('preparedBy', preparedBy);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <button onClick={() => navigate('/')} className="text-sm underline mb-4">
        ← Back to Home
      </button>

      <h1 className="text-xl font-bold mb-4">Settings</h1>

      <label className="block text-sm text-gray-500 mb-1">Your name</label>
      <input
        className="w-full border rounded p-2 mb-3"
        placeholder="e.g. Tandeka"
        value={preparedBy}
        onChange={(e) => setPreparedBy(e.target.value)}
      />
      <p className="text-xs text-gray-500 mb-4">
        This name is automatically filled in as "Prepared by" on every stock
        request PDF you create.
      </p>

      <button
        onClick={handleSave}
        className="w-full bg-black text-white rounded p-3"
      >
        {saved ? 'Saved ✓' : 'Save'}
      </button>
    </div>
  );
}