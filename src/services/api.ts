/**
 * Centralized API service layer — all backend calls in one place.
 * Backend base: http://localhost:3001/api (configured in apiClient.ts)
 */
import { apiClient } from './apiClient';

// ─── Auth ────────────────────────────────────────────────────────────────────

export const authApi = {
  sendOtp: (phoneNumber: string) =>
    apiClient.post('/auth/send-otp', { phoneNumber }),

  loginWithOtp: (phoneNumber: string, otpCode: string) =>
    apiClient.post('/auth/login-with-otp', { phoneNumber, otpCode }),

  register: (data: { firstName: string; lastName: string; email: string; phoneNumber: string; password: string }) =>
    apiClient.post('/auth/register', data),

  verifyOtp: (phoneNumber: string, otpCode: string) =>
    apiClient.post('/auth/verify-otp', { phoneNumber, otpCode }),
};

// ─── Admin Auth ───────────────────────────────────────────────────────────────

export const adminAuthApi = {
  login: (email: string, password: string) =>
    apiClient.post('/admin/login', { email, password }),
};

// ─── Admin Dashboard ─────────────────────────────────────────────────────────

export const adminApi = {
  getDashboardStats: () =>
    apiClient.get('/admin/dashboard/stats'),

  // Users
  getUsers: () =>
    apiClient.get('/admin/users'),

  // Doctors
  getDoctors: () =>
    apiClient.get('/admin/doctors'),

  toggleDoctorStatus: (id: string) =>
    apiClient.patch(`/admin/doctors/${id}/toggle-status`),

  // Bookings
  getBookings: () =>
    apiClient.get('/admin/bookings'),

  updateBookingStatus: (id: string, status: string, remarks?: string) =>
    apiClient.patch(`/admin/bookings/${id}/status`, { status, remarks }),

  // Payments
  getPayments: () =>
    apiClient.get('/admin/payments'),

  verifyPayment: (id: string, status: 'Success' | 'Rejected', remarks?: string) =>
    apiClient.patch(`/admin/payments/${id}/verify`, { status, remarks }),
};

// ─── Doctors ─────────────────────────────────────────────────────────────────

export const doctorsApi = {
  getAll: (pincode?: string) =>
    apiClient.get('/doctors', { params: pincode ? { pincode } : undefined }),

  getById: (id: string) =>
    apiClient.get(`/doctors/${id}`),

  create: (data: {
    name: string;
    phoneNumber: string;
    email?: string;
    qualification?: string;
    specialization: string;
    experienceYears: number;
    consultationFee: number;
    coverageArea?: string;
  }) => apiClient.post('/doctors', data),

  updateAvailability: (id: string, isAvailable: boolean) =>
    apiClient.patch(`/doctors/${id}/availability`, { isAvailable }),
};

// ─── Bookings ─────────────────────────────────────────────────────────────────

export const bookingsApi = {
  create: (data: { doctorId?: string; scheduledDate: string; symptoms?: string }) =>
    apiClient.post('/bookings', data),

  getMyBookings: () =>
    apiClient.get('/bookings/my-bookings'),

  getAllBookings: () =>
    apiClient.get('/bookings/admin/all'),

  updateStatus: (id: string, status: string, remarks?: string) =>
    apiClient.patch(`/bookings/${id}/status`, { status, remarks }),

  uploadPrescription: (id: string, file: File) => {
    const form = new FormData();
    form.append('file', file);
    return apiClient.post(`/bookings/${id}/prescriptions`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  getPrescriptions: (id: string) =>
    apiClient.get(`/bookings/${id}/prescriptions`),
};

// ─── Payments ─────────────────────────────────────────────────────────────────

export const paymentsApi = {
  initiate: (bookingId: string, amount: number) =>
    apiClient.post('/payments/initiate', { bookingId, amount }),

  getStatus: (transactionId: string) =>
    apiClient.get(`/payments/status/${transactionId}`),
};

// ─── Assignments ──────────────────────────────────────────────────────────────

export const assignmentsApi = {
  assign: (bookingId: string, doctorId: string) =>
    apiClient.post('/assignments', { bookingId, doctorId }),

  getAll: () =>
    apiClient.get('/assignments'),

  getByBooking: (bookingId: string) =>
    apiClient.get(`/assignments/booking/${bookingId}`),

  revoke: (id: string) =>
    apiClient.patch(`/assignments/${id}/revoke`),
};

// ─── Notifications ────────────────────────────────────────────────────────────

export const notificationsApi = {
  getAll: () =>
    apiClient.get('/notifications'),

  getByBooking: (bookingId: string) =>
    apiClient.get(`/notifications/booking/${bookingId}`),
};
