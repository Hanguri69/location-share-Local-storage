import { useState } from "react";
import { LocalStorageORM } from "../utils/localstorageORM";
import { getCurrentUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function CreatePlace() {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [coordinate, setCordinate] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const currentUser = getCurrentUser();

    if (!currentUser) {
      alert("You must be logged in to create a place");
      return;
    }

    const database = LocalStorageORM.getInstance();
    database.from("places").insert({
      title: title,
      location: location,
      coordinate: coordinate,
      pictureUrl: imageUrl,
      user_id: currentUser.id,
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
