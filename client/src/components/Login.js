import { useRef, useState, useEffect } from 'react';
// import AuthContext from "../context/AuthProvider";
import axios from "axios";
import "./Login.css";
import { LOGIN_URL } from "../config/config";


export default function Login({
    updateAuth,
    updateShowList,
    updateRegister
}) {
    // const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [userFocus, setUserFocus] = useState(false);
    const [pwd, setPwd] = useState('');
    const [pwdFocus, setPwdFocus] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current = document.querySelector('#username');
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    // function loginInDB(user) {
    //     //Log à l'API avec nom et pwd corrects et ecriture de _id, username et ...
    //     // ... token dans le sessionStorage
    //     (async () => await axios.post(LOGIN_URL, user)
    //         .then(res => {
    //             sessionStorage.setItem('_id', res.data._id);
    //             sessionStorage.setItem('username', res.data.username);
    //             sessionStorage.setItem('token', res.data.accessToken);
    //         })
    //         // .catch(err => { setErrMsg(err.response.data) })
    //     )();
    // }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, { username: user, password: pwd });
            const accessToken = response?.data?.accessToken;
            sessionStorage.setItem('token', accessToken);
            const _id = response?.data?._id;
            sessionStorage.setItem('_id', _id);
            const username = response?.data?.username;
            sessionStorage.setItem('username', username);
            setUser('');
            setPwd('');
            setSuccess(true);
            updateAuth();
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 401) {
                setErrMsg('Utilisateur non inscrit !');
            } else {
                setErrMsg('Nom d\'utilisateur ou Mot de passe incorrect(s)!');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section className="sectionLogin">
                    <h1> You are logged in!</h1>
                    <br />
                    <p className="linkToMyList" onClick={updateShowList}>My List</p>
                </section>
            ) : (
                <section className="sectionLogin">
                    <p ref={errRef} className={errMsg ? "errmsg" :
                        "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h2 className="h2Login">Sign In</h2>
                    <form className="formLogin" onSubmit={handleSubmit}>
                        <label className="labelLogin" htmlFor="username">
                            Username:
                        </label>
                        <input
                            className="form-control inputLogin"
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />

                        <label className="labelLogin" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className="form-control inputLogin"
                            type="password"
                            id="password"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />

                        <button className="buttonFormLogin">Sign In</button>
                    </form>

                    <div className="already">
                        Need an Account?<br />
                        <span className="line">
                            {/* Si utilisation de Router-Dom inclure le lien */}
                            <p className="registerLink" onClick={updateRegister}>Sign Up</p>
                        </span>
                    </div>
                </section >
            )
            }
        </>
    );
};
