import Signup from "./component/Signup";

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Home from "./pages/home"
import User from "./context/User";

function App() {
    
  

  return (
    
    <Router>
    <Switch>
      <Route path="/" exact>
      <User>
      <Signup/>
     </User>
      </Route>
      <Route path="/login" exact>
      <Signup/>
      </Route>
      <Route path="/callback">
      <Home/>
      </Route>
    </Switch>
    </Router>
  );
}

export default App;
