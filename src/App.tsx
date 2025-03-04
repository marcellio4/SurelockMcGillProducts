import './App.css';
import { Route, Routes } from 'react-router-dom';

import Main from './components/Main';
import ProductDetails from './components/ProductDetails';
import NoMatch from './components/NoMatch';
import { Suspense } from 'react';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/products/:id" element={<Suspense>
        <ProductDetails />
      </Suspense>} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}

export default App;
