window.addEventListener('load', () => {
  console.log('Ready to Ajaxxxx!');
  const baseURL = 'http://localhost:3006/movies';
  const allMovies = () => {
    document.querySelector('#app').innerHTML = `
    <table>
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Director</th>
          <th scope="col">year</th>
          <th scope="col">Rating</th>
          <th scope="col">[Edit/Del]</th>
        </tr>
      </thead>
      <tbody id="movie-tbody"></tbody>
    </table>`
    axios.get(baseURL)
      .then(movies => {
        movies.data.map(movie => {
          const trEl = document.createElement('tr');
          trEl.innerHTML = `
          <td>${movie.title}</td>
          <td>${movie.director}</td>
          <td>${movie.year}</td>
          <td>${movie.rating}</td>
          <td><button>Edit</button><button>Delete</button></td>
          `;
          document.querySelector('#movie-tbody').appendChild(trEl);
        });
      })
      .catch(error => {console.error( error ); });
  }
  allMovies();
});
