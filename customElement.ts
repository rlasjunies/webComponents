class MyCustomElement extends HTMLElement {
    constructor() {
        super();
        console.log("My Custom Element constructed!");
    }

    connectedCallback() {
        console.log("My custome element connected to the DOM");
    }
    disconnectedCallback() {
        console.log("My custome element connected to the DOM");
    }

    static get observedAttributes() {
        return ["demo"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("attribute changed", name, oldValue, newValue);
    }

}

class MyCustomElementExtended extends MyCustomElement{
    addedMethod(value) {
        console.log("addedMethod called:",value);
    }
}

window.customElements.define("my-custom-element", MyCustomElement);
window.customElements.define("mce-extended", MyCustomElementExtended);
// $mcee = document.querySelector("mce-extended");
