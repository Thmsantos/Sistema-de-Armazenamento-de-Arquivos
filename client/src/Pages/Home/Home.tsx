import React, { ChangeEvent, useEffect, useState } from "react";
import FormData from 'form-data';
import Axios from 'axios';
import './Home.css';

function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [idUser, setIdUser] = useState("")
    const [user, setUser] = useState("")
    const [archive, setArchive] = useState<string[]>([]);
    const [idArchive, setIdArchive] = useState<number[]>([]);

    useEffect(() => {
        Axios.get("http://localhost:3088/auth/getArchives")
            .then((response) => {
                setArchive(response.data.map((item: { name: any; }) => item.name));
                setIdArchive(response.data.map((item: { id: any; }) => item.id));
            })
    }, []);

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
    }, []);

    function uploadArchive(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const max = 5 * 1024 * 1024 * 1024;
        e.preventDefault();
        let formulary = new FormData();
        if (file != null) {
            console.log(file.size)
            if (file.size > max) {
                alert("Arquivo muito grande.")
            } else {
                formulary.append("screenshot", file);
                formulary.append("id", idUser.toString());
                Axios.post("http://localhost:3088/auth/download", formulary, {})
                    .then((res) => {
                        if (res.data === true) {
                            alert("baixado")
                            window.location.reload();
                        }
                    })
            }
        } else {
            alert("escolha um arquivo")
        }
    }

    const verificationFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const myArchives = () => {
        window.location.href = "../Sent"
    }

    const LogOut = () => {
        Axios.get("http://localhost:3088/auth/LogOut")
            .then((res) => {
                if (res.data === "ok") {
                    alert("Obrigado!")
                    window.location.href = "../Login"
                }
            })
    }

    return (
        <div className="home">
            <header>
                <button onClick={myArchives}>Ver Meus Arquivos </button>
                <button onClick={LogOut}>Sair</button>
            </header>
            <div className="Upload">
                <input type="file" name="screenshot" onChange={verificationFile} />
                <button onClick={uploadArchive}>Download</button>
            </div>
            <div className="archives">
                <h2>Arquivos</h2>
                {archive && idArchive && archive.map((archiveItem, i) => (
                    <div key={i} className="archivesMap">
                        <p>{archiveItem}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Home;