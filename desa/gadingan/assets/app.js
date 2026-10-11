(function () {
  const G = window.GAD, ID = G.identitas, BPS = G.bps;
  const UMKM = Array.isArray(window.UMKM) ? window.UMKM : [];
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const nf = (n) => Number(n).toLocaleString("id-ID");
  const plain = (h) => String(h || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const cut = (t, n) => (t.length > n ? t.slice(0, n).replace(/\s+\S*$/, "") + "…" : t);
  const bg = (u) => (u ? `style="background-image:url('${esc(u)}')"` : "");
  const imgTag = (u, cls = "", alt = "") => (u ? `<img class="${cls}" src="${esc(u)}" alt="${esc(alt)}" loading="lazy" onerror="this.style.display='none'">` : "");

  const SVG = {
    ktp: `<svg class="svg-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="8" cy="10" r="2"/><path d="M14 10h4"/><path d="M14 14h4"/><path d="M6 16c0-1.5 1.5-2 3-2s3 .5 3 2"/></svg>`,
    kk: `<svg class="svg-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    akte: `<svg class="svg-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    calendar: `<svg class="svg-ic sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    shield: `<svg class="svg-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    external: `<svg class="svg-ic ext" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
    mapPin: `<svg class="svg-ic sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    arrowRight: `<svg class="svg-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    chevronUp: `<svg class="svg-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`,
    file: `<svg class="svg-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`
  };

  const LAY = G.layanan, LEM = G.lembaga;
  const PPID = [
    ["ppid-berkala", "Informasi Berkala"], ["ppid-serta-merta", "Informasi Serta Merta"], ["ppid-setiap-saat", "Informasi Setiap Saat"],
    ["ppid-dikecualikan", "Informasi Dikecualikan"], ["ppid-permohonan", "Permohonan Informasi Publik"], ["ppid-keberatan", "Permohonan Keberatan"],
    ["ppid-sengketa", "Penyelesaian Sengketa"], ["ppid-maklumat", "Maklumat Layanan Informasi Publik"],
  ];
  const DAK = [["dak-1", "I. Penguatan Tata Laksana"], ["dak-2", "II. Penguatan Pengawasan"], ["dak-3", "III. Penguatan Kualitas Pelayanan Publik"], ["dak-4", "IV. Penguatan Partisipasi Masyarakat"], ["dak-5", "V. Kearifan Lokal"]];
  const PROFIL = [["tentang", "Tentang Desa"], ["sejarah", "Sejarah Desa"], ["visi-misi", "Visi Misi"], ["perangkat", "Perangkat Desa"]];

  const EMAIL = "gadingandesa476@gmail.com";
  const MAPS_SHORT = "https://maps.app.goo.gl/dG3S7g5gGadingan";
  const FOTO_KANTOR = "/desa/gadingan/uploads/images/website/kantor-desa.jpg";

  const MENU = [
    { t: "Home", h: "#/" },
    { t: "Profil", h: "#/profil/tentang", sub: [...PROFIL.map(([k, l]) => [l, "#/profil/" + k]), ["Lembaga Desa", "#/lembaga/bpd"]] },
    { t: "Alamat & Kontak", h: "#/kontak" },
    { t: "Suara Warga", h: "#/suara-warga", sub: [["Pertanyaan & Keluhan", "#/suara-warga"], ["Pengaduan di Website Resmi", ID.websiteResmi + "pengaduan"]] },
    { t: "Rumah UMKM", h: "#/umkm" },
    { t: "Data Sektoral", h: "#/data-sektoral" },
  ];

  function chrome() {
    return `
    <div style="background:#0e2e4e;color:#cbd5e1;font-size:12.5px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.1)">
      <div class="container" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
          <a href="../../index.html" style="color:#fcd34d;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:4px">Portal Kecamatan</a>
          <span style="opacity:0.4">|</span>
          <a href="../palur/index.html" style="color:#fff;font-weight:500;text-decoration:none;display:inline-flex;align-items:center;gap:4px">Ke Desa Palur</a>
          <span style="opacity:0.4">|</span>
          <a href="../plumbon/index.html" style="color:#fff;font-weight:500;text-decoration:none;display:inline-flex;align-items:center;gap:4px">Ke Desa Plumbon</a>
        </div>
        <div><span>Situs Resmi Desa Gadingan</span></div>
      </div>
    </div>
    <header class="brand"><div class="container">
      <div class="brand-left">
        <a href="#/" class="logo-link"><img src="${esc(G.beranda.logo)}" alt="Lambang Kabupaten Sukoharjo" onerror="this.style.display='none'"></a>
        <div class="brand-info">
          <h1>Pemerintah Desa ${esc(ID.nama)}</h1>
          <p>Kecamatan ${esc(ID.kecamatan)}, Kabupaten ${esc(ID.kabupaten)}, ${esc(ID.provinsi)}</p>
        </div>
      </div>
      <div class="slogan-box">
        <span class="slogan-label">Motto Desa</span>
        <span class="slogan-text">“${esc(ID.slogan)}”</span>
      </div>
    </div></header>
    <nav class="nav" id="nav"><div class="container">
      <button class="burger" aria-label="Menu" id="burger">Menu Menu</button>
      <ul>${MENU.map((m) => `<li><a ${m.sub ? 'class="has"' : ""} href="${m.h}" data-m="${esc(m.h)}">${esc(m.t)}</a>${m.sub ? `<ul>${m.sub.map((s) => `<li><a href="${s[1]}" ${/^http/.test(s[1]) ? 'target="_blank" rel="noopener"' : ""}>${esc(s[0])}${/^http/.test(s[1]) ? " " + SVG.external : ""}</a></li>`).join("")}</ul>` : ""}</li>`).join("")}</ul>
    </div></nav>
    <main id="main"></main>
    <footer><div class="container">
      <div class="cols">
        <div>
          <h4>Pemerintah Desa</h4>
          <p>${esc(ID.alamat)}<br>Kode Pos ${esc(ID.kodePos)}</p>
          <p><a href="${esc(ID.petaLink)}" target="_blank" rel="noopener">Buka di Google Maps ${SVG.external}</a></p>
          <p><a href="${esc(ID.websiteResmi)}" target="_blank" rel="noopener">Website Resmi Desa ${SVG.external}</a></p>
          <p><a href="../../index.html" style="color:var(--accent);font-weight:600">Portal Kecamatan Mojolaban</a></p>
        </div>
        <div>
          <h4>Jam Pelayanan Kantor</h4>
          ${ID.jam.map((j) => `<p>${esc(j)}</p>`).join("")}
        </div>
        <div>
          <h4>Keterbukaan Informasi</h4>
          ${PPID.slice(0, 4).map(([k, l]) => `<a href="#/ppid/${k}">${esc(l)}</a>`).join("")}
          <a href="#/anti-korupsi">Desa Anti Korupsi</a>
        </div>
        <div>
          <h4>Navigasi Cepat</h4>
          <a href="#/layanan">Layanan Administrasi</a>
          <a href="#/berita">Berita & Informasi</a>
          <a href="#/pengumuman">Pengumuman</a>
          <a href="#/galeri">Galeri Foto</a>
          <a href="#/data-sektoral">Data Kependudukan</a>
        </div>
      </div>
      <div class="copy">Hak Cipta © Pemerintah Desa ${esc(ID.nama)}, Kecamatan ${esc(ID.kecamatan)}, Kabupaten ${esc(ID.kabupaten)}</div>
    </div></footer>
    <button id="top" aria-label="Ke atas">${SVG.chevronUp}</button>
    <div class="lb" id="lb"><button aria-label="Tutup">×</button><div><img alt=""><p></p></div></div>`;
  }

  const head = (title, crumbs = []) => `<div class="pagehead"><div class="container"><h1>${esc(title)}</h1>
    <div class="crumb"><a href="#/">Beranda</a>${crumbs.map(([l, h]) => ` / ${h ? `<a href="${h}">${esc(l)}</a>` : esc(l)}`).join("")}</div></div></div>`;
  const wrap = (title, crumbs, inner) => head(title, crumbs) + `<div class="container">${inner}</div>`;
  const withSide = (title, crumbs, inner, items, cur, sideTitle) => head(title, crumbs) + `<div class="container"><div class="layout">${inner}
    <aside class="side"><div class="card"><h4>${esc(sideTitle)}</h4><ul>${items.map(([l, h]) => `<li><a class="${h === cur ? "on" : ""}" href="${h}">${esc(l)}</a></li>`).join("")}</ul></div></aside></div></div>`;
  const prose = (h) => `<div class="prose">${h}</div>`;
  const empty = (t, d = "") => `<div class="empty"><b>${esc(t)}</b>${esc(d)}</div>`;

  function home() {
    const nw = G.berita.slice(0, 3);
    const al = G.galeri.album, grp = G.visiMisi.gambar;
    const slides = [
      { g: FOTO_KANTOR, t: `Selamat Datang di Website Desa ${ID.nama}`, p: `${ID.sapaan}. ${ID.slogan}.`, b: "Profil Desa", h: "#/profil/tentang" },
      { g: grp, t: "Perangkat Desa Gadingan", p: "Mengenal kepala desa dan jajaran perangkat yang melayani masyarakat.", b: "Lihat Perangkat Desa", h: "#/profil/perangkat" },
      { g: al[0], t: "Layanan Administrasi Desa", p: "Pembuatan KTP, Kartu Keluarga, dan Akta Kelahiran — lihat syarat dan prosedurnya.", b: "Layanan Desa", h: "#/layanan" },
      { g: al[1], t: "Berita & Pengumuman Terbaru", p: cut(plain(nw[0].judul), 110), b: "Baca Berita", h: "#/berita/" + nw[0].slug },
    ].filter((s) => s.g);

    return `
    <div class="slider" id="slider">${slides.map((s, i) => `<div class="slide ${i ? "" : "on"}" ${bg(s.g)}><div class="container"><h2>${esc(s.t)}</h2><p>${esc(s.p)}</p><a class="btn" href="${s.h}">${esc(s.b)}</a></div></div>`).join("")}
      <button class="ctl prev" data-sl="-1" aria-label="Sebelumnya">‹</button><button class="ctl next" data-sl="1" aria-label="Berikutnya">›</button>
      <div class="dots">${slides.map((_, i) => `<i data-to="${i}" class="${i ? "" : "on"}"></i>`).join("")}</div></div>
    <div class="container">
      <section class="sec"><div class="sec-head"><h2>Layanan Desa ${esc(ID.nama)}</h2><a href="#/layanan">Layanan Lainnya →</a></div>
        <div class="grid g3">${LAY.map((l) => `<div class="card hover"><a class="svc" href="#/layanan/${l.slug}"><div class="ic">${SVG[l.slug] || SVG.file}</div><div><h3>${esc(l.judul)}</h3><p>${esc((G.layananIntro[0] || "Langkah-langkah proses pembuatannya."))}</p></div></a></div>`).join("")}</div></section>
      <section class="sec"><div class="pills">${PPID.slice(0, 4).map(([k, l]) => `<a class="pill" href="#/ppid/${k}">${esc(l)}</a>`).join("")}</div></section>
      <section class="sec"><div class="about"><div class="img" ${bg(G.visiMisi.gambar || G.beranda.hero[0])}></div>
        <div class="txt"><h2>Tentang Desa ${esc(ID.nama)}</h2>
          <p>${esc(plain(G.sejarah).split(". ").slice(0, 2).join(". ") + ".")}</p>
          <p>${esc(G.beranda.tentang)}</p><a class="btn blue" href="#/profil/tentang">Baca Selengkapnya</a></div></div></section>
      <section class="sec"><div class="sec-head"><h2>Data Kependudukan Desa ${esc(ID.nama)}</h2><a href="#/data-sektoral">Detail Kependudukan →</a></div>
        <p style="margin:0 0 12px;color:#334155">Jumlah penduduk Desa Gadingan tercatat sebanyak <strong>${nf(BPS.penduduk)} jiwa</strong>, terdiri dari <strong>${nf(BPS.laki)} laki-laki</strong> dan <strong>${nf(BPS.perempuan)} perempuan</strong> di wilayah Dusun I dan Dusun II.</p>
        <table class="tbl-plain">
          <thead>
            <tr>
              <th style="width:50px;text-align:center">No</th>
              <th style="text-align:left">Jenis Kelamin</th>
              <th style="text-align:right">Jumlah (Jiwa)</th>
              <th style="text-align:right">Persentase</th>
            </tr>
          </thead>
          <tbody>
            <tr><td align="center">1</td><td>Laki-laki</td><td align="right">${nf(BPS.laki)}</td><td align="right">50,53%</td></tr>
            <tr><td align="center">2</td><td>Perempuan</td><td align="right">${nf(BPS.perempuan)}</td><td align="right">49,47%</td></tr>
          </tbody>
          <tfoot>
            <tr><th colspan="2" align="center">Total</th><th align="right">${nf(BPS.penduduk)}</th><th align="right">100%</th></tr>
          </tfoot>
        </table>
        <p class="muted small" style="margin-top:8px">Sumber data: Laporan Kependudukan Kabupaten Sukoharjo.</p></section>
      <section class="sec"><div class="sec-head"><h2>Pengumuman</h2><a href="#/pengumuman">Pengumuman Lainnya →</a></div>
        <div class="card"><ul class="list">${G.pengumuman.map((p) => `<li><a href="#/pengumuman/${p.slug}">${esc(p.judul)}</a><span class="chip gold">${esc(p.tanggal)}</span></li>`).join("")}</ul></div></section>
      <section class="sec"><div class="sec-head"><h2>Berita Terkini</h2><a href="#/berita">Berita Lainnya →</a></div>
        <div class="grid g3">${nw.map(newsCard).join("")}</div></section>
      <section class="sec"><div class="sec-head"><h2>Galeri Foto</h2><a href="#/galeri">Lihat Semua →</a></div>${galleryGrid(galleryItems().slice(0, 6))}</section>
      ${UMKM.length ? `<section class="sec"><div class="sec-head"><h2>Rumah UMKM ${esc(ID.nama)}</h2><a href="#/umkm">Lihat Semua →</a></div><div class="grid g4">${UMKM.slice(0, 4).map(umkmCard).join("")}</div></section>` : ""}
      <section class="sec map"><div class="sec-head"><h2>Lokasi</h2><a href="${esc(ID.petaLink)}" target="_blank" rel="noopener">Buka di Google Maps ${SVG.external}</a></div>
        <iframe loading="lazy" title="Peta ${esc(ID.nama)}" src="https://www.google.com/maps?q=${encodeURIComponent(ID.petaQuery)}&output=embed"></iframe>
        <p class="muted small" style="margin-top:8px">${esc(ID.alamat)}</p></section>
    </div>`;
  }

  const newsCard = (b) => `<div class="card news hover"><a href="#/berita/${b.slug}"><div class="ph" ${bg(b.gambar)}></div></a><div class="pad">
    <div class="meta"><span class="meta-date">${SVG.calendar} ${esc(b.tanggal)}</span>${b.kategori ? `<span class="chip">${esc(b.kategori)}</span>` : ""}</div>
    <h3><a href="#/berita/${b.slug}">${esc(b.judul)}</a></h3><p class="muted small" style="margin:0">${esc(cut(plain(b.isi), 130))}</p></div></div>`;

  function galleryItems() {
    const out = G.galeri.album.map((u, i) => ({ u, c: "Dokumentasi Desa " + ID.nama + " " + (i + 1) }));
    [...G.berita, ...G.pengumuman].forEach((b) => b.gambar && out.push({ u: b.gambar, c: b.judul }));
    return out;
  }
  const galleryGrid = (items) => `<div class="gal">${items.map((g) => `<button data-lb="${esc(g.u)}" data-cap="${esc(g.c)}"><img src="${esc(g.u)}" alt="${esc(g.c)}" loading="lazy"><span>${esc(cut(g.c, 70))}</span></button>`).join("")}</div>`;

  function profil(k) {
    const cur = "#/profil/" + k;
    const title = (PROFIL.find((p) => p[0] === k) || [0, "Profil"])[1];
    let inner;
    if (k === "tentang") {
      inner = `<div class="page"><h2>Tentang Desa ${esc(ID.nama)}</h2>
        ${imgTag(G.beranda.hero[0], "cover", "Desa Gadingan")}
        ${prose(`<p>${esc(plain(G.sejarah).split(". ")[0] + ".")} Desa ${esc(ID.nama)} berada di Kecamatan ${esc(ID.kecamatan)}, Kabupaten ${esc(ID.kabupaten)}, ${esc(ID.provinsi)}.</p><p>${esc(G.visiMisi.arti[0] ? "Sebagian besar warga bermata pencaharian di bidang industri: shuttlecock, karak, kerupuk, dan ampyang." : "")}</p><p><b>Slogan:</b> ${esc(ID.slogan)}</p><p><b>Tentang website:</b> ${esc(G.beranda.tentang)}</p>`)}
        <h3 style="color:var(--primary-dark);margin-top:24px">Data Kependudukan</h3>
        <p>Berdasarkan data kependudukan resmi, jumlah penduduk Desa ${esc(ID.nama)} tercatat sebanyak <strong>${nf(BPS.penduduk)} jiwa</strong> yang terdiri dari <strong>${nf(BPS.laki)} laki-laki</strong> dan <strong>${nf(BPS.perempuan)} perempuan</strong>, terbagi dalam 2 wilayah dusun (Dusun I dan Dusun II).</p>
        <p class="muted small">Sumber data: ${esc(BPS.sumber)}.</p></div>`;
    } else if (k === "sejarah") {
      inner = `<div class="page"><h2>Sejarah Desa ${esc(ID.nama)}</h2>${prose(G.sejarah)}</div>`;
    } else if (k === "visi-misi") {
      const v = G.visiMisi;
      inner = `<div class="page">
        <h2>Visi dan Misi Desa ${esc(ID.nama)}</h2>

        <h3 style="margin-top:24px">Visi</h3>
        <p style="font-size:16.5px;font-weight:700;margin:8px 0 12px;color:var(--primary-dark)">“DESA INDUSTRI, AGAMIS DAN BERBUDAYA”</p>
        <p>${esc(v.visi)}</p>
        <ul style="line-height:1.75;margin:12px 0 24px">
          ${v.arti.map((a) => `<li style="margin-bottom:6px"><strong>${esc(a.kata)}:</strong> ${esc(a.arti)}</li>`).join("")}
        </ul>

        <h3 style="margin-top:28px">Misi</h3>
        ${v.pengantarMisi.map((p) => `<p>${esc(p)}</p>`).join("")}
        <ol style="line-height:1.75;padding-left:22px;margin-top:12px">
          ${v.misi.map((m) => `<li style="margin-bottom:10px">
            ${esc(m.judul)}
            ${m.tujuan && m.tujuan.length ? `<div class="muted small" style="margin-top:4px">Tujuan: ${esc(m.tujuan.join("; "))}</div>` : ""}
          </li>`).join("")}
        </ol>
      </div>`;
    } else {
      const [kades, ...rest] = G.perangkat;
      inner = `<div class="page"><h2>Perangkat Desa</h2>
        <div class="card" style="margin-bottom:22px"><div class="pad kades">${imgTag(kades.foto, "", kades.nama)}<div><span class="chip gold">Kepala Desa</span><h2 style="margin:8px 0 4px">${esc(kades.nama)}</h2><p class="muted">${esc(kades.jabatan)}</p><p>${esc(kades.tugas)}</p></div></div></div>
        <div class="grid g4">${rest.map((p) => `<div class="card person hover">${imgTag(p.foto, "ph", p.nama)}<div class="pad"><h3>${esc(p.nama)}</h3><div class="role">${esc(p.jabatan)}</div>${p.tugas ? `<details><summary>Tugas &amp; fungsi</summary><p>${esc(p.tugas)}</p></details>` : ""}</div></div>`).join("")}</div></div>`;
    }
    return withSide(title, [["Profil"], [title]], inner, PROFIL.map(([a, l]) => [l, "#/profil/" + a]), cur, "Profil Desa");
  }

  function layanan(slug) {
    const items = LAY.map((l) => [l.judul, "#/layanan/" + l.slug]);
    if (!slug) {
      return withSide("Layanan Desa", [["Layanan"]], `<div class="page"><h2>Layanan Desa ${esc(ID.nama)}</h2><p class="muted">${esc(G.layananIntro[0] || "Pilih layanan untuk melihat syarat dan prosesnya.")}</p>
        <div class="grid g2">${LAY.map((l) => `<div class="card hover"><a class="svc" href="#/layanan/${l.slug}"><div class="ic">${SVG[l.slug] || SVG.file}</div><div><h3>${esc(l.judul)}</h3><p>Syarat dan proses pembuatan</p></div></a></div>`).join("")}</div>
        <h3 style="color:var(--primary-dark);margin-top:26px">Jadwal Pelayanan</h3>${prose(`<ul>${ID.jam.map((j) => `<li>${esc(j)}</li>`).join("")}</ul>`)}</div>`, items, "", "Layanan");
    }
    const l = LAY.find((x) => x.slug === slug);
    if (!l) return notFound();
    return withSide(l.judul, [["Layanan", "#/layanan"], [l.judul]], `<div class="page"><h2>${esc(l.judul)}</h2>${prose(l.html.replace(/<h[1-3][^>]*>[^<]*<\/h[1-3]>/, ""))}
      <div class="note">Jadwal pelayanan kantor desa — ${ID.jam.map(esc).join(" · ")}</div></div>`, items, "#/layanan/" + slug, "Layanan");
  }
  function lembaga(slug) {
    const l = LEM.find((x) => x.slug === slug) || LEM[0];
    return withSide(l.judul.replace(/\s*\(.*\)/, ""), [["Lembaga"], [l.judul.replace(/\s*\(.*\)/, "")]], `<div class="page"><h2>${esc(l.judul)}</h2>${prose(l.html.replace(/<h[1-3][^>]*>[^<]*<\/h[1-3]>/, ""))}</div>`,
      LEM.map((x) => [x.judul.replace(/\s*\(.*\)/, ""), "#/lembaga/" + x.slug]), "#/lembaga/" + l.slug, "Lembaga Desa");
  }

  let nState = { q: "", k: "" };
  function beritaList() {
    const kats = [...new Set(G.berita.map((b) => b.kategori).filter(Boolean))];
    return wrap("Berita Desa", [["Berita"]], `<div class="page"><div style="display:grid;grid-template-columns:1fr auto;gap:12px;margin-bottom:18px">
      <input class="search" id="nq" placeholder="Cari berita…" value="${esc(nState.q)}"><div class="tabs" style="margin:0"><button data-k="" class="${nState.k ? "" : "on"}">Semua</button>${kats.map((k) => `<button data-k="${esc(k)}" class="${nState.k === k ? "on" : ""}">${esc(k)}</button>`).join("")}</div></div>
      <div class="grid g3" id="nlist">${beritaRows()}</div></div>`);
  }
  function beritaRows() {
    const q = nState.q.toLowerCase();
    const r = G.berita.filter((b) => (!nState.k || b.kategori === nState.k) && (!q || (b.judul + " " + plain(b.isi)).toLowerCase().includes(q)));
    return r.length ? r.map(newsCard).join("") : `<div style="grid-column:1/-1">${empty("Berita tidak ditemukan", "Coba kata kunci atau kategori lain.")}</div>`;
  }
  function post(kind, slug) {
    const arr = kind === "berita" ? G.berita : G.pengumuman;
    const b = arr.find((x) => x.slug === slug);
    if (!b) return notFound();
    const url = encodeURIComponent(ID.websiteResmi + kind + "/detail/" + b.slug);
    const lain = arr.filter((x) => x.slug !== slug).slice(0, 5);
    const label = kind === "berita" ? "Berita" : "Pengumuman";
    return head(b.judul, [[label, "#/" + kind], [cut(b.judul, 40)]]) + `<div class="container"><div class="layout"><article class="page">
      <div class="news"><div class="meta"><span class="meta-date">${SVG.calendar} ${esc(b.tanggal)}</span>${b.kategori ? `<span class="chip">${esc(b.kategori)}</span>` : ""}</div></div>
      ${imgTag(b.gambar, "cover", b.judul)}${prose(b.isi)}
      ${b.tag.length ? `<p style="margin-top:18px">${b.tag.map((t) => `<span class="chip">#${esc(t)}</span>`).join(" ")}</p>` : ""}
      <p style="margin-top:18px"><a class="btn sm blue" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(b.judul)}%20${url}">Bagikan via WhatsApp</a> <a class="btn sm line" href="#/${kind}">← Kembali</a></p></article>
      <aside class="side"><div class="card"><h4>${label} Lainnya</h4><ul>${lain.map((x) => `<li><a href="#/${kind}/${x.slug}">${esc(cut(x.judul, 70))}<br><small class="muted">${esc(x.tanggal)}</small></a></li>`).join("")}</ul></div></aside></div></div>`;
  }
  function pengumumanList() {
    return wrap("Pengumuman", [["Pengumuman"]], `<div class="page"><div class="grid g2">${G.pengumuman.map(newsCard).join("").replace(/#\/berita\//g, "#/pengumuman/")}</div></div>`);
  }

  function kontak() {
    const wa = ID.whatsapp;
    return wrap("Alamat & Kontak", [["Alamat & Kontak"]], `<div class="layout"><div class="page"><h2>Kantor Desa ${esc(ID.nama)}</h2>
      ${imgTag(FOTO_KANTOR, "cover", "Kantor Desa Gadingan")}
      <div class="kv"><div>Alamat</div><div>${esc(ID.alamat)}</div><div>Kode Pos</div><div>${esc(ID.kodePos)}</div>
        <div>WhatsApp Pelayanan</div><div>${wa ? `<a href="https://wa.me/${wa}" target="_blank" rel="noopener">+${wa.replace(/^62/, "62 ").replace(/(\d{3})(\d{4})(\d+)$/, "$1-$2-$3")}</a>` : "Belum tersedia"}</div>
        <div>Email Resmi</div><div><a href="mailto:${EMAIL}">${EMAIL}</a></div>
        <div>Lokasi Peta</div><div><a href="${MAPS_SHORT}" target="_blank" rel="noopener">Buka Google Maps ${SVG.external}</a></div>
        <div>Jam Pelayanan</div><div>${ID.jam.map(esc).join("<br>")}</div>
        <div>Website Resmi</div><div><a href="${esc(ID.websiteResmi)}" target="_blank" rel="noopener">${esc(ID.websiteResmi)} ${SVG.external}</a></div></div>
      <div class="map" style="margin-top:22px"><iframe loading="lazy" title="Peta Kantor Desa ${esc(ID.nama)}" src="https://www.google.com/maps?q=${encodeURIComponent(ID.petaQuery)}&output=embed"></iframe></div></div>
      <aside class="side"><div class="card"><h4>Pertanyaan & Keluhan</h4><div class="pad"><p class="small muted" style="margin-top:0">Sampaikan aspirasi secara langsung kepada aparatur desa.</p><a class="btn blue sm" href="#/suara-warga">Buka Suara Warga</a></div></div></aside></div>`);
  }
  function galeri() {
    const it = galleryItems();
    return wrap("Galeri Foto", [["Galeri"]], `<div class="page"><h2>Galeri Foto &amp; Kegiatan</h2>${galleryGrid(it)}<p class="muted small" style="margin-top:12px">${it.length} foto dari dokumentasi desa.</p></div>`);
  }
  const umkmCard = (u) => `<div class="card umkm hover"><div class="ph" ${bg(u.foto)}></div><div class="pad">
    ${u.kategori ? `<span class="chip">${esc(u.kategori)}</span>` : ""}<h3 style="margin:8px 0 4px;color:var(--primary-dark);font-size:17px">${esc(u.nama)}</h3>
    ${u.pemilik ? `<div class="muted small">Pemilik: ${esc(u.pemilik)}</div>` : ""}<p class="small" style="margin:8px 0">${esc(cut(u.deskripsi || "", 110))}</p>
    ${(u.produk || []).slice(0, 3).map((p) => `<div class="small">• ${esc(p.nama)} ${p.harga ? `<b>${esc(p.harga)}</b>` : ""}</div>`).join("")}
    ${u.alamat ? `<div class="muted small" style="margin-top:6px">${SVG.mapPin} ${esc(u.alamat)}</div>` : ""}
    ${u.whatsapp ? `<p style="margin:12px 0 0"><a class="btn sm blue" target="_blank" rel="noopener" href="https://wa.me/${esc(u.whatsapp)}">Hubungi via WhatsApp</a></p>` : ""}</div></div>`;

  let uState = { q: "", k: "" };
  function umkm() {
    const cats = [...new Set(UMKM.map((u) => u.kategori).filter(Boolean))];
    return wrap("Rumah UMKM " + ID.nama, [["Rumah UMKM"]], `<div class="page"><h2>Rumah UMKM Desa ${esc(ID.nama)}</h2>${UMKM.length ? `<div style="display:grid;grid-template-columns:1fr auto;gap:12px;margin-bottom:18px"><input class="search" id="uq" placeholder="Cari usaha atau produk…" value="${esc(uState.q)}">
        <div class="tabs" style="margin:0"><button data-u="" class="${uState.k ? "" : "on"}">Semua</button>${cats.map((c) => `<button data-u="${esc(c)}" class="${uState.k === c ? "on" : ""}">${esc(c)}</button>`).join("")}</div></div><div class="grid g3" id="ulist">${umkmRows()}</div>` : ""}</div>`);
  }
  function umkmRows() {
    const q = uState.q.toLowerCase();
    const r = UMKM.filter((u) => (!uState.k || u.kategori === uState.k) && (!q || JSON.stringify(u).toLowerCase().includes(q)));
    return r.length ? r.map(umkmCard).join("") : `<div style="grid-column:1/-1">${empty("Usaha tidak ditemukan")}</div>`;
  }
  function suara() {
    return wrap("Suara Warga", [["Suara Warga"]], `<div class="layout"><div class="page"><h2>Pertanyaan &amp; Keluhan</h2>
      <p class="muted">Isi formulir, lalu pesan dibuka di WhatsApp ke nomor pelayanan resmi desa.</p>
      <form id="sw"><div class="field"><label>Nama Lengkap</label><input name="n" required></div>
      <div class="field"><label>Judul / Pokok Masukan</label><input name="j" required></div>
      <div class="field"><label>Isi Pertanyaan / Keluhan</label><textarea name="i" rows="5" required></textarea></div>
      <button class="btn blue">Kirim via WhatsApp</button></form></div>
      <aside class="side"><div class="card"><h4>Layanan Pengaduan</h4><div class="pad small">Pengaduan masyarakat di website resmi:<br><a href="${esc(ID.websiteResmi)}pengaduan" target="_blank" rel="noopener">Pengaduan Masyarakat ${SVG.external}</a></div></div></aside></div>`);
  }

  function ppid(k) {
    const p = G.halaman[k];
    if (!p) return notFound();
    return withSide(p.judul || "Informasi Publik", [["Informasi Publik"], [p.judul]], `<div class="page"><h2>${esc(p.judul)}</h2>${prose(p.html.replace(/<h[1-3][^>]*>[^<]*<\/h[1-3]>/, ""))}</div>`,
      PPID.map(([a, l]) => [l, "#/ppid/" + a]), "#/ppid/" + k, "Informasi Publik");
  }
  function antiKorupsi(k) {
    const items = DAK.map(([a, l]) => [l, "#/anti-korupsi/" + a]);
    if (!k) return withSide("Desa Anti Korupsi", [["Desa Anti Korupsi"]], `<div class="page"><h2>Desa Anti Korupsi</h2><p class="muted">Dokumen transparansi tata kelola dan pencegahan korupsi.</p><div class="grid g2">${DAK.map(([a, l]) => `<a class="card hover svc" href="#/anti-korupsi/${a}"><div class="ic">${SVG.shield}</div><div><h3>${esc(l)}</h3></div></a>`).join("")}</div></div>`, items, "", "Desa Anti Korupsi");
    const p = G.halaman[k];
    if (!p) return notFound();
    return withSide(p.judul, [["Desa Anti Korupsi", "#/anti-korupsi"], [p.judul]], `<div class="page"><h2>${esc(p.judul)}</h2>${prose(p.html.replace(/<h[1-3][^>]*>[^<]*<\/h[1-3]>/, ""))}</div>`, items, "#/anti-korupsi/" + k, "Desa Anti Korupsi");
  }
  function apbdes() {
    const a = G.halaman["info-apbdes"], d = G.halaman["apbdes-dokumen"];
    return wrap("Info APBDes", [["Info APBDes"]], `<div class="page"><h2>${esc(a.judul)}</h2>${prose(a.html.replace(/<h[1-3][^>]*>[^<]*<\/h[1-3]>/, ""))}
      <h3 style="color:var(--primary-dark);margin-top:26px">${esc(d.judul)}</h3>${empty("Belum ada dokumen yang dipublikasikan", "Daftar dokumen APBDes pada website desa saat ini masih kosong.")}</div>`);
  }
  function perdes() {
    const p = G.halaman.perdes;
    return wrap("Produk Hukum", [["Produk Hukum"]], `<div class="page"><h2>${esc(p.judul)}</h2>${empty("Belum ada produk hukum yang dipublikasikan", "Daftar produk hukum pada website desa saat ini masih kosong.")}</div>`);
  }

  function sektoral() {
    const total = BPS.penduduk || 6580;
    const l = BPS.laki || 3325;
    const p = BPS.perempuan || 3255;
    const pctL = ((l / total) * 100).toFixed(2).replace(".", ",");
    const pctP = ((p / total) * 100).toFixed(2).replace(".", ",");

    return wrap("Data Sektoral", [["Data Sektoral"]], `<div class="page">
      <h2>Data Kependudukan Desa ${esc(ID.nama)}</h2>
      <p style="margin:14px 0 20px;line-height:1.65;color:#334155">
        Berdasarkan Laporan Kependudukan resmi Pemerintah Kabupaten Sukoharjo, jumlah penduduk Desa Gadingan, Kecamatan Mojolaban tercatat sebanyak <strong>${nf(total)} jiwa</strong> yang terdiri dari <strong>${nf(l)} laki-laki</strong> dan <strong>${nf(p)} perempuan</strong>.
      </p>

      <h3 style="margin:20px 0 10px;font-size:16.5px;color:var(--primary-dark)">Rekapitulasi Jumlah Penduduk</h3>
      <table class="tbl-plain">
        <thead>
          <tr>
            <th style="width:60px;text-align:center">No</th>
            <th style="text-align:left">Jenis Kelamin</th>
            <th style="text-align:right">Jumlah (Jiwa)</th>
            <th style="text-align:right">Persentase</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align:center">1</td>
            <td>Laki-laki</td>
            <td style="text-align:right"><b>${nf(l)}</b></td>
            <td style="text-align:right">${pctL}%</td>
          </tr>
          <tr>
            <td style="text-align:center">2</td>
            <td>Perempuan</td>
            <td style="text-align:right"><b>${nf(p)}</b></td>
            <td style="text-align:right">${pctP}%</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="2" style="text-align:center">Total Penduduk</th>
            <th style="text-align:right">${nf(total)}</th>
            <th style="text-align:right">100,00%</th>
          </tr>
        </tfoot>
      </table>

      <p style="margin-top:16px;font-size:13.5px;color:var(--muted)">
        Sumber data: Laporan Kependudukan Kabupaten Sukoharjo (<a href="${esc(BPS.sumberUrl || "http://sukoharjokab.go.id/laporan_kependudukan/jiwa/rekap/8/")}" target="_blank" rel="noopener">sukoharjokab.go.id/laporan_kependudukan/jiwa/rekap/8/</a>)
      </p>
    </div>`);
  }

  const notFound = () => wrap("Halaman tidak ditemukan", [], `<div class="page">${empty("Halaman tidak ditemukan", "Periksa alamat atau kembali ke beranda.")}<p style="text-align:center"><a class="btn blue" href="#/">Ke Beranda</a></p></div>`);

  function route() {
    const [a, b] = location.hash.replace(/^#\/?/, "").split("/");
    switch (a || "") {
      case "": return home();
      case "profil": return profil(b || "tentang");
      case "kontak": return kontak();
      case "layanan": return layanan(b);
      case "lembaga": return lembaga(b);
      case "berita": return b ? post("berita", b) : beritaList();
      case "pengumuman": return b ? post("pengumuman", b) : pengumumanList();
      case "galeri": return galeri();
      case "umkm": return umkm();
      case "suara-warga": return suara();
      case "ppid": return ppid(b || "ppid-berkala");
      case "anti-korupsi": return antiKorupsi(b);
      case "apbdes": return apbdes();
      case "perdes": return perdes();
      case "data-sektoral": return sektoral();
      default: return notFound();
    }
  }

  let cur = 0, timer;
  const slides = () => $$(".slide");
  function show(i) {
    const s = slides(); if (!s.length) return;
    cur = (i + s.length) % s.length;
    s.forEach((x, k) => x.classList.toggle("on", k === cur));
    $$(".dots i").forEach((x, k) => x.classList.toggle("on", k === cur));
  }
  function startSlider() { clearInterval(timer); cur = 0; if ($("#slider")) timer = setInterval(() => show(cur + 1), 6000); }

  function render() {
    $("#main").innerHTML = route();
    const key = (location.hash.replace(/^#\/?/, "").split("/")[0] || "");
    $$(".nav > .container > ul > li > a").forEach((el) => {
      const m = (el.dataset.m || "").replace(/^#\/?/, "").split("/")[0];
      el.classList.toggle("on", m === key || (key === "lembaga" && m === "profil"));
    });
    $("#nav").classList.remove("open");
    window.scrollTo({ top: 0 });
    document.title = (key ? $(".pagehead h1")?.textContent + " | " : "") + `Desa ${ID.nama}, Kec. ${ID.kecamatan}`;
    startSlider();
  }

  document.getElementById("app").innerHTML = chrome();
  render();
  window.addEventListener("hashchange", render);

  document.addEventListener("click", (e) => {
    const t = e.target;
    const sl = t.closest("[data-sl]"); if (sl) { show(cur + Number(sl.dataset.sl)); return; }
    const dt = t.closest("[data-to]"); if (dt) { show(Number(dt.dataset.to)); return; }
    if (t.closest("#burger")) { $("#nav").classList.toggle("open"); return; }
    const hasSub = t.closest(".nav a.has");
    if (hasSub && window.innerWidth <= 860) { e.preventDefault(); hasSub.parentElement.classList.toggle("open"); return; }
    const lb = t.closest("[data-lb]");
    if (lb) { const box = $("#lb"); $("img", box).src = lb.dataset.lb; $("p", box).textContent = lb.dataset.cap; box.classList.add("on"); return; }
    if (t.closest("#lb")) { $("#lb").classList.remove("on"); return; }
    const k = t.closest("[data-k]"); if (k && $("#nlist")) { nState.k = k.dataset.k; $$("[data-k]").forEach((b) => b.classList.toggle("on", b === k)); $("#nlist").innerHTML = beritaRows(); return; }
    const u = t.closest("[data-u]"); if (u && $("#ulist")) { uState.k = u.dataset.u; $$("[data-u]").forEach((b) => b.classList.toggle("on", b === u)); $("#ulist").innerHTML = umkmRows(); return; }
    if (t.closest("#top")) window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.addEventListener("input", (e) => {
    if (e.target.id === "nq") { nState.q = e.target.value; $("#nlist").innerHTML = beritaRows(); }
    if (e.target.id === "uq") { uState.q = e.target.value; $("#ulist").innerHTML = umkmRows(); }
  });
  document.addEventListener("submit", (e) => {
    if (e.target.id !== "sw") return;
    e.preventDefault();
    const f = new FormData(e.target);
    const msg = `*Suara Warga - Desa ${ID.nama}*\nNama: ${f.get("n")}\nJudul: ${f.get("j")}\n\n${f.get("i")}`;
    window.open(`https://wa.me/${ID.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  });
  window.addEventListener("scroll", () => $("#top").classList.toggle("on", window.scrollY > 400), { passive: true });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") $("#lb").classList.remove("on"); });
})();
