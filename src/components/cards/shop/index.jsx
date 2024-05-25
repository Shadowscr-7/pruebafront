'use client';
import PropTypes from 'prop-types';
// next
import Link from 'src/utils/link';
// mui
import {
  Typography,
  CardActionArea,
  Card,
  Box,
  Skeleton,
  Stack,
  Rating,
  Button,
  IconButton,
  CardContent,
  Divider,
  alpha
} from '@mui/material';
// components
import Image from 'src/components/blurImage';
// icons
import { AiOutlineShop } from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa6';
// next
import { useRouter } from 'src/hooks/useRouter';

export default function ShopCard({ ...props }) {
  const { shop, isLoading } = props;
  const router = useRouter();
  const baseUrl = '/shops/';

  return (
    <Card
      sx={{
        // px: 3,
        // py: 2,
        borderRadius: 2
      }}
    >
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          height: 100
        }}
      >
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            sx={{
              height: 100,
              width: '100%'
            }}
          />
        ) : (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%'
            }}
          >
            <Image
              alt="shop"
              src={shop?.cover?.url}
              // placeholder="blur"
              // blurDataURL={shop?.cover?.blurDataURL}
              layout="fill"
              objectFit="cover"
              static
              draggable="false"
              quality={5}
              sizes={'50vw'}
            />
          </Box>
        )}
      </Box>
      <CardContent>
        <Box sx={{ mt: -7 }}>
          {isLoading ? (
            <Skeleton
              variant="circular"
              sx={{
                height: 70,
                width: 70,
                mx: 'auto'
              }}
            />
          ) : (
            <Box
              sx={{
                position: 'relative',
                height: 70,
                width: 70,
                minWidth: 70,
                borderRadius: '50%',
                bgcolor: 'background.paper',
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  height: 64,
                  width: 64,
                  minWidth: 64,
                  borderRadius: '50%',
                  img: {
                    borderRadius: '50%'
                  },
                  '&:after': {
                    content: `""`,
                    display: 'block',
                    paddingBottom: '100%'
                  }
                }}
              >
                <Image
                  alt="shop"
                  src={shop?.logo?.url}
                  placeholder="blur"
                  blurDataURL={shop?.logo?.blurDataURL}
                  layout="fill"
                  objectFit="cover"
                  static
                  draggable="false"
                  quality={5}
                  sizes={'50vw'}
                />
              </Box>
            </Box>
          )}
        </Box>
        <Stack spacing={1}>
          <Typography
            {...(!isLoading && {
              component: Link,
              href: baseUrl + shop?.slug
            })}
            color="text.primary"
            variant="h6"
            textAlign="center"
            lineHeight={0.5}
            sx={{ textTransform: 'capitalize', pt: 2 }}
          >
            {isLoading ? <Skeleton variant="text" width={100} sx={{ mx: 'auto' }} /> : shop?.title}
          </Typography>
          <Typography color="text.secondary" variant="body1" textAlign="center">
            {isLoading ? (
              <Skeleton variant="text" width={'100%'} />
            ) : (
              'Our Highest Rated Shops Where You Can Find What You Are'
            )}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.5} justifyContent="center" mt={1}>
          {isLoading ? (
            <Skeleton
              variant="rectanguar"
              width={121}
              height={32}
              sx={{
                borderRadius: '24px'
              }}
            />
          ) : (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              type="button"
              onClick={() => router.push(baseUrl + shop?.slug)}
              startIcon={<AiOutlineShop />}
              sx={{
                borderRadius: 6,
                fontWeight: 400,
                whiteSpace: 'nowrap',
                px: 2,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2)
              }}
            >
              View Store
            </Button>
          )}
          {isLoading ? (
            <Skeleton
              variant="rectanguar"
              width={92}
              height={32}
              sx={{
                borderRadius: '24px'
              }}
            />
          ) : (
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              startIcon={<FaRegUser size={16} />}
              sx={{
                borderRadius: 6,
                fontWeight: 400,
                px: 2,
                bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.2)
              }}
            >
              Follow
            </Button>
          )}
        </Stack>
      </CardContent>
      <Divider />
      <CardContent
        sx={{
          py: '16px !important'
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-evenly" spacing={2}>
          <Stack alignItems="center">
            <Typography variant="subtitle2" color="text.secondary">
              {isLoading ? <Skeleton variant="text" width={50} /> : 'Followers'}
            </Typography>
            <Typography variant="h5" color="text.primary">
              {isLoading ? <Skeleton variant="text" width={100} /> : shop?.followers?.length}
            </Typography>
          </Stack>{' '}
          {/* <Stack alignItems="center">
            <Typography variant="subtitle2" color="text.secondary">
              Following
            </Typography>
            <Typography variant="subtitle2" color="text.primary">
              11.9K
            </Typography>
          </Stack> */}
          <Stack alignItems="center">
            <Typography variant="subtitle2" color="text.secondary">
              {isLoading ? <Skeleton variant="text" width={50} /> : 'Total Products'}
            </Typography>
            <Typography variant="h5" color="text.primary">
              {isLoading ? <Skeleton variant="text" width={100} /> : shop?.products?.length}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      {/* <CardActionArea className="card-action-area" component={Link} href={`${baseUrl + shop?.slug}`}>
        <CardContent></CardContent>
      </CardActionArea> */}
    </Card>
  );
}
ShopCard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  shop: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      url: PropTypes.string.isRequired,
      blurDataURL: PropTypes.string.isRequired
    }),
    logo: PropTypes.shape({
      url: PropTypes.string.isRequired,
      blurDataURL: PropTypes.string.isRequired
    }),

    title: PropTypes.string.isRequired,
    address: PropTypes.object.isRequired
  }).isRequired
};
