import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    userId: '',
    pin: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  onChangePin = event => {
    this.setState({
      pin: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    history.replace('/')
    Cookies.set('jwt_token', jwtToken, {expires: 1})

    this.setState({
      showErrorMsg: false,
    })
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showErrorMsg: true,
      errorMsg,
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userCredentials = {user_id: userId, pin}
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }

    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(fetchedData.jwt_token)
    } else {
      this.onSubmitFailure(fetchedData.error_msg)
    }
    console.log(fetchedData)
  }

  renderUserId = () => {
    const {userId} = this.state
    return (
      <div className="user-input-card">
        <label className="label" htmlFor="userId">
          User ID
        </label>
        <input
          className="user-input-element"
          type="text"
          placeholder="Enter User ID"
          id="userId"
          onChange={this.onChangeUserId}
          value={userId}
        />
      </div>
    )
  }

  renderPin = () => {
    const {pin} = this.state
    return (
      <div className="user-input-card">
        <label className="label" htmlFor="pin">
          PIN
        </label>
        <input
          className="user-input-element"
          type="password"
          placeholder="Enter PIN"
          id="pin"
          onChange={this.onChangePin}
          value={pin}
        />
      </div>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <div className="website-login-container">
          <img
            className="login-route-img"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt=" website login"
          />
          <form onSubmit={this.submitForm} className="form-container">
            <h1 className="welcome-back-heading">Welcome Back!</h1>
            {this.renderUserId()}
            {this.renderPin()}
            <button className="login-btn" type="submit">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
