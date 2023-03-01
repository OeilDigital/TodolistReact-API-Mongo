import { useEffect } from 'react';
import "./Circle.css";

function Circle(props) {

    function rotate() {
        const text = document.querySelector('.text p');
        text.innerHTML = text.innerHTML.split("").map(
            (char, i) => `<span style="transform:rotate(${i * 7.5}deg )">${char}</span>`
        ).join("");
    }

    function pause() {
        const text = document.querySelector('.text');
        text.classList.remove("rotate");
    }

    function disable() {
        const text = document.querySelector('.circle');
        text.classList.add("disable");
        text.classList.remove("circle");
    }

    useEffect(() => {
        rotate();
    }, []);

    return (
        <>
            <div className="circle">
                <div className="core">
                    <button onClick={pause}><i className="fa-regular fa-circle-pause"></i></button>
                    <button onClick={disable}><i className="fa-regular fa-circle-xmark"></i></button>
                </div>
                <div className="text rotate">
                    <p>Your private ToDo List - Program  it and Do it - </p>
                </div>
            </div>
        </>
    );
}

export default Circle;