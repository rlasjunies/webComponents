class CustomAnhor extends HTMLAnchorElement {
    constructor() {
        super();
        console.log("My Custom Element constructed!");
    }

    connectedCallback() {
        console.log("My custome element connected to the DOM");
        this.addEventListener("click", e => {
            e.preventDefault();
            const result = confirm("Are you sure you would like to navigate to:" + e.target.href);
            if (result) {
                window.location.href = e.target.href;
            }
        });
    }
    disconnectedCallback() {
        console.log("My custome element connected to the DOM");
    }

    static get; observedAttributes() {
        return ["demo"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("attribute changed", name, oldValue, newValue);
    }
}

window.customElements.define("custom-anchor", CustomAnhor, {extends: "a"});