// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // 🔥🔥🔥🔥🔥🔥🔥 hw6: your recipe and code starts here!🔥🔥🔥🔥🔥🔥

  //Get the movie release year from the querystring parameter
  let year = event.queryStringParameters.year

  //Get the movie genre from the querystring parameter
  let genre = event.queryStringParameters.genre
  
  //If statement to check if both year and genre are defined
  if (year == undefined || genre == undefined) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Please provide the movie year and genre!` //Simple error message if undefined
    }
  }
  else {
    // create a new object to hold the movie data
    let moviesToReturn= {}

    // start with an empty Array for the movies
    moviesToReturn.movies = []


  // loop through all movies
  for (let i=0; i < moviesFromCsv.length; i++) {
    // store each movie in memory
    let movie = moviesFromCsv[i]
    //Push the movies that match year and genre only
    if (movie.startYear == year && movie.genres == genre) {
     
    // Create an movie object to push movie data to
    let movieObject = {
      primaryTitle: movie.primaryTitle,
      year: movie.startYear,
      genre: movie.genres
    }
    //Push the movie data to object
    moviesToReturn.movies.push(movieObject)
    }
  }
  //add the number of movies return to the returned movies Object
  moviesToReturn.numResults = moviesToReturn.movies.length

    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: JSON.stringify(moviesToReturn) // a string of data
    }
  }
}
