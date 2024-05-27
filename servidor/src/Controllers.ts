import bcrypt from 'bcrypt';
const path = require('path');
const fs = require('fs');
const User = require('./User');
const Archives = require('./Archives')
const Usuarios: any[] = [];
const ArchivesArray: any[] = []

class Controller {
    static async LogOut(req: any, res: any){
        for(let i = 0; i < Usuarios.length; i++){
            if(Usuarios[i].status == true){
                Usuarios[i].status = false
            }
        }

        res.status(200).json("ok")
    }

    static async DownnloadArchive(req: any, res: any) {
        const id = req.body.id
        const fileName = req.files.screenshot.name;
        const fileCode = req.files.screenshot;
        let pathUpload = path.join(__dirname, "..", "downloads", fileName);
        
        fileCode.mv(pathUpload, (err: any) => {
            if(err){
                return res.status(200).json(err);
            }else{
                return res.status(200).json(true);
            }
        })

        const ArchiveAdc = new Archives(fileName, parseInt(id), fileCode)
        ArchivesArray.push(ArchiveAdc);
    }

    static async getArchives(req: any, res: any){
        res.status(200).json(ArchivesArray)
    }

    static async deleteArchive(req: any, res: any){
        const file = req.body.filename
        let idArchiveDel = -1
        for(let i = 0; i < ArchivesArray.length; i++){
            if(file === ArchivesArray[i].name){
                idArchiveDel = i
                break;
            }
        }
        
        if(idArchiveDel !== -1) {
            const filePath = path.join(__dirname, "..", "downloads", file);
            fs.unlink(filePath, (err: any) => {
                if (err) {
                    return res.status(500).json({ error: "Failed to delete file from server" });
                } else {
                    ArchivesArray.splice(idArchiveDel, 1);
                    return res.status(200).json({ success: true });
                }
            });
        } else {
            return res.status(404).json({ error: "File not found" });
        }
    }

    static async addUser(req: any, res: any) {
        try {
            let password = req.body.password;
            let username = req.body.username.toLowerCase();
            let exist = false

            for (let i = 0; i < Usuarios.length; i++) {
                if (username === Usuarios[i].username) {
                    exist = true
                }
            }

            if (exist == false) {
                const salt = await bcrypt.genSalt(10);
                const CryptPass = await bcrypt.hash(password, salt);
                const UserAdc = new User(username, CryptPass);
                Usuarios.push(UserAdc);
                res.status(200).json("username add")
            }else{
                res.status(200).json("username already exist")
            }

        } catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        };

    };

    static async Login(req: any, res: any) {
        try {
            let usernameBody = req.body.username.toLowerCase();
            let passwordBody = req.body.password;
            let auth = false

            for(let i = 0; i < Usuarios.length; i++){
                if(Usuarios[i].status == true){
                    Usuarios[i].status = false
                }
            }

            for (let i = 0; i < Usuarios.length; i++) {
                if (Usuarios[i].username == usernameBody && await bcrypt.compare(passwordBody, Usuarios[i].password)) {
                    auth = true
                    Usuarios[i].status = true
                }
            }

            if (auth == true) {
                res.status(200).json(true)
            } else {
                res.status(200).json(false)
            }

        }
        catch (error) {
            console.error(error)
            res.status(500).send("Server error")
        }
    }

    static async getAll(req: any, res: any) {
        res.status(200).json(Usuarios);
    };
};


module.exports = Controller;

