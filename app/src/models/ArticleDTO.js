export class ArticleDTO {
    constructor(id, title, content) {
        this.id = id;
        this.title = title;
        this.content = content;
    };
    
    static createArticle(id, title, content) {
        return new ArticleDTO(null, title, content);
    };
};

