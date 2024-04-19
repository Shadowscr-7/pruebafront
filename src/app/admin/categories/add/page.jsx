import React from 'react';
import Toolbar from 'src/components/_admin/toolbar';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import AddCategory from 'src/components/_admin/categories/addCategory';

// Meta information
export const metadata = {
  title: 'Add Categories - Nextall',
  applicationName: 'Nextall',
  authors: 'Nextall'
};

export default function page() {
  return (
    <div>
      <Toolbar>
        <HeaderBreadcrumbs
          admin
          heading="Categories List"
          links={[
            {
              name: 'Dashboard',
              href: '/admin'
            },
            {
              name: 'Categories',
              href: '/admin/categories'
            },
            {
              name: 'Add Category'
            }
          ]}
        />
      </Toolbar>
      <AddCategory />
    </div>
  );
}
