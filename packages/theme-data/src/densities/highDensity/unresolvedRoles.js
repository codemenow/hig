import mapKeys from "../../utils/mapKeys";
import system from "./system";
import button from "./components/button";
import checkbox from "./components/checkbox";
import input from "./components/input";
import typography from "./components/typography";

const highDensityThemeConfig = Object.assign(
  { ...button },
  checkbox,
  input,
  typography,
  mapKeys(system.density, key => `density.${key}`)
);

export default highDensityThemeConfig;
