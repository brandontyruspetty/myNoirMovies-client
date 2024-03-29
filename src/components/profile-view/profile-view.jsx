import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button, Card, CardGroup, Container, Row, Col, Form } from "react-bootstrap";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import "./profile-view.scss";

export const ProfileView = ({ movies }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [currentUsername, setUsername] = useState(storedUser ? storedUser : null);

const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const [birthday, setBirthday] = useState("");

function handleResponse(response) {
  return response.json().then((users) => {
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(users));
      setUserData(users);
    } else {
      if ([401, 403].includes(response.status) && auth?.token) {
      }

      const error = (users && users.message) || response.statusText;
      return Promise.reject(error);
    }

    return users;
  });
}

const getUserData = () => {
  const url = `https://mynoirmovies.herokuapp.com/users/${storedUser.Username}`;
  const bearer = `Bearer ${token}`;
  fetch(url, {
    method: "GET",
    headers: { Authorization: bearer },
  }).then(handleResponse);
};

useEffect(() => {
  getUserData();
}, []);

const isRequestValid = (userCredentials) => {
  if (!userCredentials.Username) {
    alert("Username required");
    return false;
  } else if (userCredentials.Username.length < 5) {
    alert("Username must be 5 or more characters");
    return false;
  }
  if (!userCredentials.Password) {
    alert("Password required");
    return false;
  } else if (userCredentials.Password.length < 6) {
    alert("Password must be 6 or more characters");
    return false;
  }
  if (!userCredentials.Email) {
    alert("Email required");
    return false;
  } else if (userCredentials.Email.indexOf("@") === -1) {
    alert("Email must be a valid email address");
    return false;
  }

  return true;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (!token) return;

  var userCredentials = {
    Username: e.target.elements.Username.value,
    Password: e.target.elements.Password.value,
    Email: e.target.elements.Email.value,
  };

  if (!isRequestValid(userCredentials)) return;
  
  const url = `https://myNoirMovies.herokuapp.com/users/${userData.Username}`;
  
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  };

  fetch(url, requestOptions)
    .then(handleResponse)
    .catch((e) => {
      alert("Something is Wrong");
    });
};

return (
  <Container>
    <Row>
      <Col xs={4} sm={4}>
        <Card bg="dark" text="light">
          <Card.Body>
            <UserInfo
              username={userData && userData.Username}
              email={userData && userData.Email}
              birthday={userData && userData.Birth_Date}
              />
          </Card.Body>
        </Card>
      </Col>
      <Col xs={8} sm={8}>
        <Card bg="dark" text="light">
          <Card.Body>
            <UpdateUser
              handleSubmit={handleSubmit}
              user={userData}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col xs={12} sm={12}>
        <Card bg="dark" text="light">
          <Card.Body>
            {userData && (
              <FavoriteMovies
                usersFavoriteMovies={movies.filter((user) =>
                  userData.FavoriteMovies.includes(user.id)
                  )}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
                




