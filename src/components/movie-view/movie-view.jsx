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

  const addFavorite = (movieId) => {
    if (!token) return;

    const url = `https://mynoirmovies.herokuapp.com/users/${storedUser.Username}movies/${movieId}`;
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer $(token)`,
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
         <Button
          className="fav-btn"
          size="sm"
          variant="secondary"
          onClick={addFavorite(movie._id)}
          >
          Add to Favorites
          </Button>
        </Card.Header>
        <Card.Body>
        <div>
          <Card.Img
           className="w-100" 
            src={movie.image} 
          />
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
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