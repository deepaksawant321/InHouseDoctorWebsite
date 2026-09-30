import { ImageResponse } from 'next/og';

export const alt = 'Doctor Doorstep — trusted doctors at your home in Mumbai';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: 'linear-gradient(135deg, #4F46E5 0%, #0D9488 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 600, opacity: 0.9, marginBottom: 24 }}>Doctor Doorstep</div>
        <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.1 }}>Doctor at Home in Mumbai</div>
        <div style={{ fontSize: 36, marginTop: 28, opacity: 0.92 }}>
          Verified doctors · Home visits · 24×7 support
        </div>
      </div>
    ),
    { ...size },
  );
}
