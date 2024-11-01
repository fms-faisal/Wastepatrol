import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';

// Metadata for the page
export const metadata = { title: `Contributor | Dashboard | ${config.site.name}` } satisfies Metadata;

// Officially hired contributors
const hiredContributors = [
  {
    id: 'HID-001',
    name: 'Gulshan',
    wp_id: 'WPO-425', // Added wp_id
    avatar: '/assets/avatar-6.png',
    email: '',
    phone: '',
    address: { city: 'Gulshan, Dhaka', country: 'Bangladesh' },
    wasteVolumeReported: '1560 kg',
    signedUp: '2024-11-01',
  },
  {
    id: 'HID-002',
    name: 'Banani',
    wp_id: 'WPO-980', // Added wp_id
    avatar: '/assets/avatar-10.png',
    email: '',
    phone: '',
    address: { city: 'Banani, Dhaka', country: 'Bangladesh' },
    wasteVolumeReported: '1230 kg',
    signedUp: '2024-11-01',
  },
  {
    id: 'HID-003',
    name: 'Bashundhara',
    wp_id: 'WPO-105', // Added wp_id
    avatar: '/assets/avatar-8.png',
    email: '',
    phone: '',
    address: { city: 'Bashundhara, Dhaka', country: 'Bangladesh' },
    wasteVolumeReported: '980 kg',
    signedUp: '2024-11-01',
  },
  {
    id: 'HID-004',
    name: 'Baridhara',
    wp_id: 'WPO-785', // Added wp_id
    avatar: '/assets/avatar-9.png',
    email: '',
    phone: '',
    address: { city: 'Baridhara, Dhaka', country: 'Bangladesh' },
    wasteVolumeReported: '857 kg',
    signedUp: '2024-11-01',
  },
  {
    id: 'HID-005',
    name: 'Mirpur-10',
    wp_id: 'WPO-512', // Added wp_id
    avatar: '/assets/avatar-7.png',
    email: '',
    phone: '',
    address: { city: 'Mirpur, Dhaka', country: 'Bangladesh' },
    wasteVolumeReported: '752 kg',
    signedUp: '2024-11-01',
  },
] satisfies Customer[];

// Individual contributors
const individualContributors = [
  {
    id: 'USR-001',
    name: 'Rahim Uddin',
    wp_id: 'WP-902', // Added wp_id
    avatar: '/assets/avatar-1.png',
    email: 'rahim.ud@gmail.com',
    phone: '',
    address: { city: 'Dhanmondi, Dhaka', country: 'Bangladesh' },
    wasteVolumeReported: '355 kg',
    signedUp: '2024-10-30',
  },
  {
    id: 'USR-002',
    name: 'Fatema Nasrin',
    wp_id: 'WP-667', // Added wp_id
    avatar: '/assets/avatar-5.png',
    email: 'fatema.nasrin@gmail.com',
    phone: '',
    address: { city: 'Mohammadpur, Dhaka', country: 'Bangladesh' },
    wasteVolumeReported: '324 kg',
    signedUp: '2024-10-28',
  },
  {
    id: 'USR-003',
    name: 'Rafiq Hossain',
    wp_id: 'WP-334', // Added wp_id
    avatar: '/assets/avatar-3.png',
    email: 'rafiq.hossain@gmail.com',
    phone: '',
    address: { city: 'Uttara, Dhaka', country: 'Bangladesh' },
    wasteVolumeReported: '288 kg',
    signedUp: '2024-10-25',
  },
  {
    id: 'USR-004',
    name: 'Naila Islam',
    wp_id: 'WP-888', // Added wp_id
    avatar: '/assets/avatar-4.png',
    email: 'naila.islam@gmail.com',
    phone: '',
    address: { city: 'Gulshan, Dhaka', country: 'Bangladesh' },
    wasteVolumeReported: '240 kg',
    signedUp: '2024-10-30',
  },
  {
    id: 'USR-005',
    name: 'Kamal Ahmed',
    wp_id: 'WP-777', // Added wp_id
    avatar: '/assets/avatar-2.png',
    email: 'kamal.ahmed@gmail.com',
    phone: '',
    address: { city: 'Badda, Dhaka', country: 'Bangladesh' },
    wasteVolumeReported: '235 kg',
    signedUp: '2024-10-31',
  },
] satisfies Customer[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedHired = applyPagination(hiredContributors, page, rowsPerPage);
  const paginatedIndividuals = applyPagination(individualContributors, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Contributors</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <CustomersFilters />

      <Typography variant="h5" sx={{ pt: '40px', pb: '5px', textAlign: 'center' }}>
        Officially Hired Contributors
      </Typography>

      <CustomersTable count={paginatedHired.length} page={page} rows={paginatedHired} rowsPerPage={rowsPerPage} />

      <Typography variant="h5" sx={{ pt: '40px', pb: '5px', textAlign: 'center' }}>
        Community Contributors
      </Typography>
      <CustomersTable
        count={paginatedIndividuals.length}
        page={page}
        rows={paginatedIndividuals}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
