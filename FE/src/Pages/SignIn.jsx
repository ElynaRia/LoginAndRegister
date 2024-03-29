import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Hostname } from './../../Components/Configuration';


export default function SignIn() {
    const [nama, setnama] = useState('');
    const [passw, setpassw] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            alert('Antum sudah Login.\nanda akan diarahkan ke home page!');
            navigate("/")
        }
    }, [])
    return (
        <>
            <section className='fixed inset-x-0 inset-y-0 w-full h-full flex justify-center items-center'>
                <form className='grid bg-slate-700 w-[80%] h-[75%] p-10 text-white'
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const x = await axios.post(Hostname + "/signin", { nama: nama, password: passw });
                        if (x.data === "PWSALAH") {
                            alert("PW SALAH")
                        } else if (x.data === "NOACC") {
                            alert("NO REGISTER")
                        } else {
                            localStorage.setItem('auth-token', x.data);
                            navigate('/')
                        }
                    }}
                >
                    <h1 className='text-center text-2xl mb-3'>LOGIN</h1>
                    <label style={{ textAlign: "start", fontSize: "20px" }}>NAMA:</label>
                    <input type="text" required={true} onChange={(e) => { setnama(e.target.value) }}
                        className='rounded outline-none text-black p-1'
                    />
                    <br />
                    <label style={{ textAlign: "start", fontSize: "20px" }} >PASSWORD:</label>
                    <input type="text" className='rounded outline-none text-black p-1' required={true} onChange={(e) => { setpassw(e.target.value) }} />
                    <br />
                    <input type="submit" value="MASUK"
                        className='bg-blue-700 w-[75%] mr-auto ml-auto h-10 rounded hover:bg-blue-800 cursor-pointer'
                    />
                </form>
            </section>
        </>
    )
}
