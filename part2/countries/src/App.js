import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({country}) => (
  <div>
    <h2>{country.name}</h2>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h3>Spoken languages</h3>
    <ul>
      {country.languages.map(el => <li key={el.name}>{el.name}</li>)}
    </ul>
    <div>
      <img src={country.flag} width="200" />
    </div>
  </div>
)

const Countries = ({
    countries,
    toggleCountry
  }) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }
  else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else {
    return (
      <div>
        {countries.map(item => {
          if (item.isShow) {
            return (
              <div key={item.name}>
                {item.name}
                <button onClick={() => toggleCountry(item.name, false)}>hide</button>
                <Country country={item} />
              </div>
            )
          }
          else {
            return (
              <div key={item.name}>
                {item.name}
                <button onClick={() => toggleCountry(item.name, true)}>show</button>
              </div>

            )
          }
        })}
      </div>
    )
  }
  
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log(process.env.REACT_APP_API_KEY);

    axios.get('https://restcountries.eu/rest/v2/all').then(({data}) => {
      setCountries(data)
    })
  }, [])

  const result = countries.filter(el => el.name.toLowerCase().includes(filter.toLowerCase()))

  const toggleCountry = (name, show) => {
    setCountries(countries.map(el => el.name !== name ? el : {...el, isShow: show}))
  }

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={e => setFilter(e.target.value)} />
      </div>
      <Countries countries={result} toggleCountry={toggleCountry} />
    </div>
  )
}

export default App;
