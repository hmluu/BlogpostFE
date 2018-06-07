window.addEventListener('load', () => {
  console.log('Ready to Ajaxxxx!');


  const spotNamesListEl = document.querySelector('#spot-names-list');
  const mainPanelEl = document.querySelector('#main-panel');
  const baseURL = 'http://localhost:3004/happyHours';

  const createSpecial = (event) => {
    event.preventDefault();
    const spot = document.querySelector('#new-spot').value;
    const address = document.querySelector('#new-address').value;
    const spot_url = document.querySelector('#new-spot_url').value;
    const when = document.querySelector('#new-when').value;
    const specials = document.querySelector('#new-specials').value;

    axios.post(baseURL, {
        spot,
        address,
        spot_url,
        when,
        specials
      })
      .then(result => {
        allSpecials()
        showSpecial(result.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const newSpecial = () => {
    mainPanelEl.innerHTML = `
    <form>
    <div class="form-group" id="top-spot">
    <label for="new-spot">Spot</label>
    <input type="text" id="new-spot" class="form-control" />
    </div>
    <div class="form-group">
    <label for="new-address">Address</label>
    <input type="text" id="new-address" class="form-control" />
    </div>
    <div class="form-group">
    <label for="new-spot_url">Visit Us At</label>
    <input type="text" id="new-spot_url" class="form-control" />
    </div>
    <div class="form-group">
    <label for="new-when">When</label>
    <input type="text" id="new-when" class="form-control" />
    </div>
    <div class="form-group">
    <label for="new-specials">Specials</label>
    <input type="text" id="new-specials" class="form-control" />
    </div>
    <a class="waves-effect waves-light btn" id="add-button"><i class="material-icons left">add</i>Add
    </form>`;
    document.querySelector('#add-button').addEventListener('click', createSpecial);
  }


  const updateSpecial = happyHour => {
    event.preventDefault();
    const spot = document.querySelector('#edit-spot').value;
    const address = document.querySelector('#edit-address').value;
    const spot_url = document.querySelector('#edit-spot_url').value;
    const when = document.querySelector('#edit-when').value;
    const specials = document.querySelector('#edit-specials').value;
    axios.put(`${baseURL}/${happyHour.id}`, {
        spot,
        address,
        spot_url,
        when,
        specials
      })
      .then(result => {
        showSpecial(result.data);
      })
      .catch(error => {
        console.error(error);
      })
  }

  const editSpecial = happyHour => {
    document.querySelector('#main-panel').innerHTML = `
  <form>
  <div class="form-group" id="top-spot2">
    <label for="edit-spot">Spot</label>
    <input type="text" id="edit-spot" class="form-control" />
    </div>
    <div class="form-group">
      <label for="edit-address">Address</label>
      <input type="text" id="edit-address" class="form-control" />
      </div>
      <div class="form-group">
        <label for="edit-spot_url">Visit Us At</label>
        <input type="text" id="edit-spot_url" class="form-control" />
        </div>
        <div class="form-group">
          <label for="edit-when">When</label>
          <input type="text" id="edit-when" class="form-control" />
          </div>
        <div class="form-group">
          <label for="edit-specials">Specials</label>
          <input type="text" id="edit-specials" class="form-control" />
          </div>
          <a class="waves-effect waves-light btn" id="update-button"><i class="material-icons left">sync</i>Update</a>
        </form>`;

    document.querySelector('#edit-spot').value = happyHour.spot;
    document.querySelector('#edit-address').value = happyHour.address;
    document.querySelector('#edit-spot_url').value = happyHour.spot_url;
    document.querySelector('#edit-when').value = happyHour.when;
    document.querySelector('#edit-specials').value = happyHour.specials;
    document.querySelector('#update-button').addEventListener('click', () => {
      updateSpecial(happyHour);
    });
  }


  const deleteSpecial = happyHour => {
    axios.delete(`${baseURL}/${happyHour.id}`)
      .then(result => {
        allSpecials();
      })
      .catch(error => console.error(error));
  }

  const showSpecial = (happyHour) => {
    document.querySelector('#main-panel').innerHTML = `
    <div class="h3">${happyHour.spot}</div>
    <div class="h5">${happyHour.address}</div>
    <div class="h5">${happyHour.spot_url}</div>
    <div class="h5">${happyHour.when}</div>
    <div class="h5">${happyHour.specials}</div>
    <a class="waves-effect waves-light btn-small" id="edit-button"><i class="material-icons left">edit</i>Edit</a>

    <a class="waves-effect waves-light btn-small" id="delete-button"><i class="material-icons left">remove_circle</i>Delete</a>
    `
    document.querySelector('#edit-button').addEventListener('click', () => {
      editSpecial(happyHour)
    });
    document.querySelector('#delete-button').addEventListener('click', () => {
      deleteSpecial(happyHour)
    });

  }

  const createAccount = () => {
    mainPanelEl.innerHTML = `
    <div class="row" id="new-acc">
    <form class="col s12">
      <div class="row">
      <div class="input-field col s6">
      <i class="material-icons prefix">username</i>
      <input id="icon_telephone" type="tel" class="validate">
      <label for="icon_telephone">Email</label>
      </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">account_circle</i>
          <input id="icon_prefix" type="text" class="validate">
          <label for="icon_prefix">Password</label>
        </div>
      </div>
      <button class="btn waves-effect waves-light btn-small" type="submit" name="action" id="submit-button">Submit</button>
    </form>
  </div>`;
  }
  const allSpecials = () => {
    mainPanelEl.innerHTML = "";
    axios.get(`http://localhost:3004/happyHours`)
      .then(response => {
        spotNamesListEl.innerHTML = "";
        response.data.forEach(happyHour => {
          const spotNameEl = document.createElement('li');
          spotNameEl.innerHTML = happyHour.spot;
          spotNamesListEl.appendChild(spotNameEl);
          spotNameEl.addEventListener('click', () => {
            showSpecial(happyHour)
          });
        })
      })
      .catch(error => {
        console.error(error);
      });
  }


  document.querySelector('#app-start').addEventListener('click', allSpecials);
  allSpecials();

  document.querySelector('#add-specials').addEventListener('click', newSpecial);
  newSpecial();

  document.querySelector('#account').addEventListener('click', createAccount);





});
