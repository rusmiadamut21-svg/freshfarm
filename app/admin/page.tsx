
"use client";

import { useEffect, useState } from "react";

type Pesanan = {
  id: string;
  nama: string;
  alamat: string;
  telepon: string;
  total: number;
  tanggal: string;
  status: string;
};

export default function AdminPage() {
  const [pesanan, setPesanan] = useState<Pesanan[]>([]);
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    try {
      const data = JSON.parse(
        localStorage.getItem("freshfarm_orders") || "[]"
      );

      if (Array.isArray(data)) {
        setPesanan(data);
      }
    } catch {
      setPesanan([]);
    }

    setSiap(true);
  }, []);

  if (!siap) return <p>Memuat dashboard...</p>;

  const hariIni = new Date().toLocaleDateString("id-ID");

  const pesananHariIni = pesanan.filter(
    (item) =>
      new Date(item.tanggal).toLocaleDateString("id-ID") === hariIni
  );

  const totalPembeli = new Set(
    pesananHariIni.map((item) => item.telepon)
  ).size;

  const totalPendapatan = pesananHariIni.reduce(
    (jumlah, item) => jumlah + item.total,
    0
  );

  return (
    <main className="dashboard">
      <h1>Dashboard Admin FreshFarm</h1>
      <p>Ringkasan aktivitas penjualan hari ini</p>

      <section className="ringkasan">
        <div className="kartu">
          <h3>Total Pembeli Hari Ini</h3>
          <strong>{totalPembeli}</strong>
          <p>Pembeli</p>
        </div>

        <div className="kartu">
          <h3>Total Pesanan Hari Ini</h3>
          <strong>{pesananHariIni.length}</strong>
          <p>Pesanan masuk</p>
        </div>

        <div className="kartu">
          <h3>Total Pendapatan Hari Ini</h3>
          <strong>
            Rp{totalPendapatan.toLocaleString("id-ID")}
          </strong>
          <p>Total pembayaran</p>
        </div>
      </section>

      <section className="daftar">
        <h2>Daftar Pembeli Hari Ini</h2>

        {pesananHariIni.length === 0 ? (
          <p>Belum ada pesanan hari ini.</p>
        ) : (
          <div className="tabel">
            <table>
              <thead>
                <tr>
                  <th>Nama Pembeli</th>
                  <th>Nomor Telepon</th>
                  <th>Waktu Pesanan</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {pesananHariIni.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nama}</td>
                    <td>{item.telepon}</td>
                    <td>
                      {new Date(item.tanggal).toLocaleTimeString(
                        "id-ID",
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    </td>
                    <td>
                      Rp{item.total.toLocaleString("id-ID")}
                    </td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          padding: 35px;
          background: #f5f6ef;
          color: #315d38;
          font-family: Arial, sans-serif;
        }

        .ringkasan {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin: 30px 0;
        }

        .kartu, .daftar {
          background: white;
          padding: 24px;
          border-radius: 14px;
          border: 1px solid #e4e7da;
        }

        .kartu strong {
          display: block;
          font-size: 28px;
          margin: 15px 0 5px;
        }

        .kartu p {
          color: #85877f;
        }

        .tabel {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          min-width: 650px;
        }

        th, td {
          padding: 14px;
          border-bottom: 1px solid #e4e7da;
          font-size: 14px;
        }

        th {
          background: #f5f6ef;
        }

        @media (max-width: 700px) {
          .ringkasan {
            grid-template-columns: 1fr;
          }

          .dashboard {
            padding: 20px;
          }
        }
      `}</style>
    </main>
  );
}
