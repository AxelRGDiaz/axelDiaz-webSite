import './globals.css';

export const metadata = {
  title: 'Mi Portafolio',
  description: 'Portafolio de desarrollador web',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
