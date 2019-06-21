import React from 'react';
import { Container, Box, Button, Heading, Text, TextField } from 'gestalt';

class SignUp extends React.Component {
  state = {
    username: "",
    email: "",
    password: ""
  }

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({ [event.target.name]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    if(!this.isFormEmpty(this.state)) {
      console.log("Submitted");
    }
  }

  isFormEmpty = ({ username, password, email }) => !email || !username || !password;

  render() {
    return (
      <Container>
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: '#ebe2da'
            }
          }}
          margin={4}
          padding={4}
          shape="rounded"
          display="flex"
          justifyContent="center"
        >
          {/* Sign Up Form */}
          <form 
            style={{
              display: 'inlignBlock',
              textAlign: 'center',
              maxWidth: 450
            }}
            onSubmit={this.handleSubmit}
          >
            {/* Sign Up Form Heading */}
            <Box
              marginBottom={2}
              display="flex"
              direction="column"
              alignItems="center"
            >
              <Heading color="midnight">Let's Get Started</Heading>
              <Text italix color="orchid">Sign up to order some brews!</Text>
            </Box>

            <TextField
              id="email"
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={this.handleChange}
            />

            <TextField
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
            />

            <TextField
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              color="blue"
              text="Submit"
              inline
            />
          </form>

        </Box>
      </Container>
    );
  }
}

export default SignUp;

