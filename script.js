//produk dengan objek literal {}
const produk1 = {id: 1, nama: "Buku Gambar", harga: 15000, stok: 17};
const produk2 = {id: 2, nama: "Pensil Mekanik", harga: 5000, stok: 23};
const produk3 = {id: 3, nama: "Cat Air", harga: 27000, stok: 7};

//produk dengan new object
const produk4 = new Object();
produk4.id = 4;
produk4.nama = "Penghapus Clay";
produk4.harga = 3000;
produk4.stok = 0;

const produk5 = new Object();
produk5.id = 5;
produk5.nama = "Spidol Warna";
produk5.harga = 13000;
produk5.stok = 10;

const produk6 = new Object();
produk6.id = 6;
produk6.nama = "Kuas Gambar";
produk6.harga = 22000;
produk6.stok = 15;

const daftarProduk = [produk1, produk2, produk3, produk4, produk5, produk6];
const keranjang = [];

const daftarProdukContainer = document.getElementById("daftar-produk");

function tampilProduk() {
    daftarProdukContainer.innerHTML = "";

    for(let i = 0; i < daftarProduk.length; i++) {
        const produk = daftarProduk[i];

        const card = document.createElement("div");
        card.className = "produk-card";

        const namaProduk = document.createElement("h3");
        const textNamaProduk = document.createTextNode(produk.nama);
        namaProduk.appendChild(textNamaProduk);

        const hargaProduk = document.createElement("p");
        const textHargaProduk = document.createTextNode("Harga: Rp " + produk.harga.toLocaleString('id-ID'));
        hargaProduk.appendChild(textHargaProduk);

        const stokProduk = document.createElement("p");
        const textStokProduk = document.createTextNode("Stok: " + produk.stok);
        stokProduk.appendChild(textStokProduk);

        if(produk.stok === 0) {
            card.style.backgroundColor = "#e8f5e9";
            card.style.borderColor = "#c8e6c9";
            stokProduk.style.color = "#d32f2f";
            stokProduk.innerHTML = "Stok Habis";
            stokProduk.style.fontWeight = "bold";
        }

        const buttonTambah = document.createElement("button");
        const textButtonTambah = document.createTextNode("Tambah ke Keranjang");
        buttonTambah.appendChild(textButtonTambah);
        buttonTambah.onclick = function() {
            tambahKeKeranjang(produk.id);
        };

        card.appendChild(namaProduk);
        card.appendChild(hargaProduk);
        card.appendChild(stokProduk);
        card.appendChild(buttonTambah);

        daftarProdukContainer.appendChild(card);
        
    }
}

function tambahKeKeranjang(idProduk) {
    let produkDiCari = null;

    for(let i = 0; i < daftarProduk.length; i++) {
        if(daftarProduk[i].id === idProduk) {
            produkDiCari = daftarProduk[i];
            break;
        }
    }

    if(produkDiCari.stok <= 0) {
        alert("Maaf, stok produk " + produkDiCari.nama + " ini sudah habis :(");
        return;
    }

    produkDiCari.stok -= 1;
    keranjang.push(produkDiCari);

    tampilProduk();
    tampilKeranjang();
}

function tampilKeranjang() {
    const listKeranjang = document.querySelector("#daftar-keranjang");
    listKeranjang.innerHTML = "";

    for(let i = 0; i < keranjang.length; i++) {
        const produk = keranjang[i];

        const li = document.createElement("li");
        const textLi = document.createTextNode(produk.nama + " - Rp " + produk.harga.toLocaleString('id-ID'));
        li.appendChild(textLi);

        const buttonHapus = document.createElement("button");
        buttonHapus.className = "button-hapus";
        buttonHapus.appendChild(document.createTextNode("Hapus"));
        buttonHapus.onclick = function() {
            hapusItemKeranjang(i);
        };
        li.appendChild(buttonHapus);
        listKeranjang.appendChild(li);
    }
    hitungTotalHarga();
}

function hapusItemKeranjang(index) {
    const konfirmasi = window.confirm("Apakah Anda yakin ingin menghapus item ini dari keranjang?");
    if(konfirmasi) {
        const produkDiHapus = keranjang[index];
        produkDiHapus.stok += 1;
        keranjang.splice(index, 1);
        tampilProduk();
        tampilKeranjang();
    }
}

function batalItemTerakhir() {
    if(keranjang.length === 0) {
        alert("Keranjang kosong, tidak ada item untuk dibatalkan.");
        return;
    }
    const konfirmasi = window.confirm("Apakah Anda yakin ingin membatalkan item terakhir yang ditambahkan ke keranjang?");
    if(konfirmasi) {
        const produkDiBatal = keranjang.pop();
        produkDiBatal.stok += 1;
        tampilProduk();
        tampilKeranjang();
    }
}

function batalSemuaItem() {
    if(keranjang.length === 0) {
        alert("Keranjang kosong, tidak ada item untuk dibatalkan.");
        return;
    }
    const konfirmasi = window.confirm("Apakah Anda yakin ingin membatalkan semua item di keranjang?");
    if(konfirmasi) {
        for(let i = keranjang.length - 1; i >= 0; i--) {
            const produkDiBatal = keranjang[i];
            produkDiBatal.stok += 1;
        }
        keranjang.length = 0;
        tampilProduk();
        tampilKeranjang();
    }
}

function hitungTotalHarga() {
    let totalHarga = 0;

    for(let i = 0; i < keranjang.length; i++) {
        totalHarga += keranjang[i].harga;
    }

    const totalProdukElement = document.getElementById("total-item");
    const totalHargaElement = document.getElementById("total-harga");

    if(totalProdukElement && totalHargaElement) {
        totalProdukElement.innerHTML = keranjang.length;
        totalHargaElement.innerHTML = totalHarga.toLocaleString('id-ID');
    }
}

function checkout() {
    if(keranjang.length === 0) {
        alert("Keranjang kosong, tidak ada item untuk dibeli.");
        return;
    }

    const nama = prompt("Masukkan nama Anda untuk checkout:");
    if(nama !== null && nama.trim() !== "") {
        let totalBayar = 0;
        const hitungItem = {};

        for(let i = 0; i < keranjang.length; i++) {
            const namaProduk = keranjang[i].nama;
            totalBayar += keranjang[i].harga;

            if(hitungItem[namaProduk]) {
                hitungItem[namaProduk]++;
            } else {
                hitungItem[namaProduk] = 1;
            }
        }

        const daftarRingkasan = [];
        for(const namaProduk in hitungItem) {
            daftarRingkasan.push(`${namaProduk} (${hitungItem[namaProduk]})`);
        }
        const itemList = daftarRingkasan.join(", ");
        const ringkasan = document.getElementsByClassName("container-ringkasan")[0];
        
        ringkasan.innerHTML = `
            <h3>Ringkasan Pesanan</h3>
            <p><strong>Nama Pembeli</strong><span>:</span> <span>${nama}</span></p>
            <p><strong>Item yang Dibeli</strong><span>:</span> <span>${itemList}</span></p>
            <p><strong>Total Bayar</strong><span>:</span> <span>Rp ${totalBayar.toLocaleString("id-ID")}</span></p>
            <p style="color: #2e7d32; font-weight: bold; margin-top: 8px;">Terima kasih telah berbelanja di toko kami!</p>
        `;

        keranjang.length = 0;
        tampilKeranjang();
    } else if(nama !== null) {
        alert("Nama tidak boleh kosong. Silakan coba lagi.");
    }
}

tampilProduk();
