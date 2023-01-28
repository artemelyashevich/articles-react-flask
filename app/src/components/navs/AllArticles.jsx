import React from "react";
import "./scss/Articles.scss";


function AllArticles({articles, setArticles, isLoaded, setISLoaded, error, setError}) {
    return (

        <div className="content">
            {
                error ?
                    (
                        <div>Error: {error.message}</div>
                    ) :
                    !isLoaded ?
                        (
                            <div>Loading...</div>
                        ) :
                        (
                            <div className="articles">
                                {
                                    articles.map(item => (
                                        <div className="article" key={item.id}>
                                            <div className="article-title"><h2>{item.title}</h2></div>
                                            <br />
                                            <div className="article-content"><p>{item.content}</p></div>
                                            <br />
                                        </div>
                                    ))
                                }
                                <div className="mark">
                                    <h3>Чтобы создать статью, нужно войти в <a href="/login">аккаунт</a> / <a href="/login">зарегистрироваться</a>.</h3>
                                </div>
                            </div>
                        )
            }
        </div>
    )
};

export default AllArticles;