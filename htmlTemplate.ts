
function HTMLTemplate() {
    const movies = [
        {
            title: "Harry Potter",
            description: "Jeune homme a l'école des sorciers"
        },
        {
            title: "Star Trek",
            description: "Space travellers"
        },
        {
            title: "Avengers",
            description: "Group of friends"
        },
    ];

    const $movieTmpl = document.getElementById("movie");
    const $movies = document.getElementById("movies");
    movies.forEach(movie => {
        const $clone = document.importNode($movieTmpl.content, true);
        $clone.querySelector("h1").innerText = movie.title;
        $clone.querySelector("p").innerText = movie.description;
        $movies.appendChild($clone);
    });
};