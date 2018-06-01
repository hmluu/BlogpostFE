window.addEventListener('load', () => {
  console.log('Ready to Ajaxxxx!');
  const baseURL = 'http://localhost:3006/movies';

  const createMovie = () => {
    event.preventDefault();
    console.log('create movie');
    const title = document.querySelector('#title').value;
    const director = document.querySelector('#director').value;
    const year = document.querySelector('#year').value;
    const rating = document.querySelector('#rating').value;
    const poster_url = document.querySelector('#poster_url').value;
  }

  const newMovie = () => {
    console.log('new movie!');
    document.querySelector('#app').innerHTML = `
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" class="form-control" />
      </div>
      <div class="form-group">
        <label for="director">Director</label>
        <input type="text" id="director" class="form-control" />
      </div>
      <div class="form-group">
        <label for="year">Year</label>
        <input type="text" id="year" class="form-control" />
      </div>
      <div class="form-group">
        <label for="rating">Rating</label>
        <input type="text" id="rating" class="form-control" />
      </div>
      <div class="form-group">
        <label for="poster_url">Poster URL</label>
        <input type="text" id="poster_url" class="form-control" />
      </div>
        <button type="submit" class="btn btn-primary" id="create-movie">Create</button>
    </form>`;
    document.querySelector('#create-movie').addEventListener('click', createMovie);
  }

  const editMovie = movie => {
    console.log('editing movie');
    console.log(movie);
  }

  const deleteMovie = id => {
    console.log('deleting movie no', id);
  }

  const showMovie = movie => {
    console.log(('show page for movie'));
    document.querySelector('#app').innerHTML = `
      <div class="h3">${movie.title}</div>
      <img src="${movie.poster_url}" width="40%" />
      <table class="table table-striped">
        <tbody>
          <tr>
            <th scope="row">Director</th>
            <td>${movie.director}</td>
          </tr>
          <tr>
            <th scope="row">Year</th>
            <td>${movie.year}</td>
            </tr>
            <tr>
            <th scope="row">Rating</th>
            <td>${movie.rating}</td>
          </tr>
          </table>
;`
  }



  const allMovies = () => {
    document.querySelector('#app').innerHTML = `
    <div><button type="button" class="btn btn-success" id="new-movie">Add A Movie</button></div>
    <table class="table table-striped table-light">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Director</th>
          <th scope="col">Year</th>
          <th scope="col">Rating</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody id="movie-tbody"></tbody>
    </table>`
    document.querySelector('#new-movie').addEventListener('click', newMovie);
    axios.get(baseURL)
      .then(movies => {
        movies.data.forEach(movie => {
          const trEl = document.createElement('tr');
          trEl.innerHTML = `
          <td id="show-${movie.id}">${movie.title}</td>
          <td>${movie.director}</td>
          <td>${movie.year}</td>
          <td>${movie.rating}</td>
          <td><button type="button" class="btn btn-outline-info" btn-sm id="edit-${movie.id}">Edit</button>&nbsp<button type="button" class="btn btn-outline-danger" btn-sm id="delete-${movie.id}">Delete</button></td>
          `;
          document.querySelector('#movie-tbody').appendChild(trEl);
          document.querySelector(`#show-${movie.id}`).addEventListener('click', () => {
            showMovie(movie);
          });
          document.querySelector(`#edit-${movie.id}`).addEventListener('click', () => {
            editMovie(movie);
          });
          document.querySelector(`#delete-${movie.id}`).addEventListener('click', () => {
            deleteMovie(movie.id);
          });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  document.querySelector('#app-start').addEventListener('click', allMovies);
  allMovies();
});
