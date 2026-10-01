'use client';

import { Box } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { StepHeader } from '@/features/booking/StepHeader';
import { useRouter } from 'next/navigation';
import { UploadZone } from '@/features/booking/UploadZone';
import { useBooking } from '@/providers/BookingProvider';
import { WizardNav } from '@/features/booking/WizardNav';

export default function PrescriptionPage() {
  const router = useRouter();
  const { setPrescriptionFile } = useBooking();

  return (
    <Box>
      <StepHeader
        icon={<DescriptionIcon />}
        title="Upload Prescription"
        badge="OPTIONAL"
        subtitle="Have a past prescription or report for this visit? Upload it so our doctors can prepare."
      />

      <Box sx={{ mb: 4 }}>
        <UploadZone onFileChange={setPrescriptionFile} />
      </Box>

      <WizardNav
        onBack={() => router.back()}
        onNext={() => router.push('/book/payment')}
        nextLabel="Continue to Payment"
        secondary={{ label: 'Skip for now', onClick: () => router.push('/book/payment') }}
      />
    </Box>
  );
}
