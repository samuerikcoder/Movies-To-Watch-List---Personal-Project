import { MoviesData } from "./moviesdata.js";
import { Modal } from "./modal.js";
export class Movies {
    constructor(root) {
        this.root = document.querySelector(root);
        this.tbody = this.root.querySelector('tbody');
        this.load();
    }

    async getMovie(movieName, movieYear = '') {
        try {

            if(movieYear !== '') {
                if(isNaN(movieYear)) {
                    throw new Error('The year must be of the numeric type');
                }
            }
            
            const movie = await MoviesData.get(movieName, movieYear);
            const isMovieRegistred = this.movies.find(item => item.Title === movie.Title
                && item.Released === movie.Released);
            if(isMovieRegistred) {
                throw new Error('Film already recorded !');
            }

            if (movie.Title === undefined) {
                throw new Error('Movie not found: check the title and/or year and try again!')
            }
            this.movies = [movie, ...this.movies];
            this.save();
            this.refresh();
        }
        catch(error) {
            const modal = new Modal('.modal-box');
            modal.message(error.message);
            modal.open();
        }
    }

    register() {
        localStorage.setItem('registredMovies:', JSON.stringify(this.movies));
    }

    load() {
        this.movies = JSON.parse(localStorage.getItem(('registredMovies:'))) || [];
    }

    delete(movie) {
        this.movies = this.movies.filter(item => item.Title != movie.Title 
            || item.Released != movie.Released);
        this.register();
        this.refresh();
    }

} 