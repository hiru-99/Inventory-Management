import './globals.css';
import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'Inventory App',
  description: 'Products, Variants & Stock',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-6xl mx-auto p-4">
          <header className="mb-6">
            <h1 className="text-2xl font-bold">Inventory Management</h1>
            <p className="text-sm text-slate-500">Products • Variants • Stock</p>
          </header>

          <main>{children}</main>

          <footer className="mt-8 text-sm text-slate-400">© Inventory</footer>
        </div>
      </body>
    </html>
  );
}
