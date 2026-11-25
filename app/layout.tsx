import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: 'Gian-I Media',
    template: '%s | Gian-I Media'
  },
  description: 'Gian-I Media is a multidisciplinary creative studio specializing in graphic design, branding, digital experiences, and interactive media.',
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className='h-full antialiased'
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
