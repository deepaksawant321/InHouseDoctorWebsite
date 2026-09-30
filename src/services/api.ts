/**
 * Centralized API service layer — all backend calls in one place.
 * Backend base: http://https://api.doctordoorstep.com/api (configured in apiClient.ts)
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
  getDoctors: (params?: { status?: string }) =>
    apiClient.get('/admin/doctors', { params }),

  toggleDoctorStatus: (id: string) =>
    apiClient.patch(`/admin/doctors/${id}/toggle-status`),

  // Bookings
  getBookings: (params?: { status?: string; startDate?: string; endDate?: string; page?: number; pageSize?: number }) =>
    apiClient.get('/admin/bookings', { params }),

  getDoctorById: (id: string) =>
    apiClient.get(`/admin/doctors/${id}`),

  getBookingById: (id: string) =>
    apiClient.get(`/admin/bookings/${id}`),

  updateBookingStatus: (id: string, status: string, remarks?: string) =>
    apiClient.patch(`/admin/bookings/${id}/status`, { status, remarks }),

  // Payments
  getPayments: (params?: { status?: string; startDate?: string; endDate?: string; page?: number; pageSize?: number }) =>
    apiClient.get('/admin/payments', { params }),

  verifyPayment: (id: string, status: 'Success' | 'Rejected', remarks?: string) =>
    apiClient.patch(`/admin/payments/${id}/verify`, { status, remarks }),

  // Settings
  getSettings: () =>
    apiClient.get('/admin/settings'),

  updateSettings: (data: any) =>
    apiClient.put('/admin/settings', data),

  uploadQrCode: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return apiClient.post('/admin/settings/upload-qr', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// ─── Services ────────────────────────────────────────────────────────────────

export const servicesApi = {
  findAllActive: () =>
    apiClient.get('/services'),

  findAll: () =>
    apiClient.get('/services/all'),

  create: (data: { serviceName: string; description?: string; basePrice: number; isActive?: boolean; slug?: string; longDescription?: string; imageUrl?: string }) =>
    apiClient.post('/services', data),

  update: (id: number, data: Partial<{ serviceName: string; description: string; basePrice: number; isActive: boolean; slug: string; longDescription: string; imageUrl: string }>) =>
    apiClient.patch(`/services/${id}`, data),

  toggleStatus: (id: number) =>
    apiClient.patch(`/services/${id}/toggle-status`),

  findBySlug: (slug: string) =>
    apiClient.get(`/services/slug/${slug}`),
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

  update: (id: string, data: any) =>
    apiClient.patch(`/doctors/${id}`, data),
};

// ─── Doctor Availability ──────────────────────────────────────────────────────

export const doctorAvailabilityApi = {
  create: (data: { doctorId: string; dayOfWeek: number; startTime: string; endTime: string; isAvailable?: boolean }) =>
    apiClient.post('/doctor-availability', data),

  getAllByDoctor: (doctorId: string) =>
    apiClient.get(`/doctor-availability/doctor/${doctorId}`),

  delete: (id: string) =>
    apiClient.delete(`/doctor-availability/${id}`),
};

// ─── Settings ─────────────────────────────────────────────────────────────────

export const settingsApi = {
  get: () =>
    apiClient.get('/settings'),
};

// ─── Contact ──────────────────────────────────────────────────────────────────

export const contactApi = {
  send: (data: { name: string; mobile?: string; email?: string; message: string }) =>
    apiClient.post('/contact', data),
};

// ─── Bookings ─────────────────────────────────────────────────────────────────

export const bookingsApi = {
  create: (data: { patientId: string; doctorId?: string; scheduledDate: string; preferredTime?: string; symptoms?: string; serviceId?: number; addressId?: string }) =>
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

  uploadPaymentProof: (bookingId: string, amount: number, transactionId: string, file: File) => {
    const form = new FormData();
    form.append('file', file);
    form.append('bookingId', bookingId);
    form.append('amount', String(amount));
    form.append('transactionId', transactionId);
    return apiClient.post('/payments/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// ─── Assignments ──────────────────────────────────────────────────────────────

export const assignmentsApi = {
  assign: (bookingId: string, doctorId: string) =>
    apiClient.post('/admin/assignments', { bookingId, doctorId }),

  getAll: () =>
    apiClient.get('/admin/assignments'),

  revoke: (id: string) =>
    apiClient.patch(`/admin/assignments/${id}/revoke`),
};

// ─── Notifications ────────────────────────────────────────────────────────────

export const notificationsApi = {
  getAll: () =>
    apiClient.get('/notifications'),

  // Admin: every notification across all users
  getAllAdmin: () =>
    apiClient.get('/notifications/all'),

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
    apiClient.get('/medical-records'),

  getById: (id: string) =>
    apiClient.get(`/medical-records/${id}`),

  upload: (data: FormData) =>
    apiClient.post('/medical-records/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  delete: (id: string) =>
    apiClient.delete(`/medical-records/${id}`),
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

// ─── CMS ──────────────────────────────────────────────────────────────────────

export const cmsApi = {
  // FAQs
  getFaqs: () => apiClient.get('/cms/faqs'),
  getAllFaqs: () => apiClient.get('/cms/faqs/all'),
  createFaq: (data: { question: string; answer: string }) => apiClient.post('/cms/faqs', data),
  updateFaq: (id: number, data: { question: string; answer: string; isActive?: boolean }) => apiClient.put(`/cms/faqs/${id}`, data),
  deleteFaq: (id: number) => apiClient.delete(`/cms/faqs/${id}`),

  // Testimonials
  getTestimonials: () => apiClient.get('/cms/testimonials'),
  getAllTestimonials: () => apiClient.get('/cms/testimonials/all'),
  createTestimonial: (data: { name: string; role: string; quote: string; rating?: number }) => apiClient.post('/cms/testimonials', data),
  updateTestimonial: (id: number, data: { name: string; role: string; quote: string; rating?: number; isActive?: boolean }) => apiClient.put(`/cms/testimonials/${id}`, data),
  deleteTestimonial: (id: number) => apiClient.delete(`/cms/testimonials/${id}`),
};

export const cmsBlocksApi = {
  getAll: () => apiClient.get('/cms/blocks/all'),
  create: (data: any) => apiClient.post('/cms/blocks', data),
  update: (id: number, data: any) => apiClient.put(`/cms/blocks/${id}`, data),
  delete: (id: number) => apiClient.delete(`/cms/blocks/${id}`),
};

export const staticPagesApi = {
  getAll: () => apiClient.get('/cms/pages/all'),
  create: (data: any) => apiClient.post('/cms/pages', data),
  update: (id: number, data: any) => apiClient.put(`/cms/pages/${id}`, data),
  delete: (id: number) => apiClient.delete(`/cms/pages/${id}`),
};
