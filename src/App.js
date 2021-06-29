import React, { Component } from 'react';
import styles from './App.module.css';

class App extends Component {


  state = {
    users: null,
    total: null,
    per_page: null,
    current_page: 1
  }


  componentDidMount() {
    this.makeHttpRequestWithPage(1);
  }


  makeHttpRequestWithPage = async pageNumber => {
    const response = await fetch(` https://reqres.in/api/users?page=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    this.setState({
      users: data.data,
      total: data.total,
      per_page: data.per_page,
      current_page: data.page
    });
  }


  render() {

    let users, renderPageNumbers;

    if (this.state.users !== null) {
      users = this.state.users.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.email}</td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
          <td><img style={{width: "5em",height: "5em"}} src={user.avatar} alt="avatar"/></td>
        </tr>
      ));
    }

    const pageNumbers = [];
    if (this.state.total !== null) {
      for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {
        pageNumbers.push(i);
      }


      renderPageNumbers = pageNumbers.map(number => {
        let classes = this.state.current_page === number ? styles.active : '';

        return (
          <span key={number} className={classes} onClick={() => this.makeHttpRequestWithPage(number)}>{number}</span>
        );
      });
    }

    return (


      <div className={styles.container}>
      <div className={styles.next}>
        <span onClick={() => this.makeHttpRequestWithPage(1)}>&laquo;</span>
        {renderPageNumbers}
        <span onClick={() => this.makeHttpRequestWithPage(1)}>&raquo;</span>
      </div>
      <div style={{display: "flex",justifyContent: "center",alignItems: "center"}}>

        <table className={styles.page}>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </table>
        </div>
      </div>
    );
  }

}

export default App;