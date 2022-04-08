import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../helpers/useAuth';
const TouristUpdate = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    location: '',
  });
  let { id } = useParams();

  useEffect(() => {
    if (!auth || !auth.user) {
      return;
    }
    setLoading(true);
    const requestOptions: any = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.user?.Token },
    };
    fetch('http://192.53.172.221:3000/api/Tourist/' + id, requestOptions)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Not 200 response');
        } else return response.json();
      })
      .catch(() => {
        // show toaster
        toast.error('Cannot fetch data', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .then((data) => {
        setFormData({
          email: data.tourist_email,
          name: data.tourist_name,
          location: data.tourist_location,
        });
      })
      .finally(() => {
        // simulate long loading
        setTimeout(() => setLoading(false), 1000);
      });
  }, [auth, id]);

  const submit = useCallback(
    async (_event) => {
      _event.preventDefault();
      if (!auth.user) {
        return;
      }
      setLoading(true);
      const requestOptions: any = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.user.Token },
        body: JSON.stringify({
          tourist_email: formData.email,
          tourist_name: formData.name,
          tourist_location: formData.location,
        }),
      };
      fetch('http://192.53.172.221:3000/api/Tourist/' + id, requestOptions)
        .then((response) => {
          if (response.status !== 200 && response.status !== 201) {
            throw new Error('Not 200 response');
          } else return response.json();
        })
        .catch(() => {
          // show toaster
          toast.error('Failed save data. Please check again your data', {
            position: 'top-right',
            autoClose: 5000,
          });
        })
        .then((data) => {
          toast.success('Data saved', {
            position: 'top-right',
            autoClose: 5000,
          });
          navigate('/tourists', { replace: true, state: {} });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [auth, navigate, formData, id],
  );

  return (
    <div className="container mx-auto my-5 p-5">
      <div className="md:flex no-wrap md:-mx-2 ">
        <div className="w-full md:w-3/12 md:mx-2">
          <div className="bg-white p-3 border-t-4 border-cyan-700">
            <div className="image overflow-hidden">
              <img
                className="h-auto w-full mx-auto"
                src="https://www.planetware.com/photos-large/INA/indonesia-borobudur.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="my-4"></div>
        </div>
        <div className="w-full md:w-9/12 mx-2 bg-white rounded p-3">
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span className="text-cyan-700">
              <svg
                className="h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <span className="tracking-wide">Add Tourist</span>
          </div>
          <hr />
          <div className="text-gray-700">
            <form className="mt-8 space-y-6" onSubmit={submit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mt-3">
                  <label htmlFor="email-address">Email address</label>
                  <input
                    id="email-address"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={formData.email}
                    disabled={loading}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Name"
                    value={formData.name}
                    disabled={loading}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="location">Location</label>
                  <input
                    id="location"
                    name="location"
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Location"
                    value={formData.location}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex">
                <button
                  type="submit"
                  disabled={loading}
                  className={`mr-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    loading ? 'bg-slate-600' : 'bg-indigo-600'
                  }`}
                >
                  {loading ? 'Loading . . .' : 'Save '}
                </button>
                <Link
                  className={`justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    loading ? 'bg-slate-600' : 'bg-cyan-600'
                  }`}
                  to={`/tourists`}
                >
                  Kembali
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristUpdate;
