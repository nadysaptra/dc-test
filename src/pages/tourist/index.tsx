import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../helpers/useAuth';
import TableTourist from './tableTourist';

export interface Tourist {
  $id: string;
  createdat: string;
  id: string;
  tourist_email: string;
  tourist_profilepicture: string;
  tourist_location: string;
  tourist_name: string;
}

export interface TouristsData {
  page: number;
  per_page: number;
  totalrecord: number;
  total_pages: number;
  data: Tourist[];
}

const Tourists = () => {
  const auth = useAuth();
  const [tourists, setTourists] = useState<TouristsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [itemOffset, setItemOffset] = useState(1);
  const [reload, setReload] = useState(false);
  const pageCount = tourists?.total_pages || 0;

  useEffect(() => {
    if (!auth || !auth.user) {
      return;
    }
    setLoading(true);
    const requestOptions: any = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.user?.Token },
    };
    fetch('http://192.53.172.221:3000/api/Tourist?page=' + itemOffset, requestOptions)
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
        setTourists(data);
      })
      .finally(() => {
        // simulate long loading
        setTimeout(() => setLoading(false), 1000);
        setReload(false);
      });
  }, [auth, itemOffset, reload]);

  const handlePageClick = (event: { selected: number }) => setItemOffset(event.selected + 1);
  const reloadData = (v: boolean) => setReload(v);

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
        <div className="w-full md:w-9/12 mx-2">
          <Link
            className="bg-cyan-700 hover:bg-blue-700 text-white font-bold px-4 rounded mb-4"
            to={`/tourists/add`}
          >
            Add Tourist
          </Link>
          {loading ? (
            <div className="text-center ">Loading . . .</div>
          ) : (
            <TableTourist tourists={tourists?.data} reload={reloadData} />
          )}
          <ReactPaginate
            breakLabel="..."
            nextLabel="next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="previous"
            className={'pagination'}
            renderOnZeroPageCount={undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default Tourists;
