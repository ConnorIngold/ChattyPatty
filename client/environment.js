console.log(window.location.href);
const url = window.location.href;
let envUrl = ""
if (url.includes("vercel")) {
    envUrl = "https://afternoon-island-99074.herokuapp.com"
} else {
    envUrl = "http://localhost:3000"
}