import React from 'react';
import { Toast, Box } from 'gestalt';

const ToastMessage = ({ show, message }) => (
  <Box
    dangerouslySetInlineStyle={{
      __style: {
        bottom: 250,
        left: "50%",
        transform: "translateX(-50%)"
      }
    }}
    position="fixed"
  >
    {show && <Toast color="orange" text={message} />}
  </Box>
);

export default ToastMessage;
