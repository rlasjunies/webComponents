class RlSlideMenu extends HTMLElement {
    _root: ShadowRoot = this.attachShadow({ mode: "open" });
    _open: boolean = false;
    _$frame: Node = null;

    constructor() {
        super();
    }

    set open(value: boolean) {
        const result = ( value === true);
        if ( this._open === result) return;
        this._open = result;
        this._render();
    }

    get open() {
        return this._open;
    }

    connectedCallback() {
        this._root.innerHTML = `
        <style>
            :host([theme="red"]) .title {
                background-color: #E23F24;
                color: white;
            }

            :host([theme="blue"]) .title {
                background-color: blue;
                color: white;
            }

            .frame {
                position: fixed;
                top: 0;
                bottom: 0;
                width: 100%;
                overflow: hidden;
                pointer-events: none;
                z-index: 1000;
                transition: background-color 300ms ease-in;
            }

            .container {
                width: 80%;
                max-width: 400px;
                background: #FFF;
                height: 100%;
                transform: translateX(-100%);
                will-change: transform;
                transition: transform 300ms easi-in;
                box-shadow: 1px 0 3px rgba(51, 51, 51, 0, 25);
            }

            .title {
                display: flex;
                flex-direction: row;
                min-height: 3.2em;
                font-size: 1.5em;
                background-color: #F1F1F1;
                color: #666;
            }

            .title .title-content {
                flex-grow: 1;
                display: flex;
                align-items: center;
                padding-left: 1em;
            }

            .close {
                flex-basis: 100px;
                flex-grow: 0;
                flex-shrink: 0;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                user-select: none;
            }

            .frame.open {
                pointer-events: auto;
                background-color: rgba(0,0,0,0.25);
            }

            .frame.open .container {
                transform: none;
            }

            :host([backdrop="false"]) .frame.open {
                pointer-events: none;
                bakground-color: inherit;
            }

            :host([backdrop="false"]) .frame.open .container {
                pointer-events: auto;
            }


        </style>
        <div class="frame" data-close="true">
            <nav class="container">
                <div class="title">
                    <div class="title-content">
                        Menu
                    </div>
                    <a class="close"  data-close="true">&#10006;</a>
                </div>
                <div class="content">
                    <slot></slot>
                </div>
            </nav>
        </div>
        `;

        this._$frame = <HTMLElement>this._root.querySelector(".frame");
        this._$frame.addEventListener("click", e => {
            if ( e.target.dataset.close === "true") {
                this.open = false;
            }
        })
    }

    _render() {
        if ( this._$frame !== null ) {
            if ( this._open === true) {
                this._$frame.classList.add("open");
                this.dispatchEvent(new CustomEvent("menu-opened"));
            } else {
                this._$frame.classList.remove("open");
                this.dispatchEvent(new CustomEvent("menu-closed"));
            }
        }
    }
}

window.customElements.define("rl-slide-menu", RlSlideMenu);