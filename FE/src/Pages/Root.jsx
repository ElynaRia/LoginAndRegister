import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useState } from 'react'
import { Hostname } from './../../Components/Configuration';

export default function Root() {
    const [hasil, sethasil] = useState('');
    const [photo, setphoto] = useState('');
    const [TextHome, setTextHome] = useState('');
    const navigate = useNavigate();
    const rute = useRef(null);


    useEffect(() => {
        async function Check() {
            const LS = localStorage.getItem("auth-token");
            await axios.post(Hostname, { headers: String(LS) })
                .then((result) => {
                    if (result.data === "NO LOGIN") {
                        setTextHome("");
                        sethasil("Friend");
                        setphoto("./account.png");
                        rute.current.style.display = 'grid';
                    } else {
                        sethasil(result.data.nama || "Friend");
                        setphoto(result.data.photo || "../../public/account.png");
                        rute.current.style.display = 'none';
                        setTextHome("Belum ada apa apa \nmasih kosong");
                    }
                })
        }
        Check()
    }, [])
    return (
        <>
            <Link to={'profil'} className='text-white absolute right-2 top-1 w-60 bg-blue-700 p-2 rounded overflow-hidden flex justify-between items-center'>
                <div>
                    <span className='text-red-100'>Welcome,</span>
                    <h1>{hasil}</h1>
                </div>
                <div>
                    <img src={photo} className='w-16 h-16 rounded-full' />
                </div>
            </Link>
            <div className='text-white text-center mt-5 text-xl w-[90%] mr-auto ml-auto'>
                <h1 className='mt-28'>HAII INI ADALAH HALAMAN AWAL</h1>
                <div className='text-center mt-32 w-full justify-center gap-4' ref={rute} style={{ display: "none" }}>
                    <span>RUTE :</span>
                    <div className='flex gap-5'>
                        <Link to={'/register'} className='bg-sky-700 hover:bg-sky-800 p-2 rounded w-32'>REGISTER</Link>
                        <Link to={'/login'} className='bg-sky-700 hover:bg-sky-800 p-2 rounded w-32'>LOGIN</Link>
                    </div>
                </div>
            </div>
            <h1 className='text-white text-lg fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>{TextHome}</h1>
        </>
    )
}
