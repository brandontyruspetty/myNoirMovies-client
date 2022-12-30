import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {

  const [movies, setMovies] = useState([
    { id: 1,
    title: "Drive",
    image: "https://upload.wikimedia.org/wikipedia/en/1/13/Drive2011Poster.jpg",
    director: "Nicholas Winding Refn"
    },
    { id: 2,
      title: "The Third Man",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/The_Third_Man_%281949_American_theatrical_poster%29.jpg/440px-The_Third_Man_%281949_American_theatrical_poster%29.jpg",
      director: "Carol Reed"
      },
      { id: 3,
        title: "Le Samourai",
        image: "https://upload.wikimedia.org/wikipedia/en/2/28/LeSamourai.jpg",
        director: "Jean-Pierre Melville"
        }
  ]);
  
  
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
