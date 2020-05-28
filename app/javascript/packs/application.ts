import ReactRailsUJS from "react_ujs";

const componentRequireContext = require.context("../", true);
ReactRailsUJS.useContext(componentRequireContext);
