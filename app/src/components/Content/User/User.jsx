import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserProfileDTO } from "../../../models/UserProfileDTO";
import Profile from "./pages/Profile/Profile";
import './User.scss'


function User() {
    const [user, setUser] = useState()
    const [modal, setModal] = useState(false)

    return (
        <div className="content">
            <div className="left-bar">
                <ul>
                    <Link to="/home/profile" className="li"><li onClick={() => {
                        setModal(true)
                    }}>
                        Профиль</li></Link>
                    <li>Создать статью</li>
                    <li>Мои статьи</li>
                    <Link to="/" className="li">
                        <li>Выйти</li>
                    </Link>
                </ul>
            </div>

            {!setModal ? (
                <Profile />
            ) :
                (<div className="img"></div>)}
        </div>
    )
}

export default User