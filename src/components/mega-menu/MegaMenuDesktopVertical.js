'use client';
import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import RouterLink from 'src/utils/link';
import { FaAngleRight } from 'react-icons/fa6';

// material
import { alpha } from '@mui/material/styles';
import { Box, List, Card, ListItem, Typography, Stack, Button, Skeleton } from '@mui/material';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setBrands } from 'src/lib/redux/slices/brands';
import * as api from 'src/services';
import { useQuery } from 'react-query';
// ----------------------------------------------------------------------

const ITEM_HEIGHT = 40;
// ----------------------------------------------------------------------

function ParentItem({ brand, isLast, isLoading }) {
  const activeStyle = {
    color: 'primary.main',
    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity)
  };

  return (
    <ListItem
      href={`/products/${brand?.slug}`}
      component={RouterLink}
      sx={{
        padding: (theme) => theme.spacing(3.5, 2),
        height: ITEM_HEIGHT,
        cursor: 'pointer',
        color: 'text.primary',
        typography: 'subtitle2',
        textTransform: 'capitalize',
        justifyContent: 'space-between',
        transition: (theme) => theme.transitions.create('all'),
        borderBottom: (theme) => `1px solid ${isLast ? 'transparent' : theme.palette.divider}`,
        '&:hover': activeStyle
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          component="span"
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            position: 'relative',
            overflow: 'hidden',
            border: (theme) => `solid 1px ${theme.palette.divider}`
          }}
        >
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Image src={brand?.logo?.url} alt={brand?.name} layout="fill" objectFit="cover" />
          )}
        </Box>
        <Typography variant="body1" color="text.primary" fontWeight={500}>
          {isLoading ? <Skeleton variant="text" width={120} /> : brand?.name}
        </Typography>
      </Stack>
    </ListItem>
  );
}

MegaMenuItem.propTypes = {
  brand: PropTypes.object,
  isLast: PropTypes.bool
};

function MegaMenuItem({ brand, isLast, isLoading }) {
  return <ParentItem brand={brand} isLoading={isLoading} isLast={isLast} />;
}

export default function MegaMenuDesktopVertical({ ...other }) {
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery(['get-brands-products'], () => api.getHomeBrands());
  React.useEffect(() => {
    if (!isLoading) {
      dispatch(setBrands(data?.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <List
      component={Card}
      disablePadding
      {...other}
      sx={{
        minWidth: 280,
        bgcolor: 'background.paper',
        borderRadius: '12px',
        height: 343,
        overflowY: 'auto',
        overflowX: 'auto',
        border: (theme) => `1px solid ${theme.palette.divider}`,
        display: { md: 'flex', xs: 'none' },
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        {(isLoading ? Array.from(new Array(5)) : data?.data.slice(0, 5)).map((brand, i) => (
          <MegaMenuItem key={Math.random()} isLoading={isLoading} brand={brand} isLast={i === 4} />
        ))}
      </div>
      <Button
        variant="outlined"
        fullWidth
        endIcon={<FaAngleRight size={14} />}
        sx={{
          bgcolor: (theme) => alpha(theme.palette.primary.dark, 0.2) + '!important',
          color: (theme) => theme.palette.primary.dark,
          border: 'none !important',
          borderRadius: 'unset',
          paddingY: (theme) => theme.spacing(3.5)
        }}
      >
        View All
      </Button>
    </List>
  );
}
