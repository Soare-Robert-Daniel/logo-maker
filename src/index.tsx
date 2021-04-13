import * as React from "react"
import { render } from "react-dom"
import Application from "./Application"

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

window.addEventListener("load", () => {
    render(<Application />, document.querySelector("#themeisle-logo-maker-root"))
})
