<<<<<<< HEAD
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Save, 
  Download, 
  Trash2, 
  RotateCcw 
} from 'lucide-react';

// Import your Dexie database instance
// Adjust this import path to match your directory structure (e.g., '../db/db' or '@/db')
import { db } from '../db/db';

// --- BUSINESS LOGIC HOOK ---
const useDataManagement = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const exportHistory = async () => {
    if (isExporting) return;
    setIsExporting(true);
    
    try {
      // Retrieve all requests sorted by ID / date
      const allRequests = await db.requests.toArray();
      
      if (allRequests.length === 0) {
        alert('No request history found to export, Sir.');
        return;
      }

      console.log('Exporting data:', allRequests);
      
      // 1. Construct the CSV Payload
      const headers = ['ID', 'Date', 'Department', 'Type', 'Status'];
      const rows = allRequests.map(r => [r.id, r.date, r.department, r.type, r.status]);
      const csvString = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      
      // 2. Generate a stable Blob and File object for mobile handling
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const fileName = `stock_requests_backup_${new Date().toISOString().split('T')[0]}.csv`;
      const file = new File([blob], fileName, { type: 'text/csv' });

      // 3. Attempt Native Mobile Web Share API first
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Stock Requests Backup',
          text: 'Attached is the latest export of our stock request history.',
          files: [file],
        });
      } else {
        // 4. Fallback: Blob Object URL (Stable for Android WebViews)
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        
        // Append to body, trigger click, and cleanly remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Free up system memory instantly
        window.URL.revokeObjectURL(url);
      }

    } catch (error: unknown) {
      console.error('Failed to export history:', error);
      
      // Ignore AbortError if the user simply closed the Android share sheet without sharing
      if (error instanceof Error && error.name !== 'AbortError') {
        alert('An error occurred while exporting historical data.');
      }
    } finally {
      setIsExporting(false);
    }
  };

  const clearHistory = async () => {
    if (isClearing) return;
    setIsClearing(true);
    try {
      await db.transaction('rw', db.requests, async () => {
        await db.requests.clear();
      });

      localStorage.removeItem('currentDraftRequest');
      
      alert('History cleared successfully.');
      window.location.reload(); 
    } catch (error: unknown) {
      console.error('Failed to clear history:', error);
      alert('Failed to clear history due to a database error.');
    } finally {
      setIsClearing(false);
    }
  };

  const resetApp = async () => {
    if (isResetting) return;
    setIsResetting(true);
    try {
      await db.transaction('rw', [db.requests, db.products], async () => {
        await db.requests.clear();
        await db.products.clear();
      });

      localStorage.clear();

      alert('Application reset successfully.');
      window.location.reload();
    } catch (error: unknown) {
      console.error('Failed to reset application:', error);
      alert('An error occurred during database structural reset.');
    } finally {
      setIsResetting(false);
    }
  };

  return {
    exportHistory,
    clearHistory,
    resetApp,
    isProcessing: isExporting || isClearing || isResetting,
  };
};
// --- CONFIRMATION MODAL ---
const ConfirmationModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isProcessing
}: {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing?: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-3xl bg-zinc-900 border border-zinc-800 p-6 text-zinc-100 shadow-2xl">
        <h3 className="mb-4 text-xl font-bold">{title}</h3>
        <div className="mb-8 space-y-2 text-sm text-zinc-400">
          {message}
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            disabled={isProcessing}
            className="rounded-2xl px-5 py-3 font-medium text-zinc-300 transition-colors hover:bg-zinc-800 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isProcessing}
            className="rounded-2xl bg-red-600 px-5 py-3 font-medium text-white transition-colors hover:bg-red-700 active:scale-95 disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function Settings() {
  const navigate = useNavigate();
  
>>>>>>> cc155ab (app done)
  const [preparedBy, setPreparedBy] = useState(
    () => localStorage.getItem('preparedBy') || ''
  );
  const [saved, setSaved] = useState(false);

<<<<<<< HEAD
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
=======
  const { exportHistory, clearHistory, resetApp, isProcessing } = useDataManagement();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'clear' | 'reset' | null;
  }>({ isOpen: false, type: null });

  function handleSave() {
    localStorage.setItem('preparedBy', preparedBy.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  const handleConfirmDataAction = async () => {
    if (modalState.type === 'clear') {
      await clearHistory();
    } else if (modalState.type === 'reset') {
      await resetApp();
      setPreparedBy(''); 
    }
    setModalState({ isOpen: false, type: null });
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-zinc-950 px-5 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-xl font-bold text-white">Settings</h1>
          <div className="w-8" />
        </div>
      </div>

      <div className="flex-1 px-5 pt-8">
        <div className="max-w-md mx-auto">
          
          {/* Profile Section */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center">
                <User size={28} className="text-zinc-400" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">Your Information</p>
                <p className="text-sm text-zinc-500">Used in PDF documents</p>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="preparedBy" className="block text-xs tracking-widest text-zinc-500 mb-2">
                YOUR NAME (PREPARED BY)
              </label>
              <input
                id="preparedBy"
                type="text"
                className="w-full bg-zinc-950 border border-zinc-700 focus:border-white/30 rounded-2xl px-5 py-4 text-white placeholder-zinc-500 text-base"
                placeholder="e.g. Tandeka Mthembu"
                value={preparedBy}
                onChange={(e) => setPreparedBy(e.target.value)}
              />
              <p className="text-xs text-zinc-500 mt-4 leading-relaxed">
                This name will be automatically used as the "Prepared by" field in every stock request PDF.
              </p>
            </div>

            <button
              onClick={handleSave}
              disabled={!preparedBy.trim()}
              className="w-full bg-white text-black font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
            >
              <Save size={20} />
              {saved ? 'Saved Successfully ✓' : 'Save Settings'}
            </button>
          </div>

          {/* Data Management Section */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 mb-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">Data Management</h2>
              <p className="text-sm text-zinc-500">Manage your local application data</p>
            </div>
            
            <div className="space-y-3">
              {/* Export History */}
              <div className="flex items-center justify-between rounded-2xl border border-zinc-800/50 bg-zinc-800/30 p-4 transition-colors hover:bg-zinc-800/50">
                <div>
                  <h4 className="font-medium text-zinc-200">Export History</h4>
                  <p className="text-xs text-zinc-500 mt-1">Download all completed requests</p>
                </div>
                <button
                  onClick={exportHistory}
                  disabled={isProcessing}
                  className="flex items-center justify-center h-10 w-10 rounded-xl bg-zinc-700 text-zinc-200 transition-colors hover:bg-zinc-600 disabled:opacity-50 active:scale-95"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>

              {/* Clear History */}
              <div className="flex items-center justify-between rounded-2xl border border-zinc-800/50 bg-zinc-800/30 p-4 transition-colors hover:bg-zinc-800/50">
                <div>
                  <h4 className="font-medium text-zinc-200">Clear History</h4>
                  <p className="text-xs text-zinc-500 mt-1">Delete saved request history</p>
                </div>
                <button
                  onClick={() => setModalState({ isOpen: true, type: 'clear' })}
                  disabled={isProcessing}
                  className="flex items-center justify-center h-10 w-10 rounded-xl border border-red-900/50 bg-red-950/30 text-red-400 transition-colors hover:bg-red-900/50 active:scale-95 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Reset App */}
              <div className="flex items-center justify-between rounded-2xl border border-red-900/20 bg-red-950/10 p-4 transition-colors hover:bg-red-950/20">
                <div>
                  <h4 className="font-medium text-red-400">Reset Application</h4>
                  <p className="text-xs text-zinc-500 mt-1">Restore to a clean state</p>
                </div>
                <button
                  onClick={() => setModalState({ isOpen: true, type: 'reset' })}
                  disabled={isProcessing}
                  className="flex items-center justify-center h-10 px-4 rounded-xl bg-red-600 text-white transition-colors hover:bg-red-700 active:scale-95 disabled:opacity-50"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Extra Info */}
          <div className="mt-10 text-center">
            <p className="text-xs text-zinc-600">
              Version 1.0 • © 2026 tomyx_Tech • Proprietary stock request management platform
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        isProcessing={isProcessing}
        title={modalState.type === 'clear' ? 'Clear History?' : 'Reset Application?'}
        onCancel={() => setModalState({ isOpen: false, type: null })}
        onConfirm={handleConfirmDataAction}
        message={
          modalState.type === 'clear' ? (
            <>
              <p>This will permanently delete all saved stock request history.</p>
              <p className="mt-2">Products, settings, and any current draft request will not be affected.</p>
              <p className="mt-4 text-red-400 font-medium">This action cannot be undone.</p>
            </>
          ) : (
            <>
              <p>This will permanently remove:</p>
              <ul className="ml-5 mt-2 list-disc space-y-1">
                <li>All request history</li>
                <li>All products</li>
                <li>Current draft request</li>
                <li>App preferences and settings</li>
              </ul>
              <p className="mt-4 text-red-400 font-medium">This action cannot be undone.</p>
            </>
          )
        }
      />
>>>>>>> cc155ab (app done)
    </div>
  );
}