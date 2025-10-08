// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div className="grid grid-cols-3 gap-4">
        <Link href="/products" className="p-4 bg-white rounded shadow">
          <h3 className="font-bold">Products</h3>
          <p className="text-sm text-slate-500">Manage products</p>
        </Link>

        <Link href="/variants" className="p-4 bg-white rounded shadow">
          <h3 className="font-bold">Variants</h3>
          <p className="text-sm text-slate-500">Manage product variants</p>
        </Link>

        <Link href="/stock" className="p-4 bg-white rounded shadow">
          <h3 className="font-bold">Stock</h3>
          <p className="text-sm text-slate-500">Manage stock</p>
        </Link>
      </div>
    </div>
  );
}
