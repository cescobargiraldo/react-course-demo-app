import React from 'react';
import Person from '../Persons/Person/Person';

const persons = (props) => props.persons.map((person, index) => {
    return <Person
            key={person.id}
            name={person.name}
            age={person.age}
            click={() => props.click(index)}
            changed={(event) => props.changed(event, person.id)} />
  });

export default persons;