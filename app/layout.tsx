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

// Sets the color scheme prior to painting HTML
const themeScript = `(
  function(){
    try {
      var theme = localStorage.getItem('theme');
      if (theme !== 'light' && theme !== 'dark') {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      var root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      root.style.colorScheme = theme;
    } catch(error) {}
    // The landing page's scroll-driven intro must start at the top; set before the browser restores a reload's scroll.
    if (location.pathname === '/') history.scrollRestoration = 'manual';
  }
)()`

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased scrollbar-thin" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <div className="relative isolate mx-auto flex w-full max-w-max flex-1 flex-col px-(--margin-mobile) sm:px-(--margin-tablet) lg:px-(--margin-desktop)">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -z-10 top-0 bottom-0 mx-auto hidden max-w-max px-(margin-mobile) sm:block sm:px-(--margin-tablet) lg:px-(--margin-desktop)"
            >
              <div
                className="grid h-full grid-cols-12 gap-x-6"
              >
                {
                  Array.from({ length: 12 }, (_, i) => (
                      <div 
                        key={i}
                        className="border-l border-lmMedium dark:border-dmMedium opacity-30" 
                      />
                    )
                  )
                }
              </div>
            </div>
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
