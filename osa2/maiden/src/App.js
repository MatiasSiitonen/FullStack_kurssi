import axios from "axios"
import React, { useState, useEffect } from "react"

const Button = ({ name, setFilter }) => {
  const clickHandler = () => {
    setFilter(name)
  }
  return (
    <button onClick={clickHandler}>
      show
    </button>)

}

const Country = ({ filter, data, setFilter }) => {

  const filtered = data.filter(Country => Country.name.common.toUpperCase().includes(filter.toUpperCase()))

  if (filtered.length === 1) {
    const languages = Object.values(filtered[0].languages)
    return (
      <div>
        <div>
          <h1>{filtered[0].name.common}</h1>
          capital
          {filtered[0].capital.map(capital =>
            <div key={capital}>{capital}</div>)}
          population {filtered[0].population}
        </div>

        <div>
          <h3>languages</h3>
          <ul>
            {languages.map(language =>
              <li key={language}>{language}</li>)}
          </ul>
        </div>

        <div>
          <img src={filtered[0].flags.png} alt="flag" />
        </div>


      </div>
    )
  }
  else if (filtered.length > 10) {
    return (
      <div>
        Too many matches, specify antoher filter
      </div>
    )
  }
  else {
    return (
      <div>
        {filtered.map(county =>
          <div key={county.name.common}>
            {county.name.common} {""} <Button key={county.name.common} name={county.name.common} setFilter={setFilter} />
          </div>
        )}

      </div>
    )
  }
}


const Filter = ({ filter, setFilter }) => {


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      find countries <input
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}



const App = () => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all').then(response => {
        console.log('promise fulfilled')
        setData(response.data)
      })
  }, [])


  return (
    <div>
      <div>
        <Filter setFilter={setFilter} filter={filter} />
      </div>
      <div>
        <Country filter={filter} data={data} setFilter={setFilter} />
      </div>
    </div>

  )

}

export default App