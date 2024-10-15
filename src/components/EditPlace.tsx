import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LocalStorageORM } from "../utils/localstorageORM";
import { getCurrentUser } from "../utils/auth";

export default function EditPlace() {
  const params = useParams();
  const database = LocalStorageORM.getInstance();
  const place = database.from("places").select((place) => place.id === Number(params.pid))[0];
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(place.pictureUrl ?? "");
  const [title, setTitle] = useState(place.title);
  const [location, setLocation] = useState(place.location);
  const [coordinate, setCordinate] = useState(place.coordinate);
  const [description, setDescription] = useState(place.description ?? "");

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || place.user_id !== currentUser.id) {
      navigate(`/`);
      return;
    }
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const currentUser = getCurrentUser();

    if (!currentUser || place.user_id !== currentUser.id) {
      alert("You are not authorized to edit this");
      return;
    }

    database.from("places").update((place) => place.id === Number(params.pid), {
      title: title,
      location: location,
      coordinate: coordinate,
      pictureUrl: imageUrl,
      description: description,
    });
    navigate(`/${currentUser.id}/places`);
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create place
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Image url</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Location</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Coordinate</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={coordinate}
                onChange={(e) => setCordinate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
