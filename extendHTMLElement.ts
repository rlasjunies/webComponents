class CustomAnchor extends HTMLAnchorElement {
    constructor() {
        super();
        console.log("Extended Anchor Element constructed!");
    }

    connectedCallback() {
        console.log("Extended Anchor element connected to the DOM");
        this.addEventListener("click", e => {
            e.preventDefault();
            const result = confirm("Are you sure you would like to navigate to:" + e.target.href);
            if (result) {
                window.location.href = e.target.href;
            }
        });
    }
    // disconnectedCallback() {
    //     console.log("Extended Anchor element connected to the DOM");
    // }

    // static get; observedAttributes() {
    //     return ["demo"];
    // }

    // attributeChangedCallback(name, oldValue, newValue) {
    //     console.log("attribute changed", name, oldValue, newValue);
    // }
}

window.customElements.define("x-anchor", CustomAnchor, {extends: "a"});