import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
=======
import { ArrowLeft, Trash2 } from 'lucide-react';
>>>>>>> cc155ab (app done)
import { useCurrentRequest } from '../hooks/useCurrentRequest';
import { saveRequest } from '../hooks/useRequests';
import { generateRequestPdf } from '../lib/generatePdf';
import { sharePdf } from '../lib/sharePdf';

export default function ReviewRequest() {
  const navigate = useNavigate();
  const { state, dispatch } = useCurrentRequest();

<<<<<<< HEAD
  // Department and prepared-by aren't collected earlier in the flow yet,
  // so they're editable right here on the review screen for now.
=======
>>>>>>> cc155ab (app done)
  const [department, setDepartment] = useState(state.department || '');
  const [preparedBy, setPreparedBy] = useState(
    () => localStorage.getItem('preparedBy') || ''
  );
<<<<<<< HEAD

  const today = new Date().toLocaleDateString();
=======
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
>>>>>>> cc155ab (app done)

  function updateQuantity(productId: number, quantity: number) {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  }

  function removeItem(productId: number) {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  }

  async function handleConfirm() {
<<<<<<< HEAD
    // Persist prepared-by for next time, so it doesn't need re-typing
    localStorage.setItem('preparedBy', preparedBy);

    const requestId = await saveRequest({
      date: today,
      department,
      type: state.type!,
      preparedBy,
      items: state.items,
    });

    const savedRequest = {
      id: requestId,
      date: today,
      department,
      type: state.type!,
      status: 'Sent' as const,
      preparedBy,
      items: state.items,
    };

    const pdf = generateRequestPdf(savedRequest);
    const filename = `stock-request-${String(requestId).padStart(4, '0')}.pdf`;
    await sharePdf(pdf, filename);

    dispatch({ type: 'RESET' });
    navigate('/history');
=======
    if (!department || !preparedBy) return;

    setError(null);
    setIsSaving(true);
    try {
      localStorage.setItem('preparedBy', preparedBy);

      const requestId = await saveRequest({
        date: today,
        department,
        type: state.type!,
        preparedBy,
        items: state.items,
      });

      const savedRequest = {
        id: requestId,
        date: today,
        department,
        type: state.type!,
        status: 'Sent' as const,
        preparedBy,
        items: state.items,
      };

      const pdf = generateRequestPdf(savedRequest);
      const filename = `stock-request-${String(requestId).padStart(4, '0')}.pdf`;

      await sharePdf(pdf, filename);

      dispatch({ type: 'RESET' });
      navigate('/history');
    } catch (err) {
      // Surface the real error directly in the UI — logcat/USB debugging has
      // proven unreliable, so this is the dependable way to actually see it.
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      console.error('Failed to save/generate/share request:', err);
    } finally {
      setIsSaving(false);
    }
>>>>>>> cc155ab (app done)
  }

  if (state.items.length === 0) {
    return (
<<<<<<< HEAD
      <div className="p-4 max-w-md mx-auto text-center text-gray-500">
        <p>No items in this request yet.</p>
        <button onClick={() => navigate('/add-items')} className="underline mt-2">
          Go back and add items
        </button>
=======
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-zinc-400 text-lg">No items in this request yet.</p>
          <button
            onClick={() => navigate('/add-items')}
            className="mt-6 text-white underline hover:text-zinc-300"
          >
            Go back and add items
          </button>
        </div>
>>>>>>> cc155ab (app done)
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-lg font-bold mb-1">
        Review {state.type === 'Urgent' ? 'Urgent' : 'Bulk'} Request
      </h1>
      <p className="text-sm text-gray-500 mb-4">{today}</p>

      <div className="space-y-2 mb-4">
        <div>
          <label htmlFor="department" className="sr-only">
            Department
          </label>
          <input
            id="department"
            title="Department"
            className="w-full border rounded p-2"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="preparedBy" className="sr-only">
            Prepared by
          </label>
          <input
            id="preparedBy"
            title="Prepared by"
            className="w-full border rounded p-2"
            placeholder="Prepared by (your name)"
            value={preparedBy}
            onChange={(e) => setPreparedBy(e.target.value)}
          />
        </div>
      </div>

      <ul className="space-y-2 mb-6">
        {state.items.map((item) => (
          <li
            key={item.productId}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{item.description}</p>
              <p className="text-xs text-gray-500">
                {item.itemNumber} · {item.unit}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <label htmlFor={`qty-${item.productId}`} className="sr-only">
                  Quantity for {item.description}
                </label>
                <input
                  id={`qty-${item.productId}`}
                  title={`Quantity for ${item.description}`}
                  type="number"
                  min={1}
                  className="w-16 border rounded p-1 text-center"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.productId, Number(e.target.value))
                  }
                />
              </div>
              <button
                onClick={() => removeItem(item.productId)}
                className="text-red-600 text-sm underline"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={handleConfirm}
        disabled={!department || !preparedBy}
        className="w-full bg-black text-white rounded p-3 disabled:opacity-40"
      >
        Confirm & Generate PDF
      </button>
=======
    <div className="min-h-screen bg-zinc-950 flex flex-col pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-zinc-950 px-5 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/add-items')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>

          <span className="text-sm text-zinc-500">{state.items.length} items</span>
        </div>

        <h1 className="mt-4 text-2xl font-bold text-white tracking-tight">
          Review Request
        </h1>
        <p className="text-zinc-500">{today}</p>
      </div>

      <div className="flex-1 px-5 pt-6 pb-8">
        {/* Request Info */}
        <div className="space-y-4 mb-8">
          <div>
            <label htmlFor="department" className="block text-xs text-zinc-500 mb-1.5">
              DEPARTMENT
            </label>
            <input
              id="department"
              type="text"
              className="w-full bg-zinc-900/60 border border-zinc-700 rounded-2xl px-4 py-3 text-white placeholder-zinc-500 focus:border-zinc-600 outline-none"
              placeholder="Enter department name"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="preparedBy" className="block text-xs text-zinc-500 mb-1.5">
              PREPARED BY
            </label>
            <input
              id="preparedBy"
              type="text"
              className="w-full bg-zinc-900/60 border border-zinc-700 rounded-2xl px-4 py-3 text-white placeholder-zinc-500 focus:border-zinc-600 outline-none"
              placeholder="Your name"
              value={preparedBy}
              onChange={(e) => setPreparedBy(e.target.value)}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="mb-6">
          <p className="text-sm font-medium text-zinc-400 mb-3">ITEMS ({state.items.length})</p>

          <div className="space-y-3">
            {state.items.map((item) => (
              <div
                key={item.productId}
                className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-4 flex gap-4"
              >
                <div className="flex-1">
                  <p className="font-medium text-white leading-tight">
                    {item.description}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 font-mono">
                    {item.itemNumber} • {item.unit}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-zinc-950/60 border border-zinc-700 rounded-2xl px-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 text-zinc-400 hover:text-white transition-colors"
                      title={`Decrease quantity for ${item.description}`}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      className="w-12 bg-transparent text-center text-white font-medium outline-none"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                      title={`Quantity for ${item.description}`}
                      placeholder="Qty"
                    />
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 text-zinc-400 hover:text-white transition-colors"
                      title={`Increase quantity for ${item.description}`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-red-500 hover:text-red-400 p-2 transition-colors"
                    aria-label={`Remove ${item.description}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-950/60 border border-red-800 text-red-300 rounded-2xl p-4 mb-4 text-sm break-words">
            <p className="font-semibold mb-1">Something went wrong:</p>
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Fixed Confirm Button */}
      <div className="fixed bottom-20 left-0 right-0 bg-zinc-950 border-t border-zinc-800 px-5 py-4 z-40">
        <button
          onClick={handleConfirm}
          disabled={!department.trim() || !preparedBy.trim() || isSaving}
          className="w-full bg-white text-black font-semibold py-4 rounded-3xl disabled:bg-zinc-800 disabled:text-zinc-500 active:scale-[0.985] transition-all text-lg"
        >
          {isSaving ? 'Working...' : 'Confirm & Generate PDF'}
        </button>
      </div>

>>>>>>> cc155ab (app done)
    </div>
  );
}