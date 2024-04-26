// mui
import { Badge, CardActionArea, IconButton, Stack, Typography } from '@mui/material';
import { HiOutlineShoppingBag } from 'react-icons/hi2';

// react
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// next
import { useRouter } from 'next-nprogress-bar';

// lodash
import { sum } from 'lodash';
import { fCurrency } from 'src/utils/formatNumber';

export default function CartWidget({ ...props }) {
  const { checkout } = props;
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const totalItems = sum(cart.map((item) => item.quantity));
  const total = sum(cart.map((item) => item.subtotal));

  useEffect(() => {
    setCart(checkout.cart);
  }, [checkout]);

  return (
    <Stack
      onClick={() => router.push('/cart')}
      direction="row"
      gap={0.5}
      alignItems="center"
      sx={{
        bgcolor: (theme) => theme.palette.background.default,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: '8px',
        pr: 1
      }}
      component={CardActionArea}
    >
      <IconButton color="default" name="cart" disableRipple>
        <Badge badgeContent={totalItems} color="primary" showZero>
          <HiOutlineShoppingBag />
        </Badge>
      </IconButton>
      <Typography variant="body1" color="text.primary">
        {fCurrency(total)}
      </Typography>
    </Stack>
  );
}
CartWidget.propTypes = {
  checkout: PropTypes.object.isRequired
};
