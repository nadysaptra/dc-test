import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RequireAuth } from './helpers/auth.guard';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Tourists from './pages/tourist';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useAuth } from './helpers/useAuth';
import Layout from './container/layout';
import TouristDetail from './pages/tourist/detail';
import TouristAdd from './pages/tourist/add';
import TouristUpdate from './pages/tourist/update';

function App() {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('auth') !== '' && !auth.user) {
      auth.signin(JSON.parse(localStorage.getItem('auth')!), () => {
        // navigate('/');
      });
    }
  }, [auth, navigate]);
  return (
    <div className="App">
      <Routes>
        <Route
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="tourists" element={<Tourists />} />
          <Route path="tourists/add" element={<TouristAdd />} />
          <Route path="tourists/:id/update" element={<TouristUpdate />} />
          <Route path="tourists/:id" element={<TouristDetail />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
