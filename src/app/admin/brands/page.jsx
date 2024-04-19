import React from 'react';
// Components
import BrandList from 'src/components/_admin/brands/brandList';
// Toolbar
import Toolbar from 'src/components/_admin/toolbar';
// Breadcrumbs
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';

// Meta information
export const metadata = {
  title: 'Brands - Nextall',
  applicationName: 'Nextall',
  authors: 'Nextall'
};
export default function Brands() {
  return (
    <>
      <Toolbar>
        <HeaderBreadcrumbs
          admin
          heading="Brands List"
          links={[
            {
              name: 'Admin Dashboard',
              href: '/admin'
            },
            {
              name: 'Brands'
            }
          ]}
          action={{
            href: `/admin/brands/add`,
            title: 'Add brand'
          }}
        />
      </Toolbar>
      <BrandList />
    </>
  );
}
