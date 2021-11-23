
const API_URL = 'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=6a4f5a27b523be2f76d8dbd45d25a4fd&page=1'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280' 

// we will add the query at last for search
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=6a4f5a27b523be2f76d8dbd45d25a4fd&query="'

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById("search");


// get initial movies
getMovies(API_URL);

//making request 
// and fetch the movies by url
async function getMovies(url) {
    const res = await fetch(url)
    //we want the actual data i.e json 
    const data  = await res.json() 

    // console.log(data.results) c
// put the data into the DOM using this function
    showMovies(data.results)
} 

// event listener on the form  
form.addEventListener('submit' , (e) =>{
   
    e.preventDefault() 

    const searchTerm = search.value;

    if(searchTerm && searchTerm!=''){
        getMovies(SEARCH_API + searchTerm);
         search.value = '' ;

    }else{
        window.location.reload();
    }
})  


function showMovies(movies){ 
    //we want the blank page initially
    // dont want it top of initial ovies
    MediaDeviceInfo.innerHTML = '' ;

    //loop over the data of movies that we got  
    movies.forEach((movie) => {
        //get the elements required of the movie object
        const { title,poster_path,vote_average,
        overview,release_date } = movie ;

        // create a div to show all this info 
            const movieEl = document.createElement('div')
            movieEl.classList.add('movie');

            movieEl.innerHTML = `
            
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3> 
                <div class="date">${release_date}</div>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div> 
            <div class="overview">
                <h3>Overview</h3>
               ${overview}
        </div>    
            ` 
            main.appendChild(movieEl);
    })
}  

function getClassByRate(vote){
    if(vote >= 8){
        return 'green';
    }else if(vote >= 5){
        return 'orange';
    }else {
        return 'red';
    }
} 



