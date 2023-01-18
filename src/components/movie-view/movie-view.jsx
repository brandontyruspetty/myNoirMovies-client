import { Card, Button, CardGroup, Row, Container } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  console.log(movies);

  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  return (
   <Container>
    <Row>
      <Card bg="dark" text="light">
        <Card.Header>
          <div className="title-text-center">
            <span>Title: </span>
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
          <img className="w-100" 
          src={movie.image} 
          />
        </div>
        </Card.Body>
       
       
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
        </div>
        <Link to={`/`}>
          <button className="back-button" style={{ cursor: "pointer" }}>
          Back
          </button>
        </Link>
        </Card>
        </Row>
      </Container>
  );
};