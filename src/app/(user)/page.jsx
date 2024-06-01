'use client';
// import { Suspense } from 'react';
import dynamic from 'next/dynamic';
// mui
import { Container } from '@mui/material';
// components
import Hero from 'src/components/_main/home/hero';
import WhyUs from 'src/components/_main/home/whyUs';
import TopBanners from 'src/components/_main/home/topBanners';

const Categories = dynamic(() => import('src/components/_main/home/categories'));
const BestSellingProducs = dynamic(() => import('src/components/_main/home/bestSelling'));
const Banner = dynamic(() => import('src/components/_main/home/banner'));
const Brands = dynamic(() => import('src/components/_main/home/brands'));
const TopCollection = dynamic(() => import('src/components/_main/home/top'));
const Shops = dynamic(() => import('src/components/_main/home/shop'));
const Compaigns = dynamic(() => import('src/components/_main/home/compaign'));
const Testimonials = dynamic(() => import('src/components/_main/home/testimonials'));
const FeaturedProducts = dynamic(() => import('src/components/_main/home/featured'));
const SubscriptionModal = dynamic(() => import('src/components/_main/home/subscription'));

export default function IndexPage() {
  return (
    <>
      <Container maxWidth="xl">
        <Hero />
      </Container>
      <TopBanners />
      <Container maxWidth="xl">
        <WhyUs />
        <Categories />
        <BestSellingProducs />
        <Compaigns />
      </Container>
      <Banner />
      <Container maxWidth="xl">
        <TopCollection />
        <Shops />
        <FeaturedProducts />
      </Container>
      <Testimonials />
      <Container maxWidth="xl">
        <Brands />
      </Container>
      <SubscriptionModal />
    </>
  );
}
