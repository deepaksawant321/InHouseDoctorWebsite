'use client';

import { Box, Typography, Button, Grid, Card, CardContent, Chip, IconButton, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { addressesApi } from '@/services/api';
import EmptyState from '@/components/EmptyState';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function AddressBook() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = () => {
    setLoading(true);
    addressesApi.getAll().then(res => {
      const data = res.data.data || res.data || [];
      const mapped = data.map((a: any) => ({
        id: a.id,
        title: a.title || 'Address',
        line1: [a.addressLine1, a.addressLine2].filter(Boolean).join(', '),
        area: a.area || '',
        city: a.city || '',
        pincode: a.pincode || '',
        isDefault: a.isDefault || false,
      }));
      setAddresses(mapped);
    }).catch(console.error).finally(() => setLoading(false));
  };

  const handleSetDefault = async (id: string) => {
    try {
      await addressesApi.setDefault(id);
      fetchAddresses();
    } catch (err) {
      console.error('Failed to set default', err);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Address Book
        </Typography>
        <Button
          component={Link}
          href="/dashboard/addresses/add"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2, px: 3, py: 1, textTransform: 'none', fontWeight: 600 }}
        >
          Add Address
        </Button>
      </Box>

      <Grid container spacing={3}>
        {addresses.length === 0 ? (
          <EmptyState 
            title="No Addresses Found" 
            description="You haven't added any addresses to your address book yet." 
            actionText="Add Address"
            actionHref="/dashboard/addresses/add"
            icon={<LocationOnIcon />}
          />
        ) : (
          addresses.map((addr) => (
            <Grid size={{ xs: 12, md: 6 }} key={addr.id}>
              <Card elevation={0} sx={{ borderRadius: '16px', border: '1px solid', borderColor: addr.isDefault ? 'primary.main' : 'divider', position: 'relative' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {addr.title}
                    </Typography>
                    {addr.isDefault && (
                      <Chip label="Default" size="small" color="primary" sx={{ fontWeight: 600 }} />
                    )}
                  </Box>
                  <Typography variant="body1" sx={{ mb: 0.5 }}>
                    {addr.line1}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {addr.area}, {addr.city} - {addr.pincode}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                    {!addr.isDefault && (
                      <Button variant="text" size="small" onClick={() => handleSetDefault(addr.id)} sx={{ borderRadius: 2, textTransform: 'none', mr: 'auto' }}>
                        Set as Default
                      </Button>
                    )}
                    <IconButton size="small" color="primary" sx={{ ml: addr.isDefault ? 'auto' : 0 }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
