'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { useSelector } from 'src/lib/redux';
import { createTheme } from '@mui/material/styles';
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import shape from './shape';
import shadows, { customShadows } from './shadows';
import componentsOverride from './overrides';
import { usePathname } from 'next/navigation';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import * as locales from '@mui/material/locale';

ThemeRegistry.propTypes = {
  children: PropTypes.node.isRequired
};

const Localization = (lang) => {
  switch (lang) {
    case 'ar':
      return 'arEG';
    case 'fr':
      return 'frFR';
    case 'en':
      return 'enUS';
    default:
      return 'frFR';
  }
};

export default function ThemeRegistry({ children }) {
  const { themeMode } = useSelector((state) => state.settings);
  const pathName = usePathname();
  const segments = pathName?.split('/');
  const lang = segments[1];
  const locale = Localization(lang);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const styleCache = createCache({
    key: dir === 'rtl' ? 'muirtl' : 'css',
    stylisPlugins: dir === 'rtl' ? [prefixer, rtlPlugin] : []
  });
  const customTheme = React.useMemo(
    () =>
      createTheme(
        {
          palette: themeMode === 'dark' ? { ...palette.dark, mode: 'dark' } : { ...palette.light, mode: 'light' },
          direction: dir,
          typography: typography,
          shadows: themeMode === 'dark' ? shadows.dark : shadows.light,
          shape,
          breakpoints,
          customShadows: themeMode === 'dark' ? customShadows.light : customShadows.dark
        },
        locales[locale]
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [themeMode, locale]
  );
  customTheme.components = componentsOverride(customTheme);
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }} value={styleCache}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <main dir={dir}>{children}</main>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
