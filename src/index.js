//write your code 

document.addEventListener('DOMContentLoaded', () => {
    // Fetch the details of the first movie and display them
    fetch('http://localhost:3000/films/1')
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not fetch resource");
            }
            return response.json();
        })
        .then(movie => {
            displayMovieDetails(movie);
        })
        .catch(error => console.error(error));

    // Fetch all movies and populate the films menu
    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(movies => {
            movies.forEach((movie) => {
                populateFilmsMenu(movie);
            });
        })
        .catch(error => console.error(error));

    // Function for displaying movie details
    function displayMovieDetails(movie) {
        const moviePoster = document.getElementById('poster');
        const movieTitle = document.getElementById('title');
        const movieRuntime = document.getElementById('runtime');
        const movieShowtime = document.getElementById('showtime');
        const movieDescription = document.getElementById('film-info');
    
        const availableTickets = movie.capacity - movie.tickets_sold;

        moviePoster.src = movie.poster;
        movieTitle.textContent = movie.title;
        movieShowtime.textContent = `Showtime: ${movie.showtime}`;
        movieRuntime.textContent = `${movie.runtime} mins`;
        movieDescription.textContent = movie.description; // Display movie description
        document.getElementById('ticket-num').textContent = `${availableTickets}`;

        
      
    }

    // Buy ticket button click
    document.getElementById('buy-ticket').addEventListener('click', () => {
        //console.log(availableTickets)
        console.log(document.getElementById('ticket-num').textContent.split(' '))
        let ticketNumber = document.getElementById('ticket-num').textContent.split(' ')
        let newTicketValue = parseInt(ticketNumber[0]) - 1
        if (parseInt(ticketNumber[0]) > 0) {
            document.getElementById('ticket-num').textContent = newTicketValue;
        } else {
            alert("Tickets sold out");
        }
    });

    
    // Function for populating the films menu
    function populateFilmsMenu(movie) {
        const filmsMenu = document.getElementById('films');
        const li = document.createElement('li');
        li.textContent = movie.title;
        li.dataset.id = movie.id;
        if (movie.tickets_sold === movie.capacity) {
            li.classList.add('sold-out');
            li.textContent += " (Sold Out)";
        }
        filmsMenu.appendChild(li);
    }

    // Clicking on a movie in the menu should replace the currently displayed movie's details with the new movie details
    document.getElementById('films').addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const movieId = event.target.dataset.id;
            fetch(`http://localhost:3000/films/${movieId}`)
                .then(response => response.json())
                .then(movie => {
                    displayMovieDetails(movie);
                })
                .catch(error => console.error(error));
        }
    });

});
