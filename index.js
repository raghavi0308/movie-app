let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let APIKey = "e333704d";

// ✅ Function to fetch and display movie card
const getData = async (movie) => {
    try {
        let data = await fetch(`https://www.omdbapi.com/?apikey=${APIKey}&t=${encodeURIComponent(movie)}`);
        let jsonData = await data.json();

        if (jsonData.Response === "False") return;

        let div = document.createElement("div");
        div.classList.add("movieCard");
        div.innerHTML = `
            <img src="${jsonData.Poster}" alt="${jsonData.Title}">
            <div class="cardText">
                <h1>${jsonData.Title}</h1>
                <p class="rating">Rating : <span>${jsonData.Ratings[0]?.Value || "N/A"}</span></p>
                <a href="#" class="types">${jsonData.Genre}</a> 
                <p>Released : <span>${jsonData.Released}</span></p>
                <p>Duration : <span>${jsonData.Runtime}</span></p>
                <p>Plot : <span>${jsonData.Plot}</span></p>
            </div>
        `;
        document.querySelector(".card").appendChild(div);
    } catch (error) {
        console.log("Fetch error:", error);
    }
};

// ✅ Show default movies on initial load
document.addEventListener("DOMContentLoaded", () => {
    const defaultMovies = ["Iron Man", "Inception", "Interstellar", "The Dark Knight"];
    document.querySelector(".card").innerHTML = "";
    defaultMovies.forEach(movie => getData(movie));
});

// ✅ Search functionality
searchBtn.addEventListener("click", function () {
    let movieName = searchInput.value.trim();
    document.querySelector(".card").innerHTML = "";
    if (movieName !== "") {
        getData(movieName);
    } else {
        document.querySelector(".card").innerHTML = "<h1>Please enter a movie name.</h1>";
    }
});
