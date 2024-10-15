import { redirect } from "react-router-dom";
import { LocalStorageORM } from "./localstorageORM";
import { Tables } from "../lib/tablesType";

const CURRENT_USER_STORAGE_KEY = "currentUser";

export function getCurrentUser(): Tables["users"] | null {
  const currentUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
  if (currentUser) {
    return JSON.parse(currentUser) as Tables["users"];
  }
  return null;
}

export function redirectIfUser() {
  const currentUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
  if (currentUser) {
    return redirect("/");
  }
  return null;
}

export function redirectIfNoUser() {
  const currentUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
  if (!currentUser) {
    return redirect("/login");
  }
  return null;
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
}

export function loginUser(email: string, password: string) {
  const user = LocalStorageORM.getInstance()
    .from("users")
    .select((user) => user.email === email && user.password === password);
  if (user.length > 0) {
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user[0]));
    return true;
  }
  return false;
}

export function createUser(email: string, name: string, password: string) {
  const database = LocalStorageORM.getInstance();
  const user = database.from("users").select((user) => user.email === email);
    database.from("users").insert({ email, name, password, pictureUrl: null });
    return true;
  
  return false;
}
