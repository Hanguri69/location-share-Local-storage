import { Link, useParams } from "react-router-dom";
import { LocalStorageORM } from "../utils/localstorageORM";
import { getCurrentUser } from "../utils/auth";

export default function PlaceDetail() {
  const params = useParams();
  const database = LocalStorageORM.getInstance();
  const place = database.from("places").select((place) => place.id === Number(params.pid))[0];
  const currentUser = getCurrentUser();

  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-2 gap-4">
        <img className="w-full object-contain" src={place.pictureUrl ?? ""}></img>
        <div className="w-full">
          <h1 className="text-2xl font-bold">{place.title}</h1>
          <p className="text-sm">Description: {place.description}</p>
          <p className="text-sm">Locations: {place.location}</p>
          <p className="text-sm">Coordinate: {place.coordinate}</p>
          <div className="mt-4">
            {currentUser && currentUser.id === place.user_id && (
              <Link
                className="border rounded-lg p-2 bg-slate-300 hover:bg-slate-600 hover:text-white"
                to={"/places/" + place.id + "/edit"}
              >
                Edit
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
