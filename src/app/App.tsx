import { RouterProvider } from "react-router";
import { MusicToggle } from "./components/MusicToggle";
import { router } from "./routes";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <MusicToggle />
    </>
  );
}
