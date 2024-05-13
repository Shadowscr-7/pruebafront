'use client';
import React from 'react';
// mui
import { CardContent, Typography, Stack, Divider, Skeleton } from '@mui/material';
import { useCurrencyConvert } from 'src/hooks/convertCurrency';
import { useCurrencyFormatter } from 'src/hooks/fCurrency';

//  styling
import RootStyled from './styled';
// redux
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

PaymentSummary.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default function PaymentSummary({ loading }) {
  const { product } = useSelector((state) => state);
  const { total, shipping, subtotal } = product.checkout;
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();
  return (
    <RootStyled>
      <CardContent sx={{ py: 2 }}>
        <Typography variant="h4" mb={1}>
          Payment Summary
        </Typography>
        <Stack spacing={0} mt={1} mb={2}>
          <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Subtotal:
            </Typography>
            <Typography variant="subtitle2">
              {loading ? <Skeleton variant="text" width={80} /> : fCurrency(cCurrency(subtotal))}
            </Typography>
          </Stack>
          <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Shipping:
            </Typography>
            <Typography variant="subtitle2">
              {loading ? (
                <Skeleton variant="text" width={80} />
              ) : !shipping ? (
                'Free'
              ) : (
                fCurrency(cCurrency(parseInt(shipping)))
              )}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2} mt={2}>
          <Typography variant="subtitle1">Total:</Typography>
          <Typography variant="subtitle1">
            {loading ? <Skeleton variant="text" width={80} /> : fCurrency(cCurrency(total))}
          </Typography>
        </Stack>
      </CardContent>
    </RootStyled>
  );
}
