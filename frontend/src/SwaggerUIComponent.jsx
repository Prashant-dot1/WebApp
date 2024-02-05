import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUIComponent = () => {
  return (
    <SwaggerUI
      url="http://localhost:3000/api-docs" // Update with your server URL
    />
  );
};

export default SwaggerUIComponent;
