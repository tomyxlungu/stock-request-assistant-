<<<<<<< HEAD
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
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrentRequestProvider } from "./context/CurrentRequestContext";
import { useState } from "react";

import Home from "./pages/Home";
import AddItems from "./pages/AddItems";
import ReviewRequest from "./pages/ReviewRequest";
import History from "./pages/History";
import RequestDetail from "./pages/RequestDetail";
import ProductManagement from "./pages/ProductManagement";
import Settings from "./pages/Settings";


import SplashScreen from "./components/SplashScreen";
import PageTransition from "./components/PageTransition";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <div className="bg-zinc-950 min-h-screen">
      <BrowserRouter>
        <CurrentRequestProvider>

          {showSplash && (
            <SplashScreen onFinish={handleSplashFinish} />
          )}

          {!showSplash && (
            <>
              <Routes>

                <Route element={<PageTransition />}>

                  <Route path="/" element={<Home />} />

                  <Route
                    path="/add-items"
                    element={<AddItems />}
                  />

                  <Route
                    path="/review"
                    element={<ReviewRequest />}
                  />

                  <Route
                    path="/history"
                    element={<History />}
                  />

                  <Route
                    path="/history/:id"
                    element={<RequestDetail />}
                  />

                  <Route
                    path="/products"
                    element={<ProductManagement />}
                  />

                  <Route
                    path="/settings"
                    element={<Settings />}
                  />

                </Route>

              </Routes>

              <BottomNav />
            </>
          )}

        </CurrentRequestProvider>
      </BrowserRouter>
    </div>
>>>>>>> cc155ab (app done)
  );
}