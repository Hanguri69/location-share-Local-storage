import { Link } from "react-router-dom";
import { LocalStorageORM } from "../utils/localstorageORM";

export default function Home() {
  const database = LocalStorageORM.getInstance();
  const allUsers = database.from("users").select();

  return (
    <div>
      <p className="text-2xl mb-4">Users</p>
      {allUsers.length === 0 && <p className="text-gray-500">No users...</p>}
      <ul>
        {allUsers.map((user) => {
          return (
            <Link
              key={user.id}
              to={user.id + "/places"}
              className="mb-2 border-2 border-gray-600 p-2 rounded-lg bg-gray-200 hover:bg-gray-300 w-full max-w-lg flex items-center gap-4 h-16"
            >
              <img className="h-full aspect-square object-cover" src="profile.png"></img>
              <p>{user.email}</p>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
