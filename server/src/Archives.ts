class Archives{
    name: string;
    id: number;
    idArchive: number;
    fileCode: File;

    private static IncrementId: number = 1;

    constructor(name: string, id: number, fileCode: File){
        this.name = name
        this.id = id
        this.fileCode = fileCode
        this.idArchive = Archives.IncrementToId()
    }

    private static IncrementToId(): number {
        return Archives.IncrementId++;
    }
}

module.exports = Archives