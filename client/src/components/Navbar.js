import React from 'react';
import { Box, Text, Heading, Image } from 'gestalt';
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {
  state = {

  }
  render() {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="around"
        height={70}
        color="midnight"
        padding={1}
        shape="rounded"
      >
        {/* Sign In Link */}
        <NavLink activeClassName="active" to="/signin">
          <Text size="xl" color="white">Sign In</Text>
        </NavLink>

        {/* Sign In Logo */}
        <NavLink activeClassName="active" exact to="/">
          <Box display="flex" alignItems="center" justifyContent="between">
            <Box width={50} height={50}>
              <Image 
                alt="BrewHaHa Logo"
                naturalHeight={1}
                naturalWidth={1}
                src="./icons/logo.svg"
              />
            </Box>
            <Heading size="xs" color="orange">
              BrewHouse
            </Heading>
          </Box>
        </NavLink>

        {/* Sign In Link */}
        <NavLink activeClassName="active" to="/signup">
          <Text size="xl" color="white">Sign Up</Text>
        </NavLink>
      </Box>
    );
  }
}

export default Navbar;

