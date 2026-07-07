import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentRequest } from '../hooks/useCurrentRequest';
import { saveRequest } from '../hooks/useRequests';
import { generateRequestPdf } from '../lib/generatePdf';
import { sharePdf } from '../lib/sharePdf';

export default function ReviewRequest() {
  const navigate = useNavigate();
  const { state, dispatch } = useCurrentRequest();

  // Department and prepared-by aren't collected earlier in the flow yet,
  // so they're editable right here on the review screen for now.
  const [department, setDepartment] = useState(state.department || '');
  const [preparedBy, setPreparedBy] = useState(
    () => localStorage.getItem('preparedBy') || ''
  );

  const today = new Date().toLocaleDateString();

  function updateQuantity(productId: number, quantity: number) {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  }

  function removeItem(productId: number) {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  }

  async function handleConfirm() {
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
  }

  if (state.items.length === 0) {
    return (
      <div className="p-4 max-w-md mx-auto text-center text-gray-500">
        <p>No items in this request yet.</p>
        <button onClick={() => navigate('/add-items')} className="underline mt-2">
          Go back and add items
        </button>
      </div>
    );
  }

  return (
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
    </div>
  );
}