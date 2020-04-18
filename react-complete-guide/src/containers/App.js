import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import classes from './App.css';

class App extends Component {

  state = {
    persons : [
      { id: '1', name: "Camilo", age: "26" },
      { id: '2', name: "Shamira", age: "25" },
      { id: '3', name: "John", age: "35" }
    ]
  }

  toggleShowPersonsHandler = () => {
    this.setState({showPersons: !this.state.showPersons})
  };

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];

    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  };

  deletePersonHandler = (index) => {
    const persons = [...this.state.persons];
    
    persons.splice(index, 1);

    this.setState({persons: persons});
  };

  render() {

    let persons = null;

    if(this.state.showPersons === true){
       persons = <Persons 
                  persons={this.state.persons}
                  click={this.deletePersonHandler}
                  changed={this.nameChangeHandler}/>
    }

    return (
      <div className={classes.App}>
        <Cockpit 
          persons={this.state.persons}
          showPersons={this.state.showPersons}
          clicked={this.toggleShowPersonsHandler} />
        {persons}
      </div>
    );
  }
}

export default App;
