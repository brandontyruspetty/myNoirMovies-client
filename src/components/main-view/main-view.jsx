import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";



export const MainView = () => {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch("https://mynoirmovies.herokuapp.com/movies")
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.map((movie) => {
        return {
          id: movie.key,
          title: movie.Title,
          image: movie.ImagePath,
          genre: movie.Genre.Name,
          description: movie.Description,
          director: movie.Director.Name
        };
      });
      
      setMovies(moviesFromApi);
    });
  }, []);

  

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
