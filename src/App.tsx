import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CurrentRequestProvider } from './context/CurrentRequestContext';

import Home from './pages/Home';
import AddItems from './pages/AddItems';
import ReviewRequest from './pages/ReviewRequest';
import History from './pages/History';
import RequestDetail from './pages/RequestDetail';
import ProductManagement from './pages/ProductManagement';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <CurrentRequestProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-items" element={<AddItems />} />
          <Route path="/review" element={<ReviewRequest />} />
          <Route path="/history" element={<History />} />
          <Route path="/history/:id" element={<RequestDetail />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </CurrentRequestProvider>
    </BrowserRouter>
  );
}