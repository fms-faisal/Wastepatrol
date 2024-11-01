import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArrowDown as ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { ArrowUp as ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';

// Define props for TotalProfit component
export interface TotalProfitProps {
  sx?: SxProps;
  value: string;
  trend: 'up' | 'down';
  diff?: number; // Make diff optional
}

// TotalProfit component
export function TotalProfit({ value, sx, trend, diff }: TotalProfitProps): React.JSX.Element {
  // Determine the icon based on the trend
  const TrendIcon = trend === 'up' ? ArrowUpIcon : ArrowUpIcon;
  const trendColor = trend === 'up' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-success-main)';

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Recycled Waste
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
          </Stack>
          {diff === undefined ? (
            <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
              <TrendIcon color={trendColor} fontSize="var(--icon-fontSize-md)" />
              <Typography color={trendColor} variant="body2">
                15%
              </Typography>
              <Typography color="text.secondary" variant="caption">
                Since last month
              </Typography>
            </Stack>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}
