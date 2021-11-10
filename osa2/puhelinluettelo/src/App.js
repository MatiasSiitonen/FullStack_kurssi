import React, { useState, useEffect } from 'react'
import noteService from './services/notes'


const Person = ({ person, setPersons, persons }) => {

  const clickhandler = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      noteService
        .remove(person.id)
      setPersons(persons.filter(human => human.id !== person.id))
    }

  }
  return (
    <div>
      {person.name} {person.number}
      <button onClick={clickhandler}>Delete
      </button>
    </div>
  )
}


const Persons = ({ filter, persons, setPersons }) => {

  const filtered = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
  const showPersons = filter === "" ? persons : filtered;

  return (
    <div>
      {showPersons.map(person =>
        <Person key={person.name} person={person} setPersons={setPersons} persons={persons} />
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

    if (names.includes(newName) === false) {
      noteService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))

        })
    }
    else if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        
        const id = names.indexOf(newName) + 1
        const person = persons.find(p => id === p.id)
        const changedPerson = { ...person, number: newNumber }
        noteService
          .update(id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          })
      }

    
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])




  return (
    <div>
      <h2>Phonebook</h2>

      <Filter persons={persons} setFilter={setFilter} filter={filter} />
      <h2>add a new</h2>

      <PersonForm persons={persons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} setPersons={setPersons} />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} setPersons={setPersons} />

    </div>
  )

}



export default App
