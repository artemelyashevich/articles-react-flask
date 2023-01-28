import React from "react";
import { Link } from "react-router-dom";
import { UserProfileDTO } from "../../../../../models/UserProfileDTO";
import '../../User.scss'

function Profile() {
    let curUserJSON = JSON.parse(localStorage.getItem("curUser"))
    let resultUser = UserProfileDTO.createUser(curUserJSON.id, curUserJSON.name, curUserJSON.email)

    function DeleteUser() {
        fetch('http://127.0.0.1:5000/user/' + resultUser.id, {
            method: 'DELETE',
        })
            .then(res => res.text())
            .then(res => console.log(res))
    }
    return (
        <div className="content">
            <div className="left-bar">
                <ul>
                    <li className="profile">Профиль</li>
                    <li>Создать статью</li>
                    <li>Мои статьи</li>
                    <Link to="/" className="li">
                        <li >Выйти</li>
                    </Link>
                </ul>
            </div>
            <div className="info">
                <form>
                    <div className="title">
                        <h1>Профиль</h1>
                    </div>
                    <div className="content--form">
                        <div className="name item">
                            <label>Имя</label>
                            <div className="text">
                                <h1>{resultUser.name}</h1>
                            </div>
                        </div>
                        <div className="mail item">
                            <label>Почта</label>
                            <div className="text">
                                <h1>{resultUser.email}</h1>
                            </div>
                        </div>
                        <div className="count--art item">
                            <label>Количество статей</label>
                            <div className="text">
                                <h1 className="txt">length</h1>
                            </div>
                        </div>
                        <div className="buttons">
                            <Link to="/home/edit" className="btn">
                                <div className="">
                                    <h3>Редактировать</h3>
                                </div>
                            </Link>
                            <div className="btn" onClick={() => DeleteUser()}><h3>Удалить аккаунт</h3></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile