'use client';
import React from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client/react';
import {
  GET_PRODUCTS,
  GET_PRODUCT_WITH_VARIANTS,
  DELETE_PRODUCT,
} from '@/graphql/queries';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ViewProductsPage() {
  const router = useRouter();

  // --- Queries ---
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const [getProductDetails, { loading: variantLoading }] = useLazyQuery(
    GET_PRODUCT_WITH_VARIANTS
  );

  // --- Mutation for deleting product ---
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    update(cache, { data: { removeProduct } }, { variables }) {
      if (removeProduct) {
        // Read the existing product list from cache
        const existingData: any = cache.readQuery({ query: GET_PRODUCTS });

        if (existingData?.products) {
          // Filter out deleted product
          const updatedProducts = existingData.products.filter(
            (p: any) => p.id !== variables.id
          );

          // Write updated product list back to cache
          cache.writeQuery({
            query: GET_PRODUCTS,
            data: { products: updatedProducts },
          });
        }
      }
    },
  });

  const [expandedProductId, setExpandedProductId] = React.useState<number | null>(
    null
  );
  const [productVariantsMap, setProductVariantsMap] = React.useState<{
    [key: number]: any;
  }>({});

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  const products = data?.products ?? [];

  // --- Toggle variant view ---
  const handleShowMore = async (id: number) => {
    if (expandedProductId === id) {
      setExpandedProductId(null);
    } else {
      setExpandedProductId(id);
      if (!productVariantsMap[id]) {
        const { data: productData } = await getProductDetails({ variables: { id } });
        if (productData?.product) {
          setProductVariantsMap((prev) => ({ ...prev, [id]: productData.product }));
        }
      }
    }
  };

  // --- Navigate to edit page ---
  const handleUpdate = (id: number) => {
    router.push(`/products/edit/${id}`);
  };

  // --- Delete product handler ---
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { data } = await deleteProduct({ variables: { id } });
      if (data?.removeProduct) {
        alert(' Product deleted successfully!');
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting product');
    }
  };

  // --- UI ---
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Products</h1>
        <Link href="/products/Add">
          <Button className="text-white">
            Add Product
          </Button>
        </Link>
      </div>

      <Table className="min-w-full border rounded-lg shadow-sm bg-white">
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-3">ID</TableHead>
            <TableHead className="px-6 py-3">Name</TableHead>
            <TableHead className="px-6 py-3">Price</TableHead>
            <TableHead className="px-6 py-3">Details</TableHead>
            <TableHead className="px-6 py-3">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product: any) => {
            const variants = productVariantsMap[product.id]?.variants ?? [];

            return (
              <React.Fragment key={product.id}>
                <TableRow>
                  <TableCell className="font-medium">{product.id}
                  </TableCell>
                  <TableCell>
                    {product.name}
                  </TableCell>
                  <TableCell>
                    {product.price}
                  </TableCell>

                  {/* Details */}
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShowMore(product.id)}
                    >
                      {expandedProductId === product.id ? 'Hide' : 'Show More'}
                    </Button>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"                      
                      onClick={() => handleUpdate(product.id)}
                    >
                      Update
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>

                {/* Variants */}
                {expandedProductId === product.id && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="bg-gray-100 px-6 py-4"
                    >
                      {variantLoading && !variants.length ? (
                        <p className="text-gray-500">Loading variants...</p>
                      ) : variants.length ? (
                        <Table className="border rounded-md w-full bg-white">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Variant ID</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>SKU</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Stocks</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {variants.map((variant: any) => (
                              <TableRow
                                key={variant.id}
                              >
                                <TableCell>
                                  {variant.id}
                                </TableCell>
                                <TableCell>
                                  {variant.name || '-'}
                                </TableCell>
                                <TableCell>
                                  {variant.sku || '-'}
                                </TableCell>
                                <TableCell>
                                  {variant.description || '-'}
                                </TableCell>
                                <TableCell>
                                  {variant.stocks?.length
                                    ? variant.stocks
                                        .map((s: any) => `${s.location}: ${s.quantity}`)
                                        .join(', ')
                                    : '-'}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <p className="text-gray-600">No variants available.</p>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
