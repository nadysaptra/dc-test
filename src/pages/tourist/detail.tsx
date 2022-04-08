import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Tourist } from '.';
import { useAuth } from '../../helpers/useAuth';
const TouristDetail = () => {
  const auth = useAuth();
  const [tourist, setTourist] = useState<Tourist | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
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
        setTourist(data);
      })
      .finally(() => {
        // simulate long loading
        setTimeout(() => setLoading(false), 1000);
      });
  }, [auth, id]);

  return (
    <div className="container mx-auto my-5 p-5">
      <div className="md:flex no-wrap md:-mx-2 ">
        <div className="w-full md:w-3/12 md:mx-2">
          <div className="bg-white p-3 border-t-4 border-cyan-700">
            <div className="image overflow-hidden">
              <img className="h-auto w-full mx-auto" src={tourist?.tourist_profilepicture} alt="" />
            </div>
          </div>
          <div className="my-4"></div>
        </div>
        <div className="w-full md:w-9/12 mx-2">
          <Link
            className="bg-cyan-700 hover:bg-blue-700 text-white font-bold px-4 rounded mb-4"
            to={`/tourists`}
          >
            Kembali
          </Link>
          {loading ? (
            <div className="text-center ">Loading . . .</div>
          ) : (
            <>
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
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email</div>
                    <div className="px-4 py-2">{tourist?.tourist_email}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Name</div>
                    <div className="px-4 py-2">{tourist?.tourist_name}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Location</div>
                    <div className="px-4 py-2">{tourist?.tourist_location}</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TouristDetail;
