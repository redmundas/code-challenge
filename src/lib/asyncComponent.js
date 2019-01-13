import React, { lazy, Suspense } from 'react';

export default function(component) {
  const AsyncComponent = lazy(component);
  return props => (
    <Suspense fallback={<div>Loading...</div>}>
      <AsyncComponent {...props} />
    </Suspense>
  );
}
