'use client';

import { Box, Typography, alpha } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useState } from 'react';

export const UploadZone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

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
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
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
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.disabled' }}>
              Supported formats: PDF, PNG, JPG (Max 5MB)
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
