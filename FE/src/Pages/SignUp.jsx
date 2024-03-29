import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Hostname, defaultImageProfil } from './../../Components/Configuration';


export default function SignUp() {
    const [nama, setnama] = useState('');
    const [passw, setpassw] = useState('');
    const [photo, setphoto] = useState(defaultImageProfil);
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
                        function ConvertBase64(file) {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            const data = new Promise((resolve, reject) => {
                                reader.onloadend = () => { resolve(reader.result) }
                                reader.onerror = (err) => { reject(err) }
                            })
                            return data
                        }
                        // const convertImgToBase64 = await ConvertBase64(photo);



                        function Resi(base64Str, maxWidth = 256, maxHeight = 256) {
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

                        // const resizebase64 = await Resi(convertImgToBase64 || photo);

                        axios.post(Hostname + "/signup", { nama: nama, password: passw, photo: defaultImageProfil })
                            .then((x) => {
                                if (x.data === "Already") {
                                    alert("akun sudah ada atau sudah terdaftar.\nsilahkan gunakan nama yg lain.")
                                } else if (x.data === "OKE") {
                                    if (confirm("Anda Berhasil Membuat Akun.\nApakah Anda ingin Melanjutkan Login?") == 1) { navigate('/login'); }
                                }
                            })
                            .catch((err) => { console.log(err); });
                    }}
                >
                    <h1 className='text-center text-2xl mb-3'>REGISTER AKUN</h1>
                    <label style={{ textAlign: "start", fontSize: "20px" }}>NAMA:</label>
                    <input type="text" required={true} onChange={(e) => { setnama(e.target.value) }}
                        className='rounded outline-none text-black p-1'
                    />
                    <br />
                    <label style={{ textAlign: "start", fontSize: "20px" }} >PASSWORD:</label>
                    <input type="text" className='rounded outline-none text-black p-1' required={true} onChange={(e) => { setpassw(e.target.value) }} />
                    <br />
                    <input type="submit" value="KIRIM"
                        className='bg-blue-700 w-[75%] mr-auto ml-auto h-10 rounded hover:bg-blue-800 cursor-pointer'
                    />
                </form>
            </section >
        </>
    )
}
