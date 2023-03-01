const h1 = document.querySelector('h1');

setTimeout(() => {
    h1.classList.add("h1Effect")
}, 1000);

h1.classList.remove("h1Effect");