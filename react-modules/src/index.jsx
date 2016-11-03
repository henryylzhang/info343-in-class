//lack of slash means ES6 will assume it's in your node_modules folder'
import React from "react";
import {render} from "react-dom";

import App from "./app.jsx";

render(<App/>, document.getElementById("app"));
