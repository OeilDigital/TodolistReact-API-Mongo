import { useState } from "react";
import "./Navbar.css";

export default function Navbar({
    logged,
    updateConnexion,
    updateRegister,
    updateShowList,
    updateAuth,
    offConnexion
}) {
    const [size, setSize] = useState(true);

    window.addEventListener('resize', function () {
        if (window.innerWidth < 1075) {
            setSize(false);
        } else {
            setSize(true);
        }
    });

    function logout() {
        updateAuth();
        offConnexion();
    }

    return (
        <>
            {!logged ? (
                <nav className="nav">
                    <div className="button-reset"></div>
                    <div className="connect">
                        <p className="sign">Sign</p>
                        <div className="signIn" onClick={updateConnexion}>In</div>
                        <div className="signUp" onClick={updateRegister}>Up</div>
                    </div>
                </nav>
            ) : (
                <nav className="nav">
                    <div className="button-reset"></div>
                    <div className="connectOn">
                        {size ?
                            (
                                <div className="menu">
                                    <div className="mylist item" onClick={updateShowList}><span>My List</span></div>
                                    <div className="logout item" onClick={logout}><span>Deconnexion</span></div>
                                </div>

                            ) :
                            (
                                <div className="menuColumn">
                                    <div className="mylist item" onClick={updateShowList}><span>My List</span></div>
                                    <div className="logout item" onClick={logout}><span>Deconnexion</span></div>
                                </div>
                            )
                        }
                    </div>
                </nav>
            )
            }
        </>
    )
}