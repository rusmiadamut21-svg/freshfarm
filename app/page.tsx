"use client";

import { useState } from "react";

const products = [
  { id: 1, name: "Bayam Segar", category: "Sayuran", price: 5000, emoji: "🥬", unit: "ikat" },
  { id: 2, name: "Wortel Organik", category: "Sayuran", price: 8000, emoji: "🥕", unit: "kg" },
  { id: 3, name: "Tomat Merah", category: "Sayuran", price: 10000, emoji: "🍅", unit: "kg" },
  { id: 4, name: "Jagung Manis", category: "Sayuran", price: 7000, emoji: "🌽", unit: "pcs" },
  { id: 5, name: "Apel Segar", category: "Buah", price: 18000, emoji: "🍎", unit: "kg" },
  { id: 6, name: "Pisang Lokal", category: "Buah", price: 12000, emoji: "🍌", unit: "sisir" },
];

const money = (price: number) =>
  "Rp" + price.toLocaleString("id-ID");

export default function Home() {
  const [active, setActive] = useState("Overview");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [saved, setSaved] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "Semua" || product.category === category;

    const matchesPage =
      active !== "Saved" || saved.includes(product.id);

    return matchesSearch && matchesCategory && matchesPage;
  });

  const cartCount = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  const cartTotal = products.reduce(
    (sum, product) =>
      sum + product.price * (cart[product.id] || 0),
    0
  );

  function addToCart(id: number) {
    setCart((previous) => ({
      ...previous,
      [id]: (previous[id] || 0) + 1,
    }));
  }

  function toggleSaved(id: number) {
    setSaved((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" onClick={() => setActive("Overview")}>
          <span className="brand-icon">🌱</span>
          <span>FreshFarm</span>
        </a>

        <p className="side-label">MENU UTAMA</p>

        <nav className="navigation">
          {[
            { name: "Overview", icon: "⌂" },
            { name: "Explore", icon: "⌕" },
            { name: "Saved", icon: "♥" },
            { name: "Profile", icon: "♟" },
          ].map((item) => (
            <button
              key={item.name}
              className={`nav-item ${
                active === item.name ? "active" : ""
              }`}
              onClick={() => {
                setActive(item.name);
                setSearch("");
                setCategory("Semua");
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.name}
              {item.name === "Saved" && saved.length > 0 && (
                <span className="nav-count">{saved.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="farmer-card">
            <span className="farmer-emoji">🧑‍🌾</span>
            <div>
              <strong>Fresh from farm</strong>
              <p>Langsung dari petani</p>
            </div>
          </div>
          <p className="side-footer">© 2026 FreshFarm</p>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            <span>FreshFarm</span>
            <span className="breadcrumb-divider">/</span>
            <strong>{active}</strong>
          </div>

          <button
            className="cart-button"
            onClick={() => setShowCart(!showCart)}
          >
            <span>🛒</span>
            <span>Keranjang</span>
            <span className="cart-badge">{cartCount}</span>
          </button>
        </header>

        {active === "Profile" ? (
          <section className="content profile-content">
            <div className="welcome-label">AKUN SAYA</div>
            <h1>Profil Pengguna</h1>
            <p className="subtitle">
              Informasi akun FreshFarm kamu.
            </p>

            <div className="profile-card">
              <div className="profile-avatar">👤</div>
              <h2>Pengguna FreshFarm</h2>
              <p>Anggota FreshFarm</p>
              <div className="profile-stats">
                <div>
                  <strong>{cartCount}</strong>
                  <span>Produk di keranjang</span>
                </div>
                <div>
                  <strong>{saved.length}</strong>
                  <span>Produk tersimpan</span>
                </div>
              </div>
              <button
                className="primary-button"
                onClick={() => setActive("Overview")}
              >
                Kembali ke Dashboard
              </button>
            </div>
          </section>
        ) : (
          <section className="content">
            <div className="hero">
              <div className="hero-copy">
                <span className="welcome-label">
                  PASAR TANI DIGITAL
                </span>
                <h1>
                  {active === "Saved"
                    ? "Produk Favoritmu"
                    : active === "Explore"
                    ? "Jelajahi Hasil Tani"
                    : "Pasar Hasil Tani Segar"}
                </h1>
                <p>
                  {active === "Saved"
                    ? "Temukan kembali produk yang kamu simpan."
                    : "Hasil panen berkualitas, langsung dari petani lokal."}
                </p>
                <button
                  className="primary-button"
                  onClick={() => setActive("Explore")}
                >
                  Jelajahi Produk <span>→</span>
                </button>
              </div>

              <div className="hero-art">
                <div className="art-circle"></div>
                <span className="art-leaf leaf-one">🌿</span>
                <span className="art-produce">🥬</span>
                <span className="art-fruit">🥕</span>
                <span className="art-tomato">🍅</span>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon green-icon">🥦</span>
                <div>
                  <p>Total Produk</p>
                  <h3>{products.length} Produk</h3>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon orange-icon">🧺</span>
                <div>
                  <p>Isi Keranjang</p>
                  <h3>{cartCount} Item</h3>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon yellow-icon">♥</span>
                <div>
                  <p>Produk Favorit</p>
                  <h3>{saved.length} Produk</h3>
                </div>
              </div>
            </div>

            <div className="section-heading">
              <div>
                <h2>
                  {active === "Saved"
                    ? "Produk Tersimpan"
                    : "Produk Pilihan"}
                </h2>
                <p>Pilihan hasil panen segar untukmu.</p>
              </div>
              <span className="product-total">
                {filteredProducts.length} produk
              </span>
            </div>

            <div className="filter-row">
              <div className="search-box">
                <span>⌕</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cari sayuran atau buah..."
                />
              </div>

              <div className="category-tabs">
                {["Semua", "Sayuran", "Buah"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`category-tab ${
                      category === item ? "selected" : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-picture">
                    <span className="product-emoji">
                      {product.emoji}
                    </span>
                    <button
                      className={`favorite-button ${
                        saved.includes(product.id) ? "favorited" : ""
                      }`}
                      aria-label="Simpan produk"
                      onClick={() => toggleSaved(product.id)}
                    >
                      {saved.includes(product.id) ? "♥" : "♡"}
                    </button>
                    <span className="fresh-label">Segar</span>
                  </div>

                  <div className="product-info">
                    <span className="product-category">
                      {product.category}
                    </span>
                    <h3>{product.name}</h3>
                    <p className="product-note">
                      🌱 Hasil tani lokal
                    </p>
                    <div className="product-bottom">
                      <div className="price">
                        <strong>{money(product.price)}</strong>
                        <span>/{product.unit}</span>
                      </div>
                      <button
                        className="add-button"
                        aria-label={`Tambah ${product.name} ke keranjang`}
                        onClick={() => addToCart(product.id)}
                      >
                        +
                      </button>
                    </div>
                    {cart[product.id] > 0 && (
                      <p className="added-note">
                        ✓ {cart[product.id]} item di keranjang
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="empty-state">
                <span>🌱</span>
                <h3>Produk belum ditemukan</h3>
                <p>Coba kata kunci lain atau pilih kategori berbeda.</p>
                <button
                  className="primary-button"
                  onClick={() => {
                    setSearch("");
                    setCategory("Semua");
                    if (active === "Saved") setActive("Explore");
                  }}
                >
                  Lihat Semua Produk
                </button>
              </div>
            )}
          </section>
        )}
      </section>

      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <section
            className="cart-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-heading">
              <div>
                <h2>Keranjang Saya</h2>
                <p>{cartCount} item dipilih</p>
              </div>
              <button
                className="close-button"
                onClick={() => setShowCart(false)}
              >
                ×
              </button>
            </div>

            {cartCount === 0 ? (
              <div className="empty-cart">
                <span>🧺</span>
                <h3>Keranjang masih kosong</h3>
                <p>Yuk, pilih hasil tani segar favoritmu!</p>
                <button
                  className="primary-button"
                  onClick={() => setShowCart(false)}
                >
                  Belanja Sekarang
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {products
                    .filter((product) => cart[product.id] > 0)
                    .map((product) => (
                      <div className="cart-item" key={product.id}>
                        <span className="cart-product-emoji">
                          {product.emoji}
                        </span>
                        <div className="cart-product-detail">
                          <strong>{product.name}</strong>
                          <span>{money(product.price)}</span>
                          <div className="quantity-controls">
                            <button
                              onClick={() =>
                                setCart((previous) => ({
                                  ...previous,
                                  [product.id]:
                                    previous[product.id] - 1,
                                }))
                              }
                            >
                              −
                            </button>
                            <span>{cart[product.id]}</span>
                            <button onClick={() => addToCart(product.id)}>
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="cart-summary">
                  <div>
                    <span>Total belanja</span>
                    <strong>{money(cartTotal)}</strong>
                  </div>
                  <button
                    className="primary-button checkout-button"
                    onClick={() =>
                      alert(
                        "Keranjang siap diproses. Fitur pembayaran dapat ditambahkan berikutnya."
                      )
                    }
                  >
                    Lanjutkan Belanja
                  </button>
                  <p>Harga dapat berubah sesuai ketersediaan hasil panen.</p>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}