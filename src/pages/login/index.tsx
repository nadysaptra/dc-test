import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../helpers/useAuth';

const Login = () => {
  let auth = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  // validate token
  if (auth && auth.user) {
    navigate('/', { replace: true });
  }
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const authenticate = useCallback(
    async (_event) => {
      _event.preventDefault();
      setLoading(true);
      const requestOptions: any = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      };
      fetch('http://192.53.172.221:3000/api/authaccount/login', requestOptions)
        .then((response) => {
          if (response.status !== 200 && response.status !== 201) {
            throw new Error('Not 200 response');
          } else return response.json();
        })
        .catch(() => {
          // show toaster
          toast.error('Email/Password wrong. Please double check your credentials', {
            position: 'top-right',
            autoClose: 5000,
          });
        })
        .then((data) => {
          // save to localStorage / sessionStorage
          localStorage.setItem('auth', JSON.stringify(data.data));
          auth.signin(data.data, () => {
            //  navigate(from, { replace: true });
            navigate('/', { replace: true, state: {} });
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [auth, navigate, formData],
  );

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div></div>
      <div className="max-w-md w-full space-y-8 rounded bg-white p-4">
        <div>
          <h1 className="mt-6 text-center text-5xl font-extrabold text-gray-900">Tourists App</h1>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-500">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={authenticate}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                onChange={(e) =>
                  setFormData({ email: e.target.value, password: formData.password })
                }
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                onChange={(e) => setFormData({ password: e.target.value, email: formData.email })}
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'bg-slate-600' : 'bg-indigo-600'
              }`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              {loading ? 'Loading . . .' : 'Sign in '}
            </button>
          </div>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default Login;
