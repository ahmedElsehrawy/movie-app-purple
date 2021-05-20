import { useState, useEffect } from 'react'
import Movie from './components/Movie'
import './App.css'
import './components/Navbar.css'

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=4037fc1507326a9b6c21311741bbf68b&query='

function App() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [isclicked, setIsClicked] = useState(false)

  const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort-by-popularity.desc&api_key=4037fc1507326a9b6c21311741bbf68b&page=${pageNumber}`
  useEffect(() => {
    const fetchFeatured = async () => {
      fetch(FEATURED_API)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results)
          console.log(data.results)
        })
    }

    fetchFeatured()
  }, [pageNumber])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(SEARCH_API + searchTerm)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results)
        console.log(data.results)
      })
    setIsClicked(true)
  }
  return (
    <>
      <div className='navbar'>
        <a href='/'>
          <div className='logo'>Movie App</div>
        </a>

        <form className='search' onSubmit={(e) => handleSubmit(e)}>
          <input
            type='text'
            name='search'
            className='search'
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='search here'
            value={searchTerm}
          />
          <button type='submit'>
            <i className='fas fa-search'></i>
          </button>
        </form>
      </div>
      <div className='home'>
        {!isclicked && (
          <div className='next-previous'>
            <button
              className={`previous-page ${pageNumber === 1 ? 'disabled' : ''}`}
              onClick={(e) => setPageNumber(pageNumber - 1)}
              disabled={pageNumber === 1}
            >
              <i class='fas fa-angle-left'></i> Previous Page
            </button>

            <button
              className='next-page'
              onClick={(e) => setPageNumber(pageNumber + 1)}
            >
              Next Page <i class='fas fa-angle-right'></i>
            </button>
          </div>
        )}
        <div className='container'>
          {movies.map((movie) => (
            <Movie key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
