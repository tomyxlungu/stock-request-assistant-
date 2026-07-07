import { useParams, useNavigate } from 'react-router-dom';
import { useRequestById, updateRequestStatus } from '../hooks/useRequests';

export default function RequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const requestId = id ? Number(id) : undefined;
  const request = useRequestById(requestId);

  if (request === undefined) {
    return <div className="p-4 text-center text-gray-500">Loading...</div>;
  }

  if (request === null || !request) {
    return (
      <div className="p-4 max-w-md mx-auto text-center text-gray-500">
        <p>Request not found.</p>
        <button onClick={() => navigate('/history')} className="underline mt-2">
          Back to History
        </button>
      </div>
    );
  }

  async function toggleStatus() {
    if (!request?.id) return;
    const nextStatus = request.status === 'Sent' ? 'Fulfilled' : 'Sent';
    await updateRequestStatus(request.id, nextStatus);
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <button onClick={() => navigate('/history')} className="text-sm underline mb-4">
        ← Back to History
      </button>

      <h1 className="text-lg font-bold mb-1">
        REQ-{String(request.id).padStart(4, '0')} · {request.type}
      </h1>
      <p className="text-sm text-gray-500 mb-1">
        {request.date} · {request.department}
      </p>
      <p className="text-sm text-gray-500 mb-4">Prepared by {request.preparedBy}</p>

      <ul className="space-y-2 mb-6">
        {request.items.map((item) => (
          <li key={item.productId} className="border rounded p-3">
            <p className="font-medium">{item.description}</p>
            <p className="text-xs text-gray-500">
              {item.itemNumber} · {item.quantity} {item.unit}
            </p>
          </li>
        ))}
      </ul>

      <button
        onClick={toggleStatus}
        className={`w-full rounded p-3 font-medium ${
          request.status === 'Fulfilled'
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-green-100 text-green-700'
        }`}
      >
        {request.status === 'Sent'
          ? 'Mark as Fulfilled'
          : 'Mark as Sent (undo)'}
      </button>
    </div>
  );
}