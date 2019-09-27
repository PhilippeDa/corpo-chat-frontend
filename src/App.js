import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { AuthService } from "./services/AuthService";
import Routes from "./Routes";
import "./App.css";
import socketIOClient from "socket.io-client";


class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:3001",
      isLoading: false,
      isAuthenticated: false,
      isAuthenticating: true
    };
  }
  
  async componentDidMount() {
    try {
      const socket = socketIOClient(this.state.endpoint);

      socket.on('msg', data => {
        this.setState({ response: data }); 
        console.log(data);
      });

      socket.on('connected', data => {
        socket.emit('token',{})
      })

      // await AuthService.currentSession();
      // this.userHasAuthenticated(true);
    }
    catch(err) {
        alert(err);
    }
  
    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    try{
      await AuthService.logout();
      this.userHasAuthenticated(false);
      localStorage.removeItem('philippe.dagenais@secretCorp.com')
      this.props.history.push("/login");
    }catch(err){

    }
  }

  render() {

    const childProps = {
      data: this.state.response,
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Bla Bla Bla</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
          { this.state.isAuthenticated
          ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
          : <Fragment>
              <LinkContainer to="/signup">
                <NavItem>Signup</NavItem>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavItem>Login</NavItem>
              </LinkContainer>
            </Fragment> }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes childProps={childProps} />
    </div>
    );
  }
}

export default withRouter(App);