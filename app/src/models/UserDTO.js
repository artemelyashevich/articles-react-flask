export class UserDTO {

    constructor(id, name, email, psw, articles) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.psw = psw;
        this.articles = articles;
    };

    static createUser(name, email, psw) {
        return new UserDTO(null, name, email, psw, null);
    };

    convertToJson(){
        return JSON.stringify({
            "name": this.name,
            "email": this.email,
            "psw": this.psw
        })
    };
};
