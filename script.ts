import Swal from "sweetalert2";
import emailjs from "emailjs-com";

const menu: HTMLElement | null = document.querySelector(".menu-icon");
const navbar: HTMLElement | null = document.querySelector(".navbar");
const icon: HTMLImageElement | null = document.getElementById("icon") as HTMLImageElement;
const header: HTMLElement | null = document.querySelector("header");
const scrollTop: HTMLElement | null = document.querySelector(".scroll-top");

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
function validate(): void {
    const name: HTMLInputElement | null = document.querySelector(".name");
    const email: HTMLInputElement | null = document.querySelector(".email");
    const msg: HTMLTextAreaElement | null = document.querySelector(".message");
    const sendBtn: HTMLButtonElement | null = document.querySelector(".send-btn");

    if (sendBtn && name && email && msg) {
        sendBtn.addEventListener("click", (e: Event) => {
            e.preventDefault();
            if (name.value === "" || email.value === "" || msg.value === "") {
                emptyError();
            } else {
                sendMail(name.value, email.value, msg.value);
            }
        });
    }
}

validate();

function sendMail(name: string, email: string, msg: string): void {
    emailjs.send("service_2zls3oq", "template_2sdk2rf", {
        from_name: email,
        to_name: name,
        message: msg,
    }).then(() => {
        success();
    }).catch((error) => {
        console.error("EmailJS Error:", error);
    });
}

function emptyError(): void {
    Swal.fire({
        title: "Complete All The Sections",
        text: "Fields can't be empty",
        icon: "error",
    });
}

function success(): void {
    Swal.fire({
        title: "Email Sent Successfully",
        text: "We will try to respond in 24 hours",
        icon: "success",
    });
}
