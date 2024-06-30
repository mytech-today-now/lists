import React from 'react';

function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <p>Loading...</p>;
    return <Component {...props} />;
  };
}

export default withLoading;
