import React, { useEffect, useState } from "react";
import Axios from 'axios';
import './Sent.css';

function Sent() {
    const [idUser, setIdUser] = useState("")
    const [user, setUser] = useState("")
    const [archive, setArchive] = useState<string[]>([])
    const [files, setFiles] = useState<File[]>([])

    useEffect(() => {
        Axios.get("http://localhost:3088/auth/getAll")
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].status === true) {
                        setIdUser(response.data[i].id)
                        setUser(response.data[i].username)
                    }
                }
            })
    }, [])

    const LogOut = () => {
        Axios.get("http://localhost:3088/auth/LogOut")
            .then((res) => {
                if (res.data === "ok") {
                    alert("Obrigado!")
                    window.location.href = "../Login"
                }
            })
    }

    useEffect(() => {
        if (idUser) {
            Axios.get("http://localhost:3088/auth/getArchives")
                .then((response: any) => {
                    const userFiles = response.data
                        .filter((item: { fileCode: File }) => item.fileCode)

                    setFiles(userFiles)
                    const userArchives = response.data
                        .filter((item: { id: string }) => item.id === idUser)
                        .map((item: { name: string }) => item.name);
                    setArchive(userArchives);
                });
        }
    }, [idUser]);

    console.log(files)

    function deleteArchive(index: any) {
        Axios.post("http://localhost:3088/auth/delArchive", {
            "filename": archive[index]
        }).then((res) => {
            alert("excluido!")
            window.location.reload();
        })
    }

    function downloadFile(file: any) {
        const blob = new Blob([file.fileCode.data.data], { type: file.fileCode.mimetype });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.fileCode.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function initPage() {
        window.location.href = "../Home"
    }

    return (
        <div className="Sent">
            <h2>
                Meus arquivos
            </h2>
            <button onClick={LogOut}>Sair</button>
            <button onClick={initPage}>Página inicial</button>

            <div className="userName">
                <h1>Olá {user}</h1>
            </div>
            <div className="uploadedArchives">
                {archive && archive.map((archiveItem, i) => (
                    <div key={i} className="mapArchives">
                        <p>{archiveItem}</p>
                        <button onClick={() => deleteArchive(i)}>excluir</button>
                        <button onClick={() => downloadFile(files[i])}>Download</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sent;