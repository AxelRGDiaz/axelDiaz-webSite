import './globals.css';

export const metadata = {
  title: 'Mi Portafolio',
  description: 'Portafolio de desarrollador web',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
      <link rel="icon" href="/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
