const sidebar = function(){
    const genreList = {};
    fetchDateFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, function({ genres }){
        for(const { id, name } of genres){
            genreList[id] = name;
        }
        genreLink();
    });

    const sidebarInner = document.createElement("div");
    sidebarInner.classList.add("sidebar-inner");
    sidebarInner.innerHTML = `
<div class="sidebar-list">

    <p class="title">General</p>
  
    
</div>

<div class="sidebar-list">

    <p class="title">Language</p>
    <a href="movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=en", "English")'>English</a>
    <a href="movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=hi", "Hindi")'>Hindi</a>
    <a href="movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=bn", "Bengali")'>Bengali</a>
</div>

<div class="sidebar-footer">
    <p class="copy-right">Copyright 2023</p>
    <img src="assets/images/tmdb-logo.svg" width="130" height="17" alt="" srcset="">
</div>

    `
    const genreLink = function(){
        for(const [genreId, genreName] of Object.entries(genreList)){
            const Link = document.createElement("a");
            Link.classList.add("sidebar-link");
            Link.setAttribute("href", "./movie-list.html");
            Link.setAttribute("menu-close", "");
            Link.setAttribute("onclick", `getMovieList("with_genres=${genreId}", "${genreName}")`);
            Link.textContent = genreName;
            sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(Link);
        }
        const sidebar = document.querySelector("[sidebar]");
        sidebar.appendChild(sidebarInner);
        toggleSidebar(sidebar);
    }
    const toggleSidebar = function(sidebar){
        const sidebarBtn = document.querySelector("[menu-btn]");
        const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
        const sidebarClose = document.querySelectorAll("[menu-close]");
        const overlay = document.querySelector("[overlay]");

        addEventOnElements(sidebarTogglers, "click", function(){
            sidebar.classList.toggle("active");
            sidebarBtn.classList.toggle("active");
            overlay.classList.toggle("active");
        });
        addEventOnElements(sidebarClose, "click", function(){
            sidebar.classList.remove("active");
            sidebarBtn.classList.remove("active");
            overlay.classList.remove("active");
        });
    }
}
sidebar();