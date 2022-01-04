import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const Person = ({ person, setPersons, persons, setErrorMessage }) => {

  const clickhandler = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
      setPersons(persons.filter(human => human.id !== person.id))
    }
    setErrorMessage(
      `Removed ${person.name}`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

  }
  return (
    <div>
      {person.name} {person.number}
      <button onClick={clickhandler}>Delete
      </button>
    </div>
  )
}


const Persons = ({ filter, persons, setPersons, setErrorMessage }) => {

  const filtered = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
  const showPersons = filter === "" ? persons : filtered;

  return (
    <div>
      {showPersons.map(person =>
        <Person key={person.name} person={person} setPersons={setPersons} persons={persons} setErrorMessage={setErrorMessage} />
      )}
    </div>
  )
}


const PersonForm = ({ persons, newName, setNewName, newNumber, setNewNumber, setPersons, setErrorMessage }) => {

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const names = persons.map(person => person.name)

    if (names.includes(newName) === false) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
        })
      setErrorMessage(
        `Added ${newName}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
    else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

      const id = names.indexOf(newName) + 1
      const person = persons.find(p => id === p.id)
      const changedPerson = { ...person, number: newNumber }

      personService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        })
      setErrorMessage(
        `Changed ${newName}'s number'`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])




  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} />


      <Filter persons={persons} setFilter={setFilter} filter={filter} />
      <h2>add a new</h2>

      <PersonForm setErrorMessage={setErrorMessage} persons={persons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} setPersons={setPersons} />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} setPersons={setPersons} setErrorMessage={setErrorMessage} />

    </div>
  )

}



export default App
