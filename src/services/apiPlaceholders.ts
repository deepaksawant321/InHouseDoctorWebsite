/**
 * API Placeholders for future backend integration (Phase 5+)
 * These simulate MS SQL Server / NestJS backend calls.
 */

export async function fetchBookings() {
  console.log('Fetching bookings from backend...');
  return Promise.resolve([]);
}

export async function fetchDoctors() {
  console.log('Fetching doctors from backend...');
  return Promise.resolve([]);
}

export async function assignDoctorToBooking(bookingId: string, doctorId: string) {
  console.log(`Assigning Doctor ${doctorId} to Booking ${bookingId}`);
  return Promise.resolve({ success: true });
}

export async function verifyPayment(paymentId: string) {
  console.log(`Verifying payment ${paymentId}`);
  return Promise.resolve({ success: true });
}

export async function resendNotification(bookingId: string, channel: 'SMS' | 'WhatsApp' | 'Email') {
  console.log(`Resending ${channel} for Booking ${bookingId}`);
  return Promise.resolve({ success: true });
}
