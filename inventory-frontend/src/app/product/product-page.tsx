import dynamic from 'next/dynamic';

const ProductsClient = dynamic(() => import('../../components/ProductsClient'), { ssr: false });

export default function ProductsPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      <ProductsClient />
    </div>
  );
}
