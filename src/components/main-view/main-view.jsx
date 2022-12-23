import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";



export const MainView = () => {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/movies")
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

  if (!user) {
    return <LoginView onLogggedIn={(user) => setUser(user)} />;
  }
  
  if (selectedMovie) {
    return (
      <>
      <button
      onClick={() => {
        setUser(null);
      }}
      >
        Logout
      </button>
      <MovieView movie={selectedMovie} 
      onBackClick={() => setSelectedMovie(null)} 
      />
      </>
    );
  }

  if (movies.length === 0) {
    return (
      <>
      <button
      onClick={() => {
        setUser(null)
      }}
      >
        Logout
      </button>
    <div>The list is empty!</div>
    </>
    );
  }

  return (
    <div>
      <button>
        onClick={() => {
          setUser(null);
        }}
        >
        Logout
      </button>
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
