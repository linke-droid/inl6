import { GiphyFetch } from '@giphy/js-fetch-api'
import { useState } from 'react'
import TextList from './components/TextList'
import CountryList from './components/CountryList'
import Error from './components/Error'
import axios from 'axios'

/* 
  Nyckeln för att få tillgång till Giphy API är att skapa ett konto på https://developers.giphy.com/ och skapa en ny app.
  vid produktion borde inte nyckeln inte finnas öppet i koden utan i en .env fil.
*/

const giphy = new GiphyFetch('PM6fXo7XpC2CsGcBMXuf4P9BqLjVHrKT')

/* 
  Skapar tre stycken states som håller koll på texten som användaren skriver in, arrayen med gifs som hämtas från Giphy API 
  och ett error state som används för att visa felmeddelande om användaren inte skriver in något i sökfältet.
*/

function App() {
  const [text, setText] = useState('')
  const [country, setCountry] = useState([])
  const [gifs, setGifs] = useState([])
  const [error, setError] = useState(false)

  const handleInput = (e) => {
    setText(e.target.value)
  }

  function countryCall(text) {
    let search = text
    axios.get(`https://restcountries.com/v3.1/name/${search}`).then((response) => {
      setCountry(response.data)
    }).catch(error => {
      console.log("Error: " + error.response.data.error + ". No country found")
    })
  }

  const apiCall = async () => {
    const res = await giphy.animate(text, { limit: 10 })
    setGifs(res.data)
  }

  const handleSubmit = (e) => {
    if (text.length === 0) {
      setError(true)
      return

    } else {
      countryCall(text)
      apiCall(text)
      setText('')
    }

    setError(false)

  }

  return (
    <>
      <div className="container">
        <h1>Search country</h1>
        <input className="form-control-lg" value={text} onChange={handleInput} />
        <button className="btn btn-primary" onClick={handleSubmit}> Search </button>
        <Error isError={error} text="Please enter a search term" />
        {gifs && <TextList gifs={gifs} />}
        {country && <CountryList country={country} />}
      </div>
    </>
  );
}

export default App;