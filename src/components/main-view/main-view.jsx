import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
//import { LoginView }
//import { SignupView }
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";




export const MainView = () => {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  //const [user, set User]

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

  return (
    <Row className="justify-content-md-center">
       {/* {!user ? ( 
          <Col md={5}>
            <LoginView onLoggedIn={(user)} => setUser(user)} />
            or
            <SignupView />
          </Col>
  )  */}
  : selectedMovie ? (
    <Col md={8}>
      <MovieView
      movie={selectedMovie} 
      onBackClick={() => setSelectedMovie(null)} 
      />
      </Col>
  ) : movies.length === 0 ? (
     <div>The list is empty!</div>
  ) : (
    <>
      {movies.map((movie) => (
        <Col className="mb-5" key={movie.id} md={3}>
          <MovieCard 
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }} 
          />
        </Col>
      ))}
      </>
    )}
    </Row>
  );
};
