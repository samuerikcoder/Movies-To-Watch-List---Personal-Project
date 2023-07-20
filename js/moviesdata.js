import { SECRET_API_KEY } from "./apikey.js";

export class MoviesData {
    static get(movieName, movieYear='') {
        String(movieName).trim().replace(' ', '_');
        const API_KEY = SECRET_API_KEY;
        const URL = `https://www.omdbapi.com/?t=${movieName}&y=${movieYear}&apikey=${API_KEY}`;

        return fetch(URL)
                .then(data => data.json())
                .then(({
                    Title,
                    Year,
                    Released,
                    Genre,
                    Poster,
                    Type
                }) => ({
                    Title,
                    Year,
                    Released,
                    Genre,
                    Poster,
                    Type
                }));
    }
}