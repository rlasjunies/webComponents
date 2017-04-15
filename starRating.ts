class RlStarRating extends HTMLElement {
    _root: ShadowRoot;
    _$top: HTMLElement;
    _$bottom: HTMLElement;
    _disabled: boolean = false;
    _value: number = 0;

    constructor() {
        super();

        this._root = this.attachShadow({mode: "open"});

        this._$top = null;
        this._$bottom = null;
    }

    set value(value: number){
        if ( this._value === value) return;
        this._value = value;
        this._render();
    }

    get value() {
        return this._value;
    }
    connectedCallback() {
        this._root.innerHTML = `
        <style>
            :host {
                width: 10em;
                height: 2em;
                display: inline-block;
                overflow: hidden;
                user-select: none;
                vertical-align: middle;
                box-sizing: border-box;
            }

            .container {
                color: #c500c5;
                font-size: 2em;
                line-height: 1em;
                margin: 0 auto;
                position: relative;
                padding: 0;
                cursor: pointer;
            }

            .container .top {
                color: #e7bd06;
                padding: 0;
                position: absolute;
                z-index: 1;
                display: block;
                top: 0;
                left: 0;
                overflow: hidden;
                width: 0;
            }

            .container:hover .top {
                display: none;
            }

            .container .bottom {
                padding: 0;
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                unicode-bidi: bidi-override;
                direction: rtl;
            }

            .container .bottom>span:hover,
            .container .bottom>span:hover~span {
                color: #e7bd06;
            }

            :host([disabled]) .container{
                cursor: inherit;
            }

            :host([disabled]) .container .top {
                display: block;
            }

            :host([disabled]) .container .bottom > span:hover,
            :host([disabled]) .container .bottom > span:hover ~ span {
                color: inherit;
            }

        </style>
        <div class="container">
            <div class="top">
                <span>⋆</span>
                <span>⋆</span>
                <span>⋆</span>
                <span>⋆</span>
                <span>⋆</span>
            </div>
            <div class="bottom">
                <span data-value="5">⋆</span>
                <span data-value="4">⋆</span>
                <span data-value="3">⋆</span>
                <span data-value="2">⋆</span>
                <span data-value="1">⋆</span>
            </div>
        </div>

        `;
        this._disabled = (this.getAttribute("disabled") !== null);
        this._$top = <HTMLElement>this._root.querySelector(".top");
        this._$bottom = <HTMLElement>this._root.querySelector(".bottom");
        this._$bottom.addEventListener("click", (e) => {
            if (this._disabled !== true && event.target.dataset.value !== undefined) {
                if ( this._value !== event.target.dataset.value) {
                    this.dispatchEvent( new Event("change"));
                    this.value = event.target.dataset.value;
                }
            }
        });
        const initialValue = parseInt(this.getAttribute("value"));
        if ( !initialValue !== null) {
            this._value = initialValue;
            this._render();
        }
    }

    _render() {
        if ( this._$top !== null) {
            this._$top.style.width = ((this._value * 10) * 2 ) + "%";
        }
    }
    static get observedAttributes() {
        return ["disabled", "value"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if ( oldValue !== newValue) {
            switch (name) {
                case "disabled":
                    this._disabled = (newValue !== null);
                    break;
                case "value":
                    this._value = parseInt(newValue);
                    this._render();
                    break;
            }
        }
    }

}

window.customElements.define("rl-star-rating", RlStarRating);