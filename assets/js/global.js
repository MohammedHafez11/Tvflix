const addEventOnElements = function(elements, eventType, callback){
    for(const elemn of elements) elemn.addEventListener(eventType, callback);
}


const searchBox = document.querySelector("[search-box]");
const searchToggler = document.querySelectorAll("[search-toggler]");

addEventOnElements(searchToggler, "click", function(){
    searchBox.classList.toggle("active");
})


const getMovieDetail = function(movieId){
    window.localStorage.setItem("movieId", String(movieId));
}

const getMovieList = function(urlParam, genreName){
    window.localStorage.setItem("urlParam", urlParam);
    window.localStorage.setItem("genreName", genreName);
}