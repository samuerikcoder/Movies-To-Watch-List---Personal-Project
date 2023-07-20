import { Movies } from "./movies.js";
import { Confirm } from "./confirm.js";

export class MovieView extends Movies {
    constructor(root) {
        super(root);
        this.refresh();
        this.getSearch();
    }

    getSearch() {
        const searchButton = document.querySelector('button.send');

        searchButton.addEventListener('click', () => {
            const movieTitle = document.querySelector('input#movie-name').value;
            const movieYear = document.querySelector('input#movie-year').value || '';

            this.getMovie(movieTitle, movieYear);
            document.querySelector('input#movie-name').value = '';
            document.querySelector('input#movie-year').value = '';
        });
    }

    refresh() {
        this.dropRows();
        this.movies.forEach(movie => {
            const row = this.createRow();

            row.querySelector('.poster img')
            .src = movie.Poster;

            row.querySelector('.poster img')
            .alt = `A poster of the movie ${movie.Title}`;

            row.querySelector('.title')
            .textContent = movie.Title;

            row.querySelector('.year')
            .textContent = movie.Year;

            row.querySelector('.genre')
            .textContent = movie.Genre;

            row.querySelector('.released')
            .textContent = movie.Released;

            row.querySelector('.type')
            .textContent = (movie.Type).toUpperCase();

            row.querySelector('.drop')
            .addEventListener('click', async () => {

                const confirm = new Confirm('.confirm-box');
                confirm.open();
                const isConfirm = await confirm.confirmation();

                if(isConfirm) {
                    row.style.backgroundColor = 'rgb(63, 199, 154)';
                    setTimeout(() => {
                        row.style.backgroundColor = '';
                    }, 500);
                    
                    setTimeout(() => {
                        this.delete(movie);
                    }, 900);
                }
            });

            this.tbody.append(row);
        });
    }

    dropRows() {
        this.tbody.querySelectorAll('tr').
        forEach(row => row.remove());
    }

    createRow() {
        const row = document.createElement('tr');
        const internHTMLContent = `
                        <td class="poster">
                            <img src="" alt="">
                        </td>
                        <td data-cell="movie" class="movie">
                            <p class="title"></p>
                            <span class="year"></span>
                        </td>
                        <td data-cell="genre" class="genre">

                        </td>
                        <td data-cell="released" class="released">
                            
                        </td>
                        <td data-cell="type" class="type">

                        </td>
                        <td>
                            <button class="drop">
                                Watched
                            </button>
                        </td>
        `

        row.innerHTML = internHTMLContent;
        
        return row;
    }
}