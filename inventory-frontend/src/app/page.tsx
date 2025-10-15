
'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


export default function ProductListPage() {
  return (
  <div className="flex flex-col items-center justify-center min-h-screen py-20 bg-blue-50">
      <h1 className="text-3xl font-bold mb-6">Welcome to Inventra</h1>
        <Link href="/products/ViewProducts">
        <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-800">View Products</Button>
      </Link>
    </div>
  );
}
