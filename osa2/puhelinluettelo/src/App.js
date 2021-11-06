import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const Persons = ({ filter, persons }) => {

  const filtered = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
  const showPersons = filter === "" ? persons : filtered;

  return (
    <div>
      {showPersons.map(person =>
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}



const PersonForm = ({ persons, newName, setNewName, newNumber, setNewNumber, setPersons }) => {

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const names = persons.map(person => person.name)
    const copy = names.includes(newName) ?
      persons : persons.concat(personObject,)

    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    setPersons(copy)
    setNewName("")
    setNewNumber("")
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>)

}



const Filter = ({ filter, setFilter }) => {


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      filter shown with <input
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}




const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }

  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')




  return (
    <div>
      <h2>Phonebook</h2>

      <Filter persons={persons}  setFilter={setFilter} filter={filter} />
      <h2>add a new</h2>

      <PersonForm persons={persons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} setPersons={setPersons} />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />


    </div>
  )

}



export default App
