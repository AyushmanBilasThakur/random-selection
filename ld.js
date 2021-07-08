let body = document.querySelector("body");
let theme_toggler = document.getElementById("toggler");

let theme = localStorage.getItem("theme") || "light";
body.classList.add(theme);

theme_toggler.addEventListener("click", () => {
    body.classList.remove(theme);
    
    theme = theme === "light" ? "dark" : "light"

    body.classList.add(theme);

    localStorage.setItem("theme", theme)

})