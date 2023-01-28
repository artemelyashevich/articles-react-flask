import React from "react";
import { useState } from "react";
import { UserDTO } from "../../../models/UserDTO";
import './Registartion.scss';

function Registration({ modalActive, setModalActive }) {
    const [psw, setPsw] = useState("");
    const [name, setName] = useState("");
    const [cpsw, setCpsw] = useState("");
    const [email, setEmail] = useState("");
    const [pswError, setPswError] = useState(false);
    const [emaiError, setEmailError] = useState(false);
    const [err, setErr] = useState("");

    function checkPsw(psw, cpsw) {
        if (psw.length < 5) {
            setErr("Пароль должен быть больше 5-ти символов");
            setPswError(true);
            return false;
        }
        if (psw === cpsw) {
            setPswError(false);
            return true;
        } if (psw !== cpsw) {
            setPswError(true);
            setErr("Пароли не совпадают");
            return false;
        }
    };

    /*function checkMail(email) {
        users.forEach(user => {
            if (user.email === email) {
                setEmailError(true);
                return false;
            }
        });
        return true;
    }*/

    function regUser(name, email, psw) {
        let user = UserDTO.createUser(name, email, psw);
        console.log(user);
        console.log(user.convertToJson());
        fetch('http://127.0.0.1:5000/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: user.convertToJson()
        }
        )
            .then(response => response.json())
            .then(response => console.log(JSON.stringify(response)))
    };

    return (
        <>
            {modalActive ?
                (
                    <div className="modal" id="modal">
                        <form className="modal-form">
                            <h2>Registration</h2>
                            <i className="gg-close-o ii"
                                onClick={() => setModalActive(false)}>
                            </i>
                            <div className="name item">
                                <label>Имя</label>
                                <input
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="email item">
                                <label>Почта</label>
                                <input
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="psw item">
                                <label>Пароль</label>
                                <input
                                    placeholder="Password"
                                    value={psw}
                                    type="password"
                                    onChange={(e) => setPsw(e.target.value)}
                                />
                            </div>
                            <div className="rpsw item">
                                <label>Повторите <br /> пароль</label>
                                <input
                                    placeholder="Confirm password"
                                    value={cpsw}
                                    type="password"
                                    onChange={(e) => setCpsw(e.target.value)}
                                />
                            </div>

                            <div className="btn" onClick={() => {
                                let isValidPsw = checkPsw(psw, cpsw)
                                //let isValidMail = checkMail(email)
                                if (isValidPsw) {
                                    regUser(name, email, psw)
                                }
                            }}>Отправить</div>
                            {pswError ?
                                (
                                    <div className="error">{err}</div>
                                ) : (<></>)}
                             {emaiError ?
                                    (
                                        <div className="error">Почта уже используется другим пользователем</div>
                                    ) : (<></>)
                            }
                        </form>
                    </div>
                ) : (
                    <div></div>
                )
            }
        </>
    )
};

export default Registration