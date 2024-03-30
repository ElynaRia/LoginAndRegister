import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { filesize } from 'filesize';
import { Hostname } from '../../Components/Configuration';

export default function Profil() {
    const [id, setid] = useState('')
    const [nama, setnama] = useState('');
    const [photo, setphoto] = useState('');
    const [textEditPhoto, settextEditPhoto] = useState('Ganti Foto Profil ✏️');
    const [strsize, setsize] = useState('')
    const logout = useRef(null);
    const editPhoto = useRef(null);
    const saveText = useRef(null);
    const sizecompress = useRef(null);
    const navigate = useNavigate();


    function ConvertBase64(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const data = new Promise((resolve, reject) => {
            reader.onload = () => {
                resolve(reader.result);
                setTimeout(() => {
                    settextEditPhoto("Selesai Upload");
                    saveText.current.style.display = "block";
                }, 500);
            }
            reader.onerror = (err) => { reject(err) }
        })
        return data
    }



    function Resize(base64Str, maxWidth = 256, maxHeight = 256) {
        return new Promise((resolve) => {
            let img = new Image()
            img.src = base64Str
            img.onload = () => {
                let canvas = document.createElement('canvas')
                const MAX_WIDTH = maxWidth
                const MAX_HEIGHT = maxHeight
                let width = img.width
                let height = img.height
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width
                        width = MAX_WIDTH
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height
                        height = MAX_HEIGHT
                    }
                }
                canvas.width = width
                canvas.height = height
                let ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0, width, height)
                resolve(canvas.toDataURL())
            }
        })
    }



    async function Check() {
        const LS = localStorage.getItem("auth-token");
        await axios.post(Hostname, { headers: String(LS) })
            .then((result) => {
                if (result.data === "NO LOGIN") {
                    setid("Please Login!");
                    setnama("Please Login!");
                    setphoto("./account.png");
                    logout.current.style.display = "none";
                    editPhoto.current.style.display = "none";
                } else {
                    setid(result.data.id);
                    setnama(result.data.nama);
                    setphoto(result.data.photo);
                    logout.current.style.display = "flex";
                    editPhoto.current.style.display = "flex";
                }
            })
    }



    async function savePhotoToDB() {
        await axios.post(Hostname + "/edit/photo", { id: id, nama: nama, photo: String(photo) })
            .then((x) => {
                localStorage.setItem('auth-token', x.data);
                location.reload();
            })
    }


    async function TesT() {
        await axios.post(Hostname + '/tes', { id: id, nama: nama, photo: "test" })
            .then((x) => {
                alert(x.data)
            })
            .catch((err) => {
                alert(err);
            })
    }


    useEffect(() => {
        Check()
    }, []);

    return (
        <>
            <section className='w-full p-1 grid justify-center items-center text-white'>
                <Link to={'/'} className='absolute top-2 left-2 bg-sky-700 p-2 hover:bg-sky-800 cursor-pointer rounded'>{'<'} Back To Home</Link>
                <h1 className='text-center font-bold text-4xl underline mb-3 mt-20'>Your Account</h1>
                <img src={photo} className='w-80 h-80 mt-16 rounded-[9999pc] border-2 select-none'
                    onClick={TesT}
                />
                <span ref={sizecompress} style={{ display: "none", textAlign: "center" }}>auto compressed  {' ➤ '}{strsize}</span>
                <label htmlFor='editPhoto' className='text-center bg-sky-800 mt-3 rounded h-10 justify-center items-center cursor-pointer hover:bg-sky-700 select-none' style={{ display: "none" }} ref={editPhoto}>
                    {textEditPhoto}
                    <input type="file" id="editPhoto" className='hidden' disabled={false}
                        onChange={async (e) => {
                            e.target.disabled = true;
                            sizecompress.current.style.display = "block";
                            const x = String(await Resize(await ConvertBase64(e.target.files[0]), 256, 256));
                            settextEditPhoto("Tunggu Sebentar");
                            setsize(filesize(x.length))
                            if (e.target.files[0]) { setphoto(x) } // update img src
                        }}
                    />
                </label>
                <button className='bg-emerald-600 rounded p-2 mt-2 uppercase font-extrabold text-xl font-mono'
                    ref={saveText}
                    style={{ display: "none" }}
                    onClick={savePhotoToDB}
                >Simpan Perubahan</button>
            </section>
            <div className='w-full text-white p-2 mt-10'>
                <h1 className='ml-10 text-xl uppercase font-semibold'>ID :</h1>
                <h1 className='ml-10 text-xl bg-slate-600 p-3 mr-10 font-bold'>{id}</h1>
                <br />
                <h1 className='ml-10 text-xl uppercase font-semibold'>Username / Nama :</h1>
                <h1 className='ml-10 text-xl bg-slate-600 p-3 mr-10 font-bold'>{nama}</h1>
            </div>
            <span className='text-2xl bg-rose-700 rounded justify-center items-center h-14 ml-12 mr-12 hover:bg-rose-800 cursor-pointer mt-10 mb-5 text-white'
                onClick={() => {
                    localStorage.removeItem('auth-token');
                    location.reload()
                }}
                ref={logout}
                style={{ display: "none" }}
            >LOGOUT</span>
        </>
    )
}
