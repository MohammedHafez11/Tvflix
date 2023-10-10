const pageContentForMovieList = document.querySelector("[page-content]");
const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");

let currentPage = 1;

let totalPages = 0;

fetchDateFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, function({results: movieList, total_Pages}){
  totalPages = total_Pages;
  document.title = `${genreName} Movies - Tvflix`;
  const movieListElem = document.createElement("section");
  movieListElem.classList.add("movie-list", "genere-list");
  movieListElem.ariaLabel = `${genreName} Movies`;
  movieListElem.innerHTML = `
  <div class="title-wrapper">
                <h1 class="heading">All ${genreName} Movies</h1>
            </div>
            <div class="grid-list"></div>
            <button class="btn load-more" load-more>Load More</button>
  `
  for(const movie of movieList){
    const movieCard = createMovieCard(movie);
    movieListElem.querySelector(".grid-list").appendChild(movieCard);
  }
  pageContentForMovieList.appendChild(movieListElem);

  document.querySelector("[load-more]").addEventListener("click", function(){
    if(currentPage >= totalPages){
        this.style.display = "none";
        return;
    }
    currentPage++;
    this.classList.add("loading");
    fetchDateFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, ({results: movieList}) =>{
        this.classList.remove("loading");
        for(const movie of movieList){
            const movieCard = createMovieCard(movie);
            movieListElem.querySelector(".grid-list").appendChild(movieCard);
        }
    })
  })
});

search();