import { Card, CardContent } from "@/components/ui/card";
import { PackageSearch, AlertTriangle, Boxes } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="my-24 px-6 flex flex-col items-center">
      {/* HEADER */}
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-3 bg-linear-to-r from-rose-600 to-rose-400 bg-clip-text text-transparent">
          Dashboard Pemantauan Stok
        </h1>

        <p className="text-lg text-muted-foreground">
          Pantau ketersediaan barang secara cepat dan akurat di
          <span className="font-semibold text-rose-600">
            {" "}
            WantS Inventory System
          </span>
          .
        </p>
      </div>

      {/* QUOTE CARD */}
      <Card className="mt-10 w-full max-w-3xl shadow-md border-rose-200 bg-linear-to-br from-rose-50 to-rose-100">
        <CardContent className="p-8">
          <p className="text-xl italic text-rose-700 text-center leading-relaxed">
            “Manajemen stok yang baik bukan tentang banyaknya barang, tetapi
            tentang ketepatan informasi.”
          </p>
        </CardContent>
      </Card>

      {/* FEATURE / STATUS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mt-10">
        {/* Total Produk */}
        <Card className="shadow-sm hover:shadow-md transition border-rose-100">
          <CardContent className="p-6 flex flex-col items-center">
            <Boxes className="w-10 h-10 text-rose-600 mb-3" />
            <h2 className="text-xl font-semibold text-rose-600">
              Total Produk
            </h2>
            <p className="text-muted-foreground text-center">
              Lihat keseluruhan daftar produk yang tersedia.
            </p>
          </CardContent>
        </Card>

        {/* Produk Hampir Habis */}
        <Card className="shadow-sm hover:shadow-md transition border-rose-100">
          <CardContent className="p-6 flex flex-col items-center">
            <AlertTriangle className="w-10 h-10 text-rose-600 mb-3" />
            <h2 className="text-xl font-semibold text-rose-600">Stok Rendah</h2>
            <p className="text-muted-foreground text-center">
              Pantau produk dengan stok menipis agar tidak kehabisan.
            </p>
          </CardContent>
        </Card>

        {/* Detail Stok */}
        <Card className="shadow-sm hover:shadow-md transition border-rose-100">
          <CardContent className="p-6 flex flex-col items-center">
            <PackageSearch className="w-10 h-10 text-rose-600 mb-3" />
            <h2 className="text-xl font-semibold text-rose-600">Detail Stok</h2>
            <p className="text-muted-foreground text-center">
              Cek informasi lengkap setiap produk yang kamu miliki.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
