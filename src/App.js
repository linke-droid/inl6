import { GiphyFetch } from '@giphy/js-fetch-api'
import { useState } from 'react'
import CountryList from './components/CountryList'
import GifList from './components/GifList'
import Error from './components/Error'
import axios from 'axios'

/* 
  Nyckeln för att få tillgång till Giphy API är att skapa ett konto på https://developers.giphy.com/ och skapa en ny app.
  vid produktion borde inte nyckeln inte finnas öppet i koden utan i en .env fil.
*/

const giphy = new GiphyFetch('PM6fXo7XpC2CsGcBMXuf4P9BqLjVHrKT')

/* 
  Skapar fyra stycken states som håller koll på texten som användaren skriver in, arrayen med gifs som hämtas från Giphy API 
  och ett error state som används för att visa felmeddelande om användaren inte skriver in något i sökfältet.
  och en state som håller koll på arrayen med länder som hämtas från restcountries API.
*/

function App() {
  const [text, setText] = useState('')
  const [country, setCountry] = useState([])
  const [gifs, setGifs] = useState([])
  const [error, setError] = useState(false)

  const handleInput = (e) => {
    setText(e.target.value)
  }

  function countryCall() {
    axios.get(`https://restcountries.com/v3.1/name/${text}`).then((response) => {
      setCountry(response.data)
    }).catch(error => {
      console.log("Error: " + error.response.data.error + ". No country found")
    })
  }

  async function giphyCall() {
    const res = await giphy.animate(text, { limit: 5 })
    setGifs(res.data)
    console.log(res.data)
  }

  const handleSubmit = (e) => {
    if (text.length === 0) {
      setError(true)
      return

    } else {
      countryCall(text)
      giphyCall(text)
      setText('')
      setError(false)
    }

  }

  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="row">
          <div className="col-12">
            <h3>Search country</h3>
            <input className="form-control-lg" value={text} onChange={handleInput} />
            <button className="btn btn-primary m-2" onClick={handleSubmit}>Search</button>
            <Error isError={error} text="Please enter a search term" />
          </div>
        </div>
      </div>
        {country && <CountryList country={country} />}
      {gifs && <GifList gifs={gifs} />}
    </>
  );
}

export default App;