const api_key = '18a13457306e5b74657d4b03f6930906';

const imageBaseURL = 'https://image.tmdb.org/t/p/';

const fetchDateFromServer = function(url, callback, optionalParam){
    fetch(url).then(response => response.json())
    .then(data => callback(data, optionalParam));
}



const homePageSection = [
    {
        title: "Upcoming Movies",
        path: "/movie/upcoming"
    },
    {
        title: "Trending Movies",
        path: "/trending/movie/week"
    },
    {
        title: "Top Rated Movies",
        path: "/movie/top_rated"
    }
]

const genreList = {
    asString(genreIdList){
        let newGenreList = [];
        for(const genreId of genreIdList){
            this[genreId] && newGenreList.push(this[genreId])
        }
        return newGenreList.join(", ");
    }
};


    fetchDateFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, function({ genres }){
        for(const { id, name } of genres){
            genreList[id] = name;
        }
        fetchDateFromServer(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=1`, heroBanners);
    });
