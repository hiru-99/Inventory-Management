'use client';
import { useQuery, useMutation } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_PRODUCTS, CREATE_PRODUCT } from '../graphql/operations';
import { useState } from 'react';

export default function ProductsClient() {
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS, { client });
  const [createProduct] = useMutation(CREATE_PRODUCT, { client });

  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [description, setDescription] = useState('');

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name || price === '') return;
    await createProduct({ variables: { name, price: parseFloat(String(price)), description } });
    setName(''); setPrice(''); setDescription('');
    refetch();
  }

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error: {String(error)}</div>;

  return (
    <div className="space-y-6">
      <form onSubmit={handleCreate} className="p-4 bg-white rounded shadow">
        <div className="grid grid-cols-3 gap-2">
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className="col-span-1 p-2 border rounded" />
          <input value={price} onChange={(e)=>setPrice(e.target.value === '' ? '' : Number(e.target.value))} placeholder="Price" type="number" className="col-span-1 p-2 border rounded" />
          <input value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" className="col-span-1 p-2 border rounded" />
        </div>
        <div className="mt-3">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
        </div>
      </form>

      <div className="grid gap-4">
        {data?.products?.map((p: any) => (
          <div key={p.id} className="p-4 bg-white rounded shadow">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{p.name} — ${p.price}</h3>
                <p className="text-sm text-slate-600">{p.description}</p>
              </div>
              <div className="text-sm text-slate-500">ID: {p.id}</div>
            </div>

            <div className="mt-3">
              <strong>Variants:</strong>
              <ul className="ml-4 list-disc">
                {p.variants?.map((v: any) => (
                  <li key={v.id}>
                    {v.name} ({v.sku ?? 'no-sku'}) — stocks: {v.stocks?.length ?? 0}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
