import React, {useState, useEffect} from "react"; //Mengimpor React, useState, dan useEffect dari library React
import { useParams, useNavigate } from "react-router-dom"; //Menimpor useParams dan useNavigate dari react-router-dom untuk menangani parameter navigasi
import axios from "axios"; //Mengimpor axios untuk melakukan request HTTP

export default function Edit() {
    const { id } = useParams(); //Mengambil parameter "id" dari URL mengggunakan useParams
    const navigate = useNavigate(); //Menggunakan useNavigate untuk navigasi setelah proses selesai
    const [nama, setNama] = useState(""); //Menginisialisasi state 'nama' untuk menyimpan nama prodi
    const [kategori, setKategori] = useState("")
    const [kategoriList, setKategoriList] = useState([])
    const [error, setError] = useState(null); //Menginisialisasi state 'error' untuk menyimpan pesan error jika ada
    
    //Mengambil data prodi berdasarkan id ketika komponen pertama kali di muat
    useEffect( () => {
        axios
        .get(`https://if-3-bweb-2-3jhi2cajq-justyns-projects-2b70edcb.vercel.app/api/api/menu/${id}`) //Mengirimkan request GET untuk mendapatkan data prodi berdasarkan id
        .then( (response) => {
            setNama(response.data.nama)
            setKategori(response.data.kategori.id)
        })
        .catch( (error) => {
            console.error("Error fetching data", error)
            setError("Data tidak ditemukan")
        })

        axios
        .get(`https://if-3-bweb-2-3jhi2cajq-justyns-projects-2b70edcb.vercel.app/api/api/kategori`) //Mengirimkan request GET untuk mendapatkan data prodi berdasarkan id
        .then( (response) => {
            setKategoriList(response.data)
        })
        .catch( (error) => {
            console.error("Error fetching kategori data", error)
        })

    }, [id])
    

    //Menghandle perubahan input saat pengguna mengetik di form\
    const handleChange = (e) => {
        setNama(e.target.value)
    }

      const handleFakultasChange = (e) => {
        setKategori(e.target.value)
    }

    //Menghandle submit form untuk mengedit data prodi
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
        .patch(`https://if-3-bweb-2-3jhi2cajq-justyns-projects-2b70edcb.vercel.app/api/api/menu${id}`, {nama, fakultas_id: kategori})
        .then( (response) => {
            navigate("/menu")
        })
        .catch( (error) => {
            console.error("Error updating data:", error)
            setError("Gagal menggupdate data")
        })
    }
    return (
        <div>
            <h2>Edit Menu</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nama" className="form-label">Nama Menu</label>
                    <input 
                    type="text"
                    className="form-control"
                    id="nama"
                    value={nama}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fakultass" className="form-label">Nama Kategori</label>
                    <select className="form-select" id="kategori" value={kategori}
                    onChange={handleFakultasChange}
                    required
                    >
                        <option value="">Pilih Fakultas</option>
                        {kategoriList.map(
                            (kategori) => (
                                <option key={kategori.id} value={kategori.id}>
                                    {kategori.nama}
                                </option>
                            )
                        )}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}