import React, {
  useState,
  useEffect
} from 'react'

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';
import PersonsService from '../services/persons';
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({})
  
  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    PersonsService.all().then(data => {
      setPersons(data)
      showMessage({
        message: 'List loaded',
        type: 'success'
      })
    })
  }, [])

  const resetForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const showMessage = ({message, type}) => {
    setMessage({
      message,
      type
    })
    setTimeout(() => {
      setMessage({})
    }, 3000);
  }


  const updatePerson = item => {
    if (window.confirm(`${item.name} is already added to phonebook, replace the old number with a new one?`)) {
      PersonsService.update(item.id, {
        ...item,
        number: newNumber
      }).then(data => {
        setPersons(persons.map(el => el.id !== item.id ? el : data))
        resetForm()
        showMessage({
          message: `Changed ${data.name}'s number to ${data.number}`,
          type: 'success'
        })
        
      }).catch(err => {
        showMessage({
          message: `Information of ${item.name} has already been removed from server`,
          type: 'error'
        })
      })
    }
  }

  const addPerson = ({
    newName,
    newNumber,
  }) => {
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    PersonsService.add(newPerson).then(data => {
      setPersons([...persons, data])
      resetForm()
      showMessage({
        message: `Added ${data.name}`,
        type: 'success'
      })
    })
  }

  const deletePerson = item => {
    const { id, name } = item
    if (window.confirm(`Delete ${name} ?`)) {
      PersonsService.del(id, item).then(() => {
        setPersons(persons.filter(el => el.id !== id))
        showMessage({
          message: `Information of ${name} has been deleted successfully`,
          type: 'success'
        })
      }).catch(err => {
        showMessage({
          message: `Information of ${item.name} has already been removed from server`,
          type: 'error'
        })
      })
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    const existed = persons.find(el => el.name.toLowerCase() === newName.toLowerCase())
    if (existed) {
      updatePerson(existed)
    } else {
      addPerson({
        newName,
        newNumber,
      })
    }
  }

  const handleNameChange = e => {
    setNewName(e.target.value)
  }
  const handleNumberChange = e => {
    setNewNumber(e.target.value)
  }
  const handlerFilterChange = e => {
    setFilter(e.target.value)
  }

  return (
    <div>
      <h2> Phonebook </h2>
      <Notification message={message} />
      <Filter value={filter} onChange={handlerFilterChange} />
      <h2>add a new </h2>
      <PersonForm data={
        {
          newName,
          newNumber,
          handleNameChange,
          handleNumberChange,
          onSubmit,
        }
      }/>
      <h2>Numbers</h2>
      <Persons list={filteredPersons} onDelete={deletePerson} />
    </div>
  )
}
            
export default App