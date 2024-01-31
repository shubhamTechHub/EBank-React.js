import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'

import LoginForm from './component/LoginForm'
import Home from './component/Home'
import NotFound from './component/NotFound'
import ProtectedRoute from './component/ProtectedRoute'

// Replace your code here
const App = () => (
  <Switch>
    <ProtectedRoute exact path="/" component={Home} />
    <Route exact path="/ebank/login" component={LoginForm} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
