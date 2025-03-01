"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sweetalert2_1 = __importDefault(require("sweetalert2"));
const emailjs_com_1 = __importDefault(require("emailjs-com"));
const menu = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");
const icon = document.getElementById("icon");
const header = document.querySelector("header");
const scrollTop = document.querySelector(".scroll-top");
if (menu && navbar) {
    menu.onclick = () => {
        navbar.classList.toggle("open-menu");
        menu.classList.toggle("move");
    };
}
window.onscroll = () => {
    if (navbar && menu) {
        navbar.classList.remove("open-menu");
        menu.classList.remove("move");
    }
    if (header) {
        header.classList.toggle("header-active", window.scrollY > 0);
    }
    if (scrollTop) {
        scrollTop.classList.toggle("scroll-active", window.scrollY >= 400);
    }
};
if (icon) {
    icon.onclick = () => {
        document.body.classList.toggle("light-theme");
        icon.src = document.body.classList.contains("light-theme") ? "images/moon.png" : "images/sun.png";
    };
}
// Email validation and sending
function validate() {
    const name = document.querySelector(".name");
    const email = document.querySelector(".email");
    const msg = document.querySelector(".message");
    const sendBtn = document.querySelector(".send-btn");
    if (sendBtn && name && email && msg) {
        sendBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (name.value === "" || email.value === "" || msg.value === "") {
                emptyError();
            }
            else {
                sendMail(name.value, email.value, msg.value);
            }
        });
    }
}
validate();
function sendMail(name, email, msg) {
    emailjs_com_1.default.send("service_2zls3oq", "template_2sdk2rf", {
        from_name: email,
        to_name: name,
        message: msg,
    }).then(() => {
        success();
    }).catch((error) => {
        console.error("EmailJS Error:", error);
    });
}
function emptyError() {
    sweetalert2_1.default.fire({
        title: "Complete All The Sections",
        text: "Fields can't be empty",
        icon: "error",
    });
}
function success() {
    sweetalert2_1.default.fire({
        title: "Email Sent Successfully",
        text: "We will try to respond in 24 hours",
        icon: "success",
    });
}
