import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


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

   
    return ( 
      <Row className="justify-content-md-center">
        {!user ? (
            <Col md={5}>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token); 
              }} />
              or
              <SignupView />
            </Col>

    ) : selectedMovie ? (
      <>
        <Col md={8}>
          <MovieView 
            movie={selectedMovie} 
            onBackClick={() => setSelectedMovie(null)} 
          />
        </Col>
      <button
      onClick={() => {
        setUser(null);
        setToken(null);
        localStorage.clear();
      }}
      >
        Logout
      </button>
      </>
      
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
