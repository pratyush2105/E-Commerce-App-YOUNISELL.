import Cart from "./pages/Cart";
import Home from "./pages/Home"
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Success from "./pages/Success";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/products/:category'>
          <ProductList />
        </Route>
        <Route path='/product/:id'>
          <Product />
        </Route>
        <Route path='/cart'>
          <Cart />
        </Route>
        <Route path='/success'>
          <Success />
        </Route>
        <Route path='/signin'>
          {/* if there is no user then redirect to homepage. */}
          {user ? <Redirect to='/' />: <SignIn />}
        </Route>
        <Route path='/register'>
          {/* if there is no user then redirect to homepage. */}
          {user ? <Redirect to='/' />: <Register />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;