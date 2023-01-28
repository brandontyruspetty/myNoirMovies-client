import { useState, useEffect, Modal } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [searchInput, setSearchInput] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("title");

  useEffect(() => {
    if (!token) return;

      //fetch(`${process.env.API_ENDPOINT}/movies`, {
      fetch("https://mynoirmovies.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.map((movie) => {
        return {
          id: movie._id,
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

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };
   
  const handleFilterSelection = (e) => {
    setFilterCriteria(e.target.value);
  };

  const filteredMovies = movies.filter((movie) => {
    if (filterCriteria === "title") {
      return movie.title.toLowerCase().includes(searchInput.toLowerCase());
    }
    if (filterCriteria === "genre") {
      return movie.genre.toLowerCase().includes(searchInput.toLowerCase());
    }
    if (filterCriteria === "director") {
      return movie.director.toLowerCase().includes(searchInput.toLowerCase());
    }
  });

    return ( 
       <BrowserRouter>
       <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          setSearchInput("");
          setFilterCriteria("title");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }}
        handleSearchInput={(e) => setSearchInput(e.target.value)}
        handleFilterSelection={(e) => setFilterCriteria(e.target.value)}
      />
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to ="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView onLoggedIn={(user) => setUser(user)} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView movies={movies} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <>
                      {filteredMovies.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                          <MovieCard 
                            movie={movie} />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
          <Route
            path="/users"
            element={
              <>
               {!user ? (
                <Navigate to="/login" replace />
               ) : (
                <Col md={8}>
                  <ProfileView movies={movies} />
                </Col>
               )}
              </>
              }
            />
      </Routes>
    </Row>
  </BrowserRouter>
  );
};
