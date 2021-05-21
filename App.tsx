import React from 'react';
import Routes from './src/routes';
import defineInterceptor from './src/util/defineIntercepto';


export default function App() {
  defineInterceptor()
  return (
    < Routes />
  )
}

