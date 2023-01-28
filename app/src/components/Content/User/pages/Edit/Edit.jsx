import React from "react";
import { useState } from "react";
import { UserProfileDTO } from "../../../../../models/UserProfileDTO";
import './edit.scss'

function Edit() {
    let curUserJSON = JSON.parse(localStorage.getItem("curUser"));
    let resultUser = UserProfileDTO.createUser(curUserJSON.id, curUserJSON.name, curUserJSON.email);

    const [valueName, setValueName] = useState();
    const [valueEmail, setValueEmail] = useState();

    function Send(name, email) {
        const data = {
            "name": name,
            "email": email
        }
        fetch('http://127.0.0.1:5000/user/' + resultUser.id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
    return (
        <div className="content">
            <form action="">
                <div className="title">
                    <h2>
                        Редактировать
                    </h2>
                </div>
                <div className="items">
                    <div className="item">
                        <div className="name">
                            <label htmlFor="">Имя</label>
                            <input type="text" className="name" placeholder={resultUser.name}
                                value={valueEmail}
                                onChange={(e) => { setValueEmail(e.target.value) }}
                            />
                        </div>
                    </div>
                    <div className="item">
                        <div className="email">
                            <label htmlFor="">Почта</label>
                            <input type="text" className="email" placeholder={resultUser}
                                value={valueName}
                                onChange={(e) => { setValueName(e.target.value) }}
                            />
                        </div>
                    </div>
                </div>
                <div className="btn" onClick={() => Send(valueName, valueEmail)}>Редактировать</div>
            </form>
        </div>
    )
}

export default Edit