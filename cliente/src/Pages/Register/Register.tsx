import React, { useState } from "react";
import Axios from "axios";
import Login from "../Login/Login";
import '../form.css'

function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function registerUser() {
        if (username != "" && username != null && password != "" && password != null) {
            Axios.post("http://localhost:3088/auth/addUser", {
                username: username,
                password: password
            }).then((res) => {
                console.log(res.data)
                if (res.data === "username already exist") {
                    alert("username already exist")
                } else {
                    alert("user add")
                    window.location.href = '../Login'

                }
            }).catch((error) => {
                console.error("Houve um erro ao registrar o usuário:", error);
            });
        } else {
            alert("preencha os campos!")
        }
    }

    return (
        <div className="Register">
            <h1 className="title">Register</h1>
            <input placeholder="username" id="username" onChange={(e) => setUsername(e.target.value)} type="text" />
            <input placeholder="password" id="password" onChange={(e) => setPassword(e.target.value)} type="password" />
            <button className="btn" onClick={registerUser} type="submit">Registrar</button>
            <a href="../Login">Já Possui uma conta?</a>
        </div>
    );
}

export default Register;