import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/components/theme/theme-provider';
import SiteHeader from '@/components/site/site-header';
import SiteFooter from '@/components/site/site-footer';

export const metadata: Metadata = {
  title: {
    default: 'Gian-I Media',
    template: '%s | Gian-I Media'
  },
  description: 'Gian-I Media is a multidisciplinary creative studio specializing in graphic design, branding, digital experiences, and interactive media.',
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <div className="mx-auto flex w-full max-w-max flex-1 flex-col px-(--margin-mobile) sm:px-(--margin-tablet) lg:px-(--margin-desktop)">
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
