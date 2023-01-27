import { Card, Button, Row, Container } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  console.log(movies);
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  console.log(movie)

  const addFavorite = (movieId) => {
    if (!token) return;

    const url = `${process.env.API_ENDPOINT}/users/${storedUser.Username}/movies/${movieId}`;
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((e) => {
          alert("Something is wrong");
        });
  };

  return (
   <Container>
    <Row>
      <Card bg="dark" text="light">
        <Card.Header>
          <div className="title-text-center">
            <span>{movie.title}</span>
          </div>
          <div>
          <span>Genre: </span>
          <span>{movie.genre}</span>
          </div>
         <Button
          className="fav-btn"
          size="sm"
          variant="secondary"
          onClick={() => addFavorite(movie.id)}
          >
          Add to Favorites
          </Button>
        </Card.Header>
        <Card.Body>
        <div>
          <Card.Img
           className="w-50" 
            src={movie.image} 
          />
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
        </div>
        <div>
          <span>Synopsis: </span>
          <span>{movie.description}</span>
        </div>
        </Card.Body>
        <Card.Footer>
          <Link to={`/`}>
            <Button className="back-button" style={{ cursor: "pointer" }}>
            Back
            </Button>
          </Link>
        </Card.Footer>
        </Card>
      </Row>
    </Container>
  );
};