function component(e) {

    const $link = document.getElementById("MyComponent");
    const myComp = <Node>$link.import.querySelector(".component");

    const container = document.getElementById("componentContainer");
    container.appendChild(myComp.cloneNode(true));
}