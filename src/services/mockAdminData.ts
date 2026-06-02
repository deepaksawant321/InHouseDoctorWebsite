export const mockBookings = [
  {
    id: 'BKG-001',
    patientName: 'Rahul Sharma',
    mobile: '9876543210',
    service: 'General Physician',
    area: 'Andheri West',
    bookingDate: '2026-06-02',
    visitTime: 'Morning (9AM-12PM)',
    paymentStatus: 'Verified',
    doctorStatus: 'Assigned',
    bookingStatus: 'Confirmed',
    amount: 999,
  },
  {
    id: 'BKG-002',
    patientName: 'Priya Patel',
    mobile: '9876543211',
    service: 'Nursing Care',
    area: 'Bandra East',
    bookingDate: '2026-06-03',
    visitTime: 'Afternoon (12PM-4PM)',
    paymentStatus: 'Pending',
    doctorStatus: 'Unassigned',
    bookingStatus: 'Pending',
    amount: 1499,
  },
  {
    id: 'BKG-003',
    patientName: 'Amit Desai',
    mobile: '9876543212',
    service: 'Physiotherapy',
    area: 'Powai',
    bookingDate: '2026-06-03',
    visitTime: 'Evening (4PM-8PM)',
    paymentStatus: 'Verified',
    doctorStatus: 'Assigned',
    bookingStatus: 'Completed',
    amount: 1299,
  },
  {
    id: 'BKG-004',
    patientName: 'Sunita Verma',
    mobile: '9876543213',
    service: 'Elder Care',
    area: 'Malad West',
    bookingDate: '2026-06-04',
    visitTime: 'Morning (9AM-12PM)',
    paymentStatus: 'Pending',
    doctorStatus: 'Unassigned',
    bookingStatus: 'Pending',
    amount: 1999,
  },
  {
    id: 'BKG-005',
    patientName: 'Vikram Singh',
    mobile: '9876543214',
    service: 'General Physician',
    area: 'Juhu',
    bookingDate: '2026-06-05',
    visitTime: 'Evening (4PM-8PM)',
    paymentStatus: 'Verified',
    doctorStatus: 'Unassigned',
    bookingStatus: 'Confirmed',
    amount: 999,
  }
];

export const mockDoctors = [
  {
    id: 'DOC-101',
    name: 'Dr. Suresh Mehta',
    specialization: 'General Physician',
    mobile: '9123456780',
    email: 'suresh.mehta@example.com',
    experience: '12 Years',
    area: 'Andheri, Juhu',
    status: 'Active',
    availability: 'Available',
    rating: 4.8,
    assignmentsToday: 3,
  },
  {
    id: 'DOC-102',
    name: 'Dr. Anjali Gupta',
    specialization: 'Physiotherapist',
    mobile: '9123456781',
    email: 'anjali.g@example.com',
    experience: '8 Years',
    area: 'Bandra, Khar',
    status: 'Active',
    availability: 'In Visit',
    rating: 4.9,
    assignmentsToday: 4,
  },
  {
    id: 'DOC-103',
    name: 'Nurse Ramesh Kumar',
    specialization: 'Nursing Care',
    mobile: '9123456782',
    email: 'ramesh.k@example.com',
    experience: '15 Years',
    area: 'Powai, Ghatkopar',
    status: 'Active',
    availability: 'Available',
    rating: 4.7,
    assignmentsToday: 1,
  },
  {
    id: 'DOC-104',
    name: 'Dr. Meena Iyer',
    specialization: 'Elder Care Specialist',
    mobile: '9123456783',
    email: 'meena.i@example.com',
    experience: '20 Years',
    area: 'Malad, Goregaon',
    status: 'On Leave',
    availability: 'Unavailable',
    rating: 5.0,
    assignmentsToday: 0,
  }
];

export const mockPayments = [
  {
    id: 'PAY-801',
    bookingId: 'BKG-002',
    patient: 'Priya Patel',
    amount: 1499,
    upiRef: '415309871234',
    status: 'Pending Verification',
    date: '2026-06-03 10:15 AM'
  },
  {
    id: 'PAY-802',
    bookingId: 'BKG-004',
    patient: 'Sunita Verma',
    amount: 1999,
    upiRef: '415309879999',
    status: 'Pending Verification',
    date: '2026-06-03 11:30 AM'
  },
  {
    id: 'PAY-803',
    bookingId: 'BKG-001',
    patient: 'Rahul Sharma',
    amount: 999,
    upiRef: '415309871111',
    status: 'Verified',
    date: '2026-06-02 09:00 AM'
  }
];

export const mockNotifications = [
  {
    bookingId: 'BKG-001',
    smsStatus: 'Delivered',
    whatsappStatus: 'Read',
    emailStatus: 'Delivered',
    sentDate: '2026-06-02 09:05 AM',
    deliveryStatus: 'Success'
  },
  {
    bookingId: 'BKG-002',
    smsStatus: 'Pending',
    whatsappStatus: 'Pending',
    emailStatus: 'Pending',
    sentDate: '2026-06-03 10:20 AM',
    deliveryStatus: 'Processing'
  },
  {
    bookingId: 'BKG-003',
    smsStatus: 'Delivered',
    whatsappStatus: 'Delivered',
    emailStatus: 'Bounced',
    sentDate: '2026-06-03 08:00 AM',
    deliveryStatus: 'Partial'
  }
];

export const mockRevenueData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

export const mockBookingsTrend = [
  { name: 'Week 1', bookings: 45 },
  { name: 'Week 2', bookings: 52 },
  { name: 'Week 3', bookings: 38 },
  { name: 'Week 4', bookings: 65 },
];
