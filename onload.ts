function onLoad() {
    shadowDOM();
    HTMLTemplate();
    component();

    const $open = document.getElementById("btnOpen");
    const $close = document.getElementById("btnClose");
    const $menu = document.getElementById("menu");

    $open.addEventListener("click", e => {
        $menu.open = true;
    });

    $close.addEventListener("click", e => {
        $menu.open = false;
    });

    $menu.addEventListener("menu-opened", e => {
        console.log("Menu opened!");
    });

    $menu.addEventListener("menu-closed", e => {
        console.log("Menu closed!");
    });
}