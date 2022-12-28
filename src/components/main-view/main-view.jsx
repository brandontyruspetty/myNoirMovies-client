import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";




export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  useEffect(() => {
    if (!token) return;

    //fetch("http://localhost:8080/movies", {
      fetch(`${process.env.API_ENDPOINT}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
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
  }, [token]);

  if (!user) {
    return ( 
      <>
    <LoginView 
      onLoggedIn={(user, token) => {
        setUser(user);
        setToken(token);
      }}
       />
       or
       <SignupView />
       </>
    );
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
      <button
        onClick={() => {
          setUser(null); setToken(null); localStorage.clear();
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
