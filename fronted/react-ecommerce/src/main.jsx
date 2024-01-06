import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './home/Home.jsx'
import './index.css'
// bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


// fonts and icons
import '././assets/css/icofont.min.css';
import '././assets/css/animate.css';
import '././assets/css/style.min.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './shop/Shop.jsx'
import SingleProduct from './shop/SingleProduct.jsx'
import CartPage from './shop/CartPage.jsx'
import About from './about/About.jsx'
import Contact from './contact/Contact.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import PrivateRoute from './contexts/PrivateRoute.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
     {
      path: "/",
      element: <Home />
     },
     {
      path: "/shop",
      element: <Shop />
     },
     {
      path: "/shop/:id",
      element: <SingleProduct />
     },
     {
      path: "/cart-page",
      element: <PrivateRoute><CartPage /></PrivateRoute>
     },
     {
      path: "/about",
      element: <About />
     },
     {
      path: "/contact",
      element: <Contact />
     }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/sign-up",
    element: <Signup />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
