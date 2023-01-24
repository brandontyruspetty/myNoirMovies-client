import React from "react";
import { Button, Form, Col, Row, Container, Card, CardGroup } from "react-bootstrap";
import "./update-user";

function UpdateUser({ handleSubmit, user }) {
  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card bg="dark" text="light">
              <Card.Body>
                <Form
                  className="profile-form"
                  onSubmit={(e) => handleSubmit(e)}
                  >
                    <Form.Group>
                      <h4>Want to change your information?</h4>
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        name="Username"
                        defaultValue={user && user.Username}
                        placeholder="Type your new Username"
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        name="Password"
                        placeholder="Type your new Password"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="email"
                        name="Email"
                        defaultValue={user && user.Email}
                        placeholder="Type your Email"
                      />
                    </Form.Group>
                    <Card.Footer>
                      <Button
                        variant="primary"
                        type="submit"
                        className="btn-primary"
                      >
                        Update
                      </Button>
                  </Card.Footer>
                </Form>
               </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

<Button variant="primary" type="submit" className="btn-login">
  Register
</Button>;

export default UpdateUser;
