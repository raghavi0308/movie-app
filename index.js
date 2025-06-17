let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let APIKey = "e333704d";

const getData = async (movie) => {
  try {
   let data = await fetch(`https://www.omdbapi.com/?apikey=${APIKey}&t=${encodeURIComponent(movie)}`);
    let jsonData = await data.json();

    if (jsonData.Response === "False") {
      document.querySelector(".card").innerHTML = `<h1>${jsonData.Error}</h1>`;
      return;
    }

    const rating = jsonData.Ratings.length > 0 ? jsonData.Ratings[0].Value.slice(0, 3) : "N/A";

    document.querySelector(".card").innerHTML = "";
    searchInput.value = "";

    let div = document.createElement("div");
    div.classList.add("movieCard");
    div.innerHTML = `
      <img src="${jsonData.Poster}" alt="">
      <div class="cardText">
          <h1>${jsonData.Title}</h1>
          <p class="rating">Rating : <span>${rating}</span></p>
          <a href="#" class="types">${jsonData.Genre}</a> 
          <p>Released : <span>${jsonData.Released}</span></p>
          <p>Duration : <span>${jsonData.Runtime}</span></p>
          <p>Plot : <span>${jsonData.Plot}</span></p>
      </div>
    `;
    document.querySelector(".card").appendChild(div);
  } catch (error) {
    document.querySelector(".card").innerHTML = "<h1>Something went wrong. Try again.</h1>";
    console.log(error);
  }
};

document.querySelector(".card").innerHTML = "<h1>Search Movie Information Here.</h1>";

searchBtn.addEventListener("click", function () {
  let movieName = searchInput.value.trim();
  if (movieName !== "") {
    getData(movieName);
  } else {
    document.querySelector(".card").innerHTML = "<h1>Search Movie Name</h1>";
  }
});
