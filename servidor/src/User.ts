class User{
    id : number;
    username: string;
    password: string;
    status: boolean;

    private static IncrementId: number = 1;

    constructor(username: string, password: string){
        this.id = User.IncrementToId();
        this.username = username;
        this.password = password;
        this.status = false;
    }

    private static IncrementToId(): number {
        return User.IncrementId++;
    }

    public static getId(){
        return User.IncrementToId;
    }
}

module.exports = User;