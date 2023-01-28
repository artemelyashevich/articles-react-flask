import React, { useEffect } from "react";
import { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { UserProfileDTO } from "../../../models/UserProfileDTO";
import Registration from "./Registration";
import './SignIn.scss';


function SignIn() {
    const navigate = useNavigate();

    const [modalActive, setModalActive] = useState(false);
    const [valueEmail, setValueEmail] = useState("");
    const [valuePsw, setValuePsw] = useState("");
    const [isAllowed, setIsAllowed] = useState(false);
    const [errorPsw, setErrPsw] = useState(false);

    function signIn(email, psw) {  
        fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "psw": psw
            })
        })
            .then(response => response.json())
            .then(user => {
                let item = UserProfileDTO.createUser(user.id, user.name, user.email)
                localStorage.setItem('curUser', item.convertToJson());
                setIsAllowed(true);
            }, (error) => {
                setErrPsw(true);
                setIsAllowed(false);
            })
        return setErrPsw(false);
    };

    return (
        <>
            <form className="signin">
                <h2>Вход</h2>
                <div className="items">
                    <div className="name">
                        <label>Почта</label>
                        <input
                            placeholder="You email"
                            value={valueEmail}
                            onChange={(e) => { setValueEmail(e.target.value) }}
                        />
                    </div>
                    <div className="psw">
                        <label>Пароль</label>
                        <input
                            placeholder="Password"
                            value={valuePsw}
                            onChange={(e) => { setValuePsw(e.target.value) }}
                            type="password"
                        />
                    </div>
                    <div className="btn"
                        onClick={() => {
                            signIn(valueEmail, valuePsw)
                        }}
                    >
                        Войти
                    </div>
                    <div className="h3 btn"
                        onClick={() => setModalActive(true)}
                    >Зарегистрироваться</div>
                </div>
                {isAllowed ? (
                    navigate("/home")
                ) : (
                    <div></div>
                )}
                {errorPsw ? (
                    <div className="error">Неверная почта или пароль</div>
                ) : (
                    <div></div>
                )}
            </form>
            <Registration modalActive={modalActive} setModalActive={setModalActive} />
        </>
    )
};

export default SignIn;

