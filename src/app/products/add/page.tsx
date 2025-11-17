"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AddProductPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState("");

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
      const res = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          price: Number(price),
          description,
        }),
      });

      if (!res.ok) {
        setError("Gagal menambahkan produk!");
        return;
      }

      router.push("/products");
    } catch {
      setError("Terjadi kesalahan.");
    }
  };

  return (
    <div className="max-w-xl mx-auto my-28 px-4">
      <Card className="shadow-xl border-rose-200 bg-linear-to-br from-rose-50 to-rose-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-linear-to-r from-rose-600 to-rose-400 bg-clip-text text-transparent">
            Tambah Produk Baru
          </CardTitle>
        </CardHeader>

        <CardContent>
          {error && (
            <p className="text-red-600 font-medium mb-3 bg-red-50 border border-red-200 p-2 rounded">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Nama Produk</Label>
              <Input
                placeholder="Contoh: Laptop Gaming"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="focus-visible:ring-rose-500"
              />
            </div>

            <div className="space-y-2">
              <Label>Harga</Label>
              <Input
                type="number"
                placeholder="Contoh: 4200000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="focus-visible:ring-rose-500"
              />
            </div>

            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <Textarea
                rows={4}
                placeholder="Deskripsi produk..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="focus-visible:ring-rose-500"
              />
            </div>

            <div className="space-y-2">
              <Label>Upload Gambar (opsional)</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer focus-visible:ring-rose-500"
              />

              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded-lg border shadow-sm"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/products")}
                className="border-rose-300 text-rose-600 hover:bg-rose-100"
              >
                Batal
              </Button>

              <Button
                type="submit"
                className="bg-rose-600 hover:bg-rose-700 text-white shadow-md"
              >
                Simpan Produk
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
