import "./styles.css";
import DashIcons from "./UI /renderIcons.js";
import initEventHandlers from "./Modules/eventHandler.js";
import { loadState, clearState } from "./Modules/storage.js";

clearState(); //for debugging and testing
DashIcons();
const loadedState = loadState();
initEventHandlers(loadedState);
