import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tourist } from '.';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import { useAuth } from '../../helpers/useAuth';
import { toast } from 'react-toastify';

const TableTourist = ({
  tourists,
  reload,
}: {
  tourists: Tourist[] | undefined;
  reload: Function;
}) => {
  const auth = useAuth();
  const [selected, setSelected] = useState<Tourist | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState(false);
  const remove = useCallback(() => {
    setLoading(true);
    const requestOptions: any = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.user.Token },
    };
    fetch('http://192.53.172.221:3000/api/Tourist/' + selected?.id, requestOptions)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Not 200 response');
        } else return response.json();
      })
      .catch(() => {
        // show toaster
        toast.error('Failed remove data', {
          position: 'top-right',
          autoClose: 5000,
        });
      })
      .then(() => {
        toast.success('Data Removed', {
          position: 'top-right',
          autoClose: 5000,
        });
        reload(true);
      })
      .finally(() => {
        setLoading(false);
        closeModal();
      });
  }, [auth, reload, selected]);

  const openModal = (tourist: Tourist) => {
    setSelected(tourist);
    setModal(true);
  };
  const closeModal = () => {
    setSelected(null);
    setModal(false);
  };
  return (
    <>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {!tourists && (
            <tr>
              <td colSpan={4}>No Data</td>
            </tr>
          )}
          {tourists &&
            tourists.map((tourist: Tourist, idx: number) => {
              return (
                <tr key={idx}>
                  <td className="border px-4 py-2">{tourist.tourist_name}</td>
                  <td className="border px-4 py-2">{tourist.tourist_email}</td>
                  <td className="border px-4 py-2">{tourist.tourist_location}</td>
                  <td className="border px-4 py-2">
                    <Link
                      className="bg-slate-100 hover:bg-slate-700 text-black font-bold px-3 mx-1 rounded hover:text-white"
                      to={`/tourists/${tourist.id}`}
                    >
                      Detail
                    </Link>
                    <Link
                      className="bg-slate-100 hover:bg-blue-700 text-black font-bold px-3 mx-1 rounded hover:text-white"
                      to={`/tourists/${tourist.id}/update`}
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => openModal(tourist)}
                      className="bg-slate-100 hover:bg-red-700 text-black font-bold px-3 mx-1 rounded hover:text-white"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <PureModal
        header="Remove Data"
        footer={
          <div>
            <button
              disabled={loading}
              className="bg-red-700 text-white p-3 rounded"
              onClick={remove}
            >
              Remove
            </button>
            <button className="bg-slate-300 text-black p-3 rounded ml-3" onClick={closeModal}>
              Cancel
            </button>
          </div>
        }
        isOpen={modal}
      >
        <p>
          Are you sure to delete <strong>{selected?.tourist_name}</strong> ?
        </p>
      </PureModal>
    </>
  );
};

export default TableTourist;
