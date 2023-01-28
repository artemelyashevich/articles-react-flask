export class UserProfileDTO {

    constructor(id, name, email, articles) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.articles = articles;
    };

    static createUser(id, name, email) {
        console.log(id + " " + name)
        return new UserProfileDTO(id, name, email, null);
    };

    convertToJson(){
        return JSON.stringify({
            "id": this.id,
            "name": this.name,
            "email": this.email
        })
    };
};
