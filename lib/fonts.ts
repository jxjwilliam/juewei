import localFont from 'next/font/local'

// Source Han Sans font configuration for Chinese text
export const sourceHanSans = localFont({
  src: [
    {
      path: '../public/fonts/source_han_sans/SourceHanSansCN-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/source_han_sans/SourceHanSansCN-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/source_han_sans/SourceHanSansCN-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-source-han-sans',
  display: 'swap',
  preload: true,
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
})

// Source Han Serif font configuration for Chinese text
export const sourceHanSerif = localFont({
  src: [
    {
      path: '../public/fonts/source_han_sans/SourceHanSerifCN-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/source_han_sans/SourceHanSerifCN-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/source_han_sans/SourceHanSerifCN-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-source-han-serif',
  display: 'swap',
  preload: false,
  fallback: [
    'Georgia',
    'Times New Roman',
    'serif',
  ],
})

// System font fallback for English text
export const systemFont = localFont({
  src: [],
  variable: '--font-system',
  display: 'swap',
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
})
