import React, {useEffect, useState} from "react"
import axios from 'axios'
import { NavLink } from "react-router-dom"
import Swal from "sweetalert2"

export default function List(){

    //state Menu untuk menyimpan data response API Menu
    const [Menu, setMenu] = useState([])

    //panggil API Menu menggunakan useEffect dan axios
    useEffect( ()=> {
        axios
        .get("https://if-3-bweb-2-3jhi2cajq-justyns-projects-2b70edcb.vercel.app/api/api/menu")
        .then((response) =>{
            console.log(response.data);
            setMenu(response.data);
        })
    }, [])
    
    const handleDelete = (id, nama) => (
        Swal.fire({
        title:"Are you sure?",
        text: `You won't be able to revert this! Menu: ${nama}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
        }).then((result) => {
        if (result.isConfirmed) {
            //Lakukan Penghapusan jika di konfirmasi
            axios.delete(`https://if-3-bweb-2-3jhi2cajq-justyns-projects-2b70edcb.vercel.app/api/api/menu/${id}`)
            .then((response) => {
                //Hapus Menu dari state setelah sukses dihapus dari server
                setMenu(Menu.filter((Menu) => Menu.id !== id))
                //Tampilkan notifikasi sukses 
                Swal.fire("Deleted!", "Your data has been deleted.", "success")
            })
            .catch((error) => {
                console.error("Error deleting data: ", error);
                Swal.fire(
                    "Error",
                    "There was an issue deleting the data",
                    "error"
                );
            });
        }
    })
)

        return (
            <div>
            <h2>List Menu</h2>
            <NavLink to='create' className="btn btn-primary wb-3 btn-sm">Create</NavLink>
            <table className="table table-striped">
            <thead>
                <tr>
                    <th>Nama Menu</th>
                    <th>Nama Kategori</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {Menu.map( (data) => (
                    <tr key={data.id}>
                        <td>{data.nama}</td>
                        <td>{data.kategori.nama}</td>
                        <td>
                            <button onClick={() => handleDelete(data.id, data.nama)}
                            className="btn btn-danger btn-sm">Hapus</button>

                            <NavLink to={`edit/${data.id}`}className="btn btn-warning btn-sm">Edit</NavLink>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
         </div>
            
        )
    }