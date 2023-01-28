import React from 'react';
import { Button, Card, Row, Container } from "react-bootstrap";

export const UserInfo = ({ username, email }) => {
  const token = localStorage.getItem("token");

  const handleDelete = (e) => {
    if (username && token) {
      let confirmDelete = confirm(
        "Are you sure you want to delete your account?"
      );
      if (!confirmDelete) return;
      fetch(`https://mynoirmovies.herokuapp.com/users/${username}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer $(token)`},
    })
      .then((response) => {
        if (response.ok) {
          alert("Your account was deleted.");
          localStorage.clear();
          window.open("/", "_self");
        } else {
          alert(response.statusText);
        }
      })
      .catch((e) => {
        alert("Something is wrong");
      });
    }
  };

  return (
    <>
      <h4> Your Info </h4>
      <p>Name: {username}</p>
      <p>Email: {email}</p>
      <Button variant="outline-danger" onClick={handleDelete}>
        Delete Account
      </Button>
    </>
  );
};
export default UserInfo


