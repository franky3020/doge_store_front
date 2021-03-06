import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductApp from "./pages/ProductApp";
import ProductDetail from './pages/ProductDetail';
import AdminPageV2 from './pages/AdminPage';
import PurchaseListPage from './pages/PurchaseListPage';
import StoreIntroducePage from './pages/StoreIntroducePage';

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ProductApp />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="admin" element={<AdminPageV2 />} />
          <Route path="/purchased_list" element={<PurchaseListPage />} />
          <Route path="/store_introduction" element={<StoreIntroducePage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
