import { createHashRouter } from "react-router";
import { IntroScreen } from "./screens/IntroScreen";
import { GalaxyScreen } from "./screens/GalaxyScreen";
import { FinalScreen } from "./screens/FinalScreen";

export const router = createHashRouter([
  {
    path: "/",
    Component: IntroScreen,
  },
  {
    path: "/galaxy",
    Component: GalaxyScreen,
  },
  {
    path: "/final",
    Component: FinalScreen,
  },
]);
