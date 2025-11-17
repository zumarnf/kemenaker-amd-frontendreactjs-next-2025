"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus produk ini?");
    if (!confirmDelete) return;

    try {
      await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
      });

      // update state
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return <p className="p-6">Memuat produk...</p>;
  }

  return (
    <div className="p-6 mt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-rose-900">Daftar Produk</h1>

        <button
          onClick={() => router.push("/products/add")}
          className="bg-rose-600 px-4 text-amber-100 py-2 rounded-2xl hover:bg-rose-300 hover:text-rose-600"
        >
          Tambah Produk
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow-sm bg-white"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover rounded mb-3"
            />

            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600 text-sm mb-3 truncate">
              {product.description}
            </p>

            <p className="font-bold mb-3">${product.price}</p>

            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/products/${product.id}/edit`)}
                className="w-full bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product.id)}
                className="w-full bg-red-600 text-white py-1 rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
