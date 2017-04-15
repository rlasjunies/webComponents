window.onload = (e) => {
    const $div = document.getElementById("simple-div");

    $div.attachShadow({ mode: "open" });
    $div.shadowRoot.innerHTML = `
    <style>
        p {
            color: blue;
        }
    </style>
    <p>Contenu du shadow DOM</p>
`;
};
