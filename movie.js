let APIKey = "17f8307a";
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".card").innerHTML = "<h1>Search Movie Information Here</h1>";
});

const getData = async (movie) => {
  try {
    let fetchData = await fetch(`http://www.omdbapi.com/?apikey=${APIKey}&t=${movie}`);
    let jsonData = await fetchData.json();

    if (jsonData.Response === "False") {
      document.querySelector(".card").innerHTML = "<h1>Movie Not Found</h1>";
      return;
    }

    const rating = jsonData.Ratings.length > 0 ? jsonData.Ratings[0].Value : "N/A";

    document.querySelector(".card").innerHTML = "";
    searchInput.value = "";

    let div = document.createElement("div");
    div.classList.add("movieCard");
    div.innerHTML = `
      <img src="${jsonData.Poster}" alt="${jsonData.Title}">
      <div class="cardText">
          <h1>${jsonData.Title}</h1>
          <p class="rating">Rating : <span>${rating}</span></p>
          <a href="#">${jsonData.Genre}</a>
          <p>Release : <span>${jsonData.Released}</span></p>
          <p>Duration : <span>${jsonData.Runtime}</span></p>
          <p>Description : <span>${jsonData.Plot}</span></p>
      </div>
    `;
    document.querySelector(".card").appendChild(div);

  } catch (error) {
    document.querySelector(".card").innerHTML = "<h1>Something went wrong. Try again!</h1>";
    console.error(error);
  }
};

searchBtn.addEventListener("click", () => {
  let movieName = searchInput.value.trim();
  if (movieName !== "") {
    getData(movieName);
  } else {
    document.querySelector(".card").innerHTML = "<h1>First Search Movie Name</h1>";
  }
});
