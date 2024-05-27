import React, { useState } from "react";
import Axios from "axios";
import '../form.css';

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleLogin() {
        if (username != "" && username != null && password != "" && password != null) {
            Axios.post("http://localhost:3088/auth/Login", {
                username: username.toLowerCase(),
                password: password
            }).then((res) => {
                console.log(res.data)
                if (res.data != false) {
                    alert("login sucessful")
                    window.location.href = '../Home'
                } else if (res.data === false) {
                    alert("Incorrect username or password")
                }
            })
        } else {
            alert("preencha os campos!")
        }
    }
    return (
        <div className="Login">
            <h1 className="title">Login</h1>
            <input type="text" id="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" id="passowrd" placeholder="passowrd" onChange={(e) => setPassword(e.target.value)} />
            <button className="btn" onClick={handleLogin}>Enter</button>
            <a href="../">Não Possui uma conta?</a>
        </div>
    );
}

export default Login;