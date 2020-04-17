import React, { Component } from 'react';
import Person from './Person/Person';
import './App.css';

class App extends Component {
  state = {
    persons : [
      { id: '1', name: "Camilo", age: "26" },
      { id: '2', name: "Shamira", age: "25" }
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

    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    let persons = null;

    if(this.state.showPersons === true){
       persons = (
         <div>
            {this.state.persons.map((person, index) => {
              return <Person
                      key={person.id}
                      name={person.name}
                      age={person.age}
                      click={() => this.deletePersonHandler(index)}
                      changed={(event) => this.nameChangeHandler(event, person.id)} />
            })}
          </div>
       )
         
    }
    
    return (
      <div className="App">
        <h1>Hi I'm a React App.</h1>
        <p>This is really working!</p>
        <button 
          style = {style}
          onClick={this.toggleShowPersonsHandler}>Change Names</button>
        {persons}
      </div>
    );
  }
}

export default App;
