export type Tables = {
  places: {
    id: number;
    title: string;
    location: string;
    coordinate: string;
    pictureUrl: string | null;
    user_id: number;
    description: string | null;
  };
  users: {
    id: number;
    name: string;
    email: string;
    password: string;
    pictureUrl: string | null;
  };
};