"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();

      setTitle(data.title);
      setPrice(data.price.toString());
      setDescription(data.description);
      setImagePreview(data.thumbnail);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !price || !description) {
      setError("Semua field wajib diisi.");
      return;
    }

    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          price: Number(price),
          description,
        }),
      });

      if (!res.ok) {
        setError("Gagal mengupdate produk!");
        return;
      }

      router.push("/products");
    } catch (error) {
      console.error(error);
      setError("Terjadi kesalahan.");
    }
  };

  if (loading) return <p className="p-6">Memuat produk...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Edit Produk</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nama Produk</label>
          <input
            type="text"
            className="border w-full p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nama produk"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Harga</label>
          <input
            type="number"
            className="border w-full p-2 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Harga"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Deskripsi</label>
          <textarea
            rows={4}
            className="border w-full p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi produk..."
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Gambar (opsional)</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-40 h-40 object-cover rounded border"
            />
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            Update
          </button>

          <button
            type="button"
            onClick={() => router.push("/products")}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
