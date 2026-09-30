'use client';

import { Box, Typography, alpha } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useState } from 'react';

interface UploadZoneProps {
  onFileChange?: (file: File | null) => void;
}

const ALLOWED_EXTENSIONS = ['.pdf', '.png', '.jpg', '.jpeg'];
const MAX_BYTES = 5 * 1024 * 1024;

function validateFile(file: File): string | null {
  const name = file.name.toLowerCase();
  if (!ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext))) return 'Only PDF, PNG or JPG files are allowed.';
  if (file.size > MAX_BYTES) return 'File is too large. Maximum size is 5MB.';
  return null;
}

export const UploadZone = ({ onFileChange }: UploadZoneProps = {}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const accept = (newFile: File) => {
    const problem = validateFile(newFile);
    setError(problem);
    if (problem) return;
    setFile(newFile);
    onFileChange?.(newFile);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      accept(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      accept(e.target.files[0]);
      e.target.value = '';
    }
  };

  return (
    <Box
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      sx={{
        border: '2px dashed',
        borderColor: isDragging ? 'primary.main' : 'divider',
        borderRadius: '24px', p: 4, textAlign: 'center',
        bgcolor: isDragging ? alpha('#4F46E5', 0.04) : 'background.paper',
        transition: 'all 0.2s', cursor: 'pointer',
        position: 'relative',
        '&:hover': { bgcolor: alpha('#4F46E5', 0.02), borderColor: 'primary.main' },
      }}
    >
      <input
        type="file"
        aria-label="Upload a file (PDF, PNG or JPG, max 5MB)"
        onChange={handleChange}
        accept=".pdf,.png,.jpg,.jpeg"
        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
      />
      
      {file ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: alpha('#25D366', 0.1), color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <InsertDriveFileIcon fontSize="large" />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{file.name}</Typography>
            <Typography variant="body2" color="text.secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</Typography>
          </Box>
          <Typography variant="body2" color="primary" sx={{ mt: 1, textDecoration: 'underline' }}>
            Click to replace file
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: alpha('#4F46E5', 0.1), color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CloudUploadIcon fontSize="large" />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
              Click or drag file to this area to upload
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Upload a single PDF, PNG or JPG file.
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.disabled' }}>
              Supported formats: PDF, PNG, JPG (Max 5MB)
            </Typography>
          </Box>
        </Box>
      )}
      {error && (
        <Typography role="alert" variant="body2" color="error" sx={{ mt: 2, position: 'relative' }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};
