import movies from './movies.js';


const input = document.getElementById('input');
const resultList = document.querySelector('.list');
const Createbutton = document.getElementById('create-button');
const movieContent = document.querySelector('.content');
const movieTitle = document.querySelector('#title');
const movieDescription = document.querySelector('#description');
const poster = document.querySelector('#image');



function validateInput(searchTerm) {
    return searchTerm.length >= 2;
}

function searchMovies(searchTerm) {
    const matches = movies.filter(movie => {
        const title = movie.title.toLowerCase();
        return title.includes(searchTerm);
    });
    return matches;
}



function displayMovies(matches) {
    resultList.innerHTML = '';
    if (matches.length > 0) {
        const limitedMatches = matches.slice(0, 5);
        const ul = document.createElement('ul');

        limitedMatches.forEach(movie => {
            const li = document.createElement('li');
            li.textContent = movie.title;
            li.addEventListener('click', function() {
                displayMovieDetails(movie);
                input.value = movie.title;
                setTimeout(() => ul.innerHTML = '', 10);
            });
            ul.appendChild(li);
        });

        resultList.appendChild(ul);
    } else {
        resultList.innerHTML = '<li>Movie not found</li>';
    }
}


function listMovies(searchTerm) {
    const matches = searchMovies(searchTerm.toLowerCase());
    displayMovies(matches);
}


function handleInput() {
    const searchTerm = input.value.toLowerCase();
    if (validateInput(searchTerm)) {
        listMovies(searchTerm);
    } else {
        resultList.innerHTML = '';
    }
}

input.addEventListener('input', handleInput);


// Function to display details of a selected movie
function displayMovieDetails(movie) {
   movieTitle.innerHTML = movie.title;
    movieDescription.innerHTML = `
        <strong>Year:</strong> ${movie.year}<br>
        <strong>Running Time:</strong> ${movie.runningTime}<br>
        <strong>Description:</strong> ${movie.description}<br>
        <strong>Genre:</strong> ${movie.genre}<br>
    `;
    poster.src = movie.poster;
}