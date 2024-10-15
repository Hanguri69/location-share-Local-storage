import { Link, useParams } from "react-router-dom";
import { LocalStorageORM } from "../utils/localstorageORM";

export default function PlaceList() {
  const params = useParams();
  const database = LocalStorageORM.getInstance();
  const pageUserUid = Number(params.uid);
  const pageUser = database.from("users").select((user) => user.id === pageUserUid)?.[0];
  const userPlaces = database.from("places").select((place) => place.user_id === pageUserUid);
  return (
    <div>
      <p className="text-2xl mb-4">User {pageUser.email}'s places</p>
      {userPlaces.length === 0 && <p className="text-gray-500">No places...</p>}
      <ul>
        {userPlaces.map((place) => {
          return (
            <Link
              key={place.id}
              to={"/places/" + place.id}
              className="mb-2 border-2 border-gray-600 p-2 rounded-lg bg-gray-200 hover:bg-gray-300 w-full max-w-lg flex items-center gap-4 h-16"
            >
              <img
                className="h-full aspect-square object-contain"
                src={place.pictureUrl ?? ""}
              ></img>
              <p>{place.title}</p>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
