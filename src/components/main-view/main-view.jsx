import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
  const [movies, setMovies] = useState([
    { 
      id: 1, 
      title: "Le Samourai",
      image: "https://s3.amazonaws.com/criterion-production/films/9bee98615a85bea1878af49ba320ca40/WvMVqQiUO8W03H1PGJcf0J5s64wNJe_large.jpg",
      director: "Jean-Pierre Melville"
    },
    { 
      id: 2, 
      title: "Drive",
      image: "https://upload.wikimedia.org/wikipedia/en/1/13/Drive2011Poster.jpg",
      director: "Niocholas Winding Refn"
    },
    { 
      id: 3, 
      title: "The Third Man",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/The_Third_Man_%281949_American_theatrical_poster%29.jpg/440px-The_Third_Man_%281949_American_theatrical_poster%29.jpg",
      director: "Carol Reed"
    }
  ]); //

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>
  }

  return (
    <div>
      {movies.map((movie) => {
         return <MovieCard 
         key={movie.id}
         movie={movie}
         onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
         }} 
         />
        })}
    </div>
  );
};