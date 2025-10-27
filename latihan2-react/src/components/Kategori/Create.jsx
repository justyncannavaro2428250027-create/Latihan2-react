import React, {useEffect, useState} from "react"
import axios from 'axios'

export default function CreateFakultas(){
    //Inisialisasi state untuk menyimpan nama fakultas
    const [namaKategori, setNamaKategori] = useState("");

    //Inisialisasi state untuk menyimpan pesan error
    const [error, setError] = useState("");

    //Inisialisasi state untuk menyimpan pesan success
    const [success, setSuccess] = useState("");

    //Fungsi yang akan dijalankan saat form disubmit
    const handleSubmit = async (e) => {
        e.preventDefault(); //Mencegah reload halaman setelah form disubmit
        setError(""); //Reset pesan error sebelum proses
        setSuccess(""); //Reset pesan success sebelum proses

    //Validasi input: jika namaKategori kosong, set pesan error
    if (namaKategori.trim() === ""){
        setError("Nama Kategori is required"); //Set pesan error jika input kosong
        return; //Stop eksekusi fungsi jika input tidak valid
    }
    try {
        //Melakukan HTTP POST request untuk menyimpan data fakultas
        const response = await axios.post(
            "https://if-3-bweb-2-3jhi2cajq-justyns-projects-2b70edcb.vercel.app/api/api/kategori", //Endpoint API yang dituju
            {
                nama: namaKategori, //Data yang dikirim berupa objek JSON dengan properti 'nama'
            }
        );
        //Jika response HTTP status 201 (Created), berarti berhasil
        if(response.status === 201) {
            //Tampilkan pesan sukses jika fakultas berhasil dibuat
            setSuccess("Kategori Berhasil Dibuat");
            setNamaKategori("") //Kosongkan input form setelah success di submit
        } else {
            //Jika tidak berhasil, tampilkan pesan error 
            setError("Failed To Create Kategori")
        }
    } catch (error){
        //Jika terjadi error (misal masalah jaringan), tampilkan pesan error
        setError("An error occured while creating kategori")
     }   
    };

    return (
  <div className="container mt-5">
    <h2 className="mb-4">Create Kategori</h2>
    {/* Jika ada pesan error, tampilkan dalam alert bootstrap */}
    {error && <div className="alert alert-danger">{error}</div>}
    {/* Jika ada pesan sukses, tampilkan dalam alert bootstrap */}
    {success && <div className="alert alert-success">{success}</div>}

    {/* Form untuk mengisi nama fakultas */}
    <form onSubmit={handleSubmit}>
      {/* Tangani event submit dengan handleSubmit */}
      <div className="mb-3">
        {/* Margin bottom pada div untuk jarak antar elemen */}
        <label className="form-label">Nama Kategori</label>
        {/* Input untuk nama fakultas dengan class bootstrap untuk styling */}
        <input
          type="text" className="form-control" id="namaKategori"
          value={namaKategori} // Nilai input disimpan di state namaKategori
          onChange={(e) => setNamaKategori(e.target.value)} // Update state saat input berubah
          placeholder="Enter Fakultas Name" // Placeholder teks untuk input
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  </div>
);
}