import React from "react";
import { Button, Row, Col, Container, Card, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./favorite-movies.scss";
 
export const FavoriteMovies = ({ usersFavoriteMovies }) => {
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  
  const removeFavorite = (movieId) => {
    fetch(`${process.env.API_ENDPOINT}/users/${storedUser.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`},
      }
    ) 
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          localStorage.setItem("user", JSON.stringify(data));
          window.open(`/${storedUser.Username}`, "_self");
        }
      })
      .catch((e) => {
        alert("Something is wrong");
      });
  };

    return (
      <Container>
        <Row>
          <Col>
            <Card bg="dark" text="light">
              <Card.Body>
                <Col xs={12}>
                  <Card.Title className="favtitle">
                    Favorite Movies
                  </Card.Title>
                </Col>
                <Row>
                  {usersFavoriteMovies.map((movie) => {
                    return (
                      <Col
                        xs={12}
                        md={6}
                        lg={3}
                        key={movie._id}
                        className="fav-movie"
                        >
                          <Card bg="dark" text="light">
                            <Figure>
                              <Link to={`/movies/${movie._id}`}>
                                <Figure.Image
                                  crossorigins="anonymous"
                                  src={movie.image}
                                  alt={movie.title}
                                  />
                                  <Figure.Caption>{movie.title}</Figure.Caption>
                              </Link>
                            </Figure>
                            <Card.Footer>
                              <Button
                                className="btn-remove"
                                variant="secondary"
                                onClick={() => removeFavorite(movie._id)}
                                >
                                  Remove
                                </Button>
                            </Card.Footer>
                          </Card>
                        </Col>
                    )
                  })}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  export default FavoriteMovies;