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

  getProfile: () =>
    apiClient.get('/auth/profile'),

  updateProfile: (data: any) =>
    apiClient.put('/auth/profile', data),
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

  getDashboardTrends: () =>
    apiClient.get('/admin/dashboard/trends'),

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

// ─── Services ────────────────────────────────────────────────────────────────

export const servicesApi = {
  findAllActive: () =>
    apiClient.get('/services'),

  findAll: () =>
    apiClient.get('/services/all'),

  create: (data: { serviceName: string; description?: string; basePrice: number; isActive?: boolean }) =>
    apiClient.post('/services', data),

  toggleStatus: (id: number) =>
    apiClient.patch(`/services/${id}/toggle-status`),
};

// ─── Users ───────────────────────────────────────────────────────────────────

export const usersApi = {
  addAddress: (data: { addressLine1: string; addressLine2?: string; area?: string; city: string; state: string; pincode: string; landmark?: string }) =>
    apiClient.post('/users/address', data),

  getAddresses: () =>
    apiClient.get('/users/address'),
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
  create: (data: { patientId: string; doctorId?: string; scheduledDate: string; symptoms?: string; serviceId?: number; addressId?: string }) =>
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

// ─── Patients ─────────────────────────────────────────────────────────────────

export const patientsApi = {
  getAll: () =>
    apiClient.get('/patients'),

  getById: (id: string) =>
    apiClient.get(`/patients/${id}`),

  create: (data: any) =>
    apiClient.post('/patients', data),

  update: (id: string, data: any) =>
    apiClient.put(`/patients/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`/patients/${id}`),
};

// ─── Records ──────────────────────────────────────────────────────────────────

export const recordsApi = {
  getAll: () =>
    apiClient.get('/records'),

  getById: (id: string) =>
    apiClient.get(`/records/${id}`),

  upload: (data: FormData) =>
    apiClient.post('/records/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  delete: (id: string) =>
    apiClient.delete(`/records/${id}`),
};

// ─── Addresses ────────────────────────────────────────────────────────────────

export const addressesApi = {
  getAll: () =>
    apiClient.get('/addresses'),

  getById: (id: string) =>
    apiClient.get(`/addresses/${id}`),

  create: (data: any) =>
    apiClient.post('/addresses', data),

  update: (id: string, data: any) =>
    apiClient.put(`/addresses/${id}`, data),

  delete: (id: string) =>
    apiClient.delete(`/addresses/${id}`),

  setDefault: (id: string) =>
    apiClient.patch(`/addresses/${id}/default`),
};
