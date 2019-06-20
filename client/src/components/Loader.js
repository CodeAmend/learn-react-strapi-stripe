import React from 'react';
import { Box } from 'gestalt';
import { PacmanLoader } from 'react-spinners';

console.log(PacmanLoader);

const Loader = ({ show }) => (
  show && <Box
    position="fixed"
    dangerouslySetInlineStyle={{
      __style: {
        left: "50%",
        transform: "translateX(-50%)",
        bottom: "300px"
      }
    }}
  >
    <PacmanLoader color="darkorange" size={30} />
  </Box>
);

export default Loader;
