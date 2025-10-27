import React, {useEffect, useState} from "react"
import axios from 'axios'

export default function CreateProdi(){
    //Inisialisasi state untuk menyimpan nama prodi
    const [namaMenu, setNamaMenu] = useState("");

    //Inisialisasi state untuk menyimpan ID Fakultas yang dipilih
    const [kategoriId, setKategoriId] = useState("");

    //Inisialisasi state untuk menyimpan daftar fakultas
    const [kategoriList, setKategoriList] = useState([]);

    //Inisialisasi state untuk menyimpan pesan error
    const [error, setError] = useState("");

    //Inisialisasi state untuk menyimpan pesan success
    const [success, setSuccess] = useState("");

    //Mengambil daftar fakultas dari API saat komponen dibuat
    useEffect(() => {
        const fetchKategori = async () => {
            try {
                const response = await axios.get(
                    "https://if-3-bweb-2-3jhi2cajq-justyns-projects-2b70edcb.vercel.app/api/api/kategori"
                );
                setKategoriList(response.data); //Simpan data fakultas ke dalam state
            } catch (error) {
                setError("Failed to fetch kategori data");
            }
        };
        fetchKategori(); //Panggil fungsi untuk mengambil data fakultas
    }, []); //Kosongkan array dependensi agar hanya dijalankan sekali saat komponen dimuat

    //Fungsi yang akan dijalankan saat form disubmit
    const handleSubmit = async (e) => {
        e.preventDefault(); //Mencegah reload halaman setelah form disubmit
        setError(""); //Reset pesan error sebelum proses
        setSuccess(""); //Reset pesan success sebelum proses

    //Validasi input: jika namaprodi kosong, set pesan error
    if (namaMenu.trim() === "" || kategoriId.trim() === ""){
        setError("Nama Menu and Kategori are required"); //Set pesan error jika input kosong
        return; //Stop eksekusi fungsi jika input tidak valid
    }
    try {
        //Melakukan HTTP POST request untuk menyimpan data prodi
        const response = await axios.post(
            "https://if-3-bweb-2-3jhi2cajq-justyns-projects-2b70edcb.vercel.app/api/api/menu", //Endpoint API yang dituju
            {
                nama: namaMenu, //Data nama prodi
                kategori_id: kategoriId //Data id fakultas yang dipilih
            }
        );
        //Jika response HTTP status 201 (Created), berarti berhasil
        if(response.status === 201) {
            //Tampilkan pesan sukses jika prodi berhasil dibuat
            setSuccess("Menu Berhasil Dibuat");
            setNamaMenu("") //Kosongkan input form setelah success di submit
            setKategoriId(""); //Kosongkan dropdown setelah success di submit
        } else {
            //Jika tidak berhasil, tampilkan pesan error 
            setError("Failed To Create Prodi")
        }
    } catch (error){
        //Jika terjadi error (misal masalah jaringan), tampilkan pesan error
        setError("An error occured while creating prodi")
     }   
    };

    return (
  <div className="container mt-5">
    <h2 className="mb-4">Create Menu</h2>
    {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
    {error && <div className="alert alert-danger">{error}</div>}
    {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
    {success && <div className="alert alert-success">{success}</div>}

    <form onSubmit={handleSubmit}>
      {/* Tangani event submit dengan handleSubmit */}
      <div className="mb-3">
        {/* Margin bottom pada div untuk jarak antar elemen */}
        <label className="form-label">Nama Menu</label>
        {/* Input untuk nama prodi dengan class bootstrap untuk styling */}
        <input
          type="text" className="form-control" id="namaProdi"
          value={namaProdi} // Nilai input disimpan di state namaprodi
          onChange={(e) => setNamaKategori(e.target.value)} // Update state saat input berubah
          placeholder="Enter Prodi Name" // Placeholder teks untuk input
        />
      </div>
<div className="mb-3">
  <label className="form-label">Kategori</label>
  {/* Dropdown untuk memilih fakultas */}
  <select
    className="form-select"
    id="kategoriId"
    value={kategoriId} // Nilai dropdown disimpan di state fakultasId
    onChange={(e) => setKategoriId(e.target.value)} // Update state saat pilihan berubah
  >
    <option value="">Select Kategori</option>
    {kategoriList.map((kategori) => (
      <option key={kategori.id} value={kategori.id}>
        {/* Set key dan value untuk masing-masing fakultas */}
        {kategori.nama} {/* Nama fakultas sebagai teks di dropdown */}
      </option>
    ))}
  </select>
</div>
{/* Tombol submit dengan class bootstrap */}
<button type="submit" className="btn btn-primary">
  Create
</button>   
    </form>
  </div>
);
}