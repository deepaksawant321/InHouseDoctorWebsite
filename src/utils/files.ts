import { apiClient } from '@/services/apiClient';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.doctordoorstep.com/api';

/** Resolve a stored public asset path (e.g. the UPI QR image) against the API origin. */
export const publicAssetUrl = (path: string): string => {
  try {
    return new URL(path, API_BASE).toString();
  } catch {
    return path;
  }
};

const PRIVATE_FILE = /uploads\/(payments|MedicalRecords|prescriptions)\/([^/\\?#]+)$/;

/**
 * Prescriptions, payment proofs and medical records are private: they are only served by the API to their
 * owner (or an admin) and need the Authorization header, so a plain <a href> cannot open them.
 * This fetches the file with the session token and opens it in a new tab.
 */
export async function openPrivateFile(fileRef: string): Promise<void> {
  const match = PRIVATE_FILE.exec((fileRef || '').replace(/\\/g, '/'));
  if (!match) {
    alert('This file is not available.');
    return;
  }
  // Open the tab synchronously (inside the click handler) so popup blockers allow it
  const tab = window.open('', '_blank');
  try {
    const res = await apiClient.get(`/files/${match[1]}/${encodeURIComponent(match[2])}`, { responseType: 'blob' });
    const url = URL.createObjectURL(res.data as Blob);
    if (tab) {
      tab.location.href = url;
    } else {
      window.location.href = url;
    }
    setTimeout(() => URL.revokeObjectURL(url), 5 * 60 * 1000);
  } catch {
    tab?.close();
    alert('Could not open this file. You may not have access to it, or it no longer exists.');
  }
}
