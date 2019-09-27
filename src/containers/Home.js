import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { UserService } from "../services/UserService";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      users: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
  
    try {
      const users = await this.users();
      this.setState({ users });
    } catch (e) {
      alert(e);
    }
  
    this.setState({ isLoading: false });
  }
  
  users() {
    return UserService.getAllUsers();
  }

  renderUsersList(users) {
    return [{}].concat(users.items).map(
        (user) =>
            <div>
                <h4>
                    {user.firstName+ ' ' + user.lastName }
                </h4>
                <h5>
                    {user.role}
                </h5>

            </div>
      );
                
  }  

  renderLander() {
    return (
      <div className="lander">
        <h1>Bla</h1>
        <p>A chat app</p>
      </div>
    );
  }

  renderUsers() {
    return (
      <div className='homeContainer'>
        <div className="users">
          <PageHeader>All Users</PageHeader>
          <ListGroup>
            {!this.state.isLoading && this.renderUsersList(this.state.users)}
          </ListGroup>
        </div>
        <div className='chatBox'>

        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderUsers() : this.renderLander()}
      </div>
    );
  }
}