import axios from 'axios'

export default function getPuzzle(props) {
  let queryParams = { rating: props.rating, count: props.count }

  if (props.themes && props.themes.length > 0) {
    queryParams.themes = props.themes
    queryParams.themesType = props.themesType
  }

  if (props.playerMoves) {
    queryParams.playerMoves = props.playerMoves
  }
  if (props.themes?.length > 0) {
    queryParams.themesType = 'ONE'
    queryParams.themes = JSON.stringify(props.themes)
  }

  var options = {
    method: 'GET',
    url: 'https://chess-puzzles.p.rapidapi.com/',
    params: queryParams,
    headers: {
      'x-rapidapi-host': 'chess-puzzles.p.rapidapi.com',
      'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    },
  }

  return axios.request(options)
}
