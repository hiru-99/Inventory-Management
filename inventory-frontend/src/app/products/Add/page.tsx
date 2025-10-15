'use client';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { ADD_PRODUCT } from '@/graphql/queries';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });
  const [createProduct, { loading, error }] = useMutation(ADD_PRODUCT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct({
        variables: {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
        },
      });
      router.push('/products/ViewProducts');
    } catch (err) {
      console.error('Error creating product:', err);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <Input
              placeholder="Price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Product'}
            </Button>
            {error && <p className="text-red-500 text-sm">Failed to create product</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
