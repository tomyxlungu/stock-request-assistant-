import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  function startRequest(type: 'Urgent' | 'Bulk') {
    // Pass the type via route state, so AddItems knows which kind of
    // request it's building without needing a separate selection step.
    navigate('/add-items', { state: { type } });
  }

  return (
    <div className="p-4 max-w-md mx-auto flex flex-col gap-4 mt-8">
      <h1 className="text-xl font-bold text-center mb-4">Stock Request Assistant</h1>

      <button
        onClick={() => startRequest('Urgent')}
        className="bg-red-600 text-white rounded p-6 text-lg font-semibold"
      >
        Create Urgent Request
      </button>

      <button
        onClick={() => startRequest('Bulk')}
        className="bg-black text-white rounded p-6 text-lg font-semibold"
      >
        Create Bulk Request
      </button>

      <div className="flex justify-between mt-6 text-sm">
        <button onClick={() => navigate('/history')} className="underline">
          View History
        </button>
        <button onClick={() => navigate('/products')} className="underline">
          Manage Products
        </button>
        <button onClick={() => navigate('/settings')} className="underline">
          Settings
        </button>
      </div>
    </div>
  );
}