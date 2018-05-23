window.addEventListener('load', () => {
  console.log('frontendBlogpost: ready to Ajaxxx!');

  const blogpostTitlesListEl = document.querySelector('#blogpost-titles-list');
  const mainPanelEl = document.querySelector('#main-panel');
  const baseURL = 'http://localhost:3001/blogposts';

  const createBlogpost = (event) => {
    event.preventDefault();
    const title = document.querySelector('#input-title').value;
    const content = document.querySelector('#textarea-content').value;
    console.log({title, content});
    axios.post(baseURL, {title, content})
      .then( response => {
        loadTitles();
        showBlogpost(response.data);
      })
      .catch(error => console.error(error));
  }

  const newBlogpost = () => {
    mainPanelEl.innerHTML = `<h3>New Blog Post</h3>
    <form>
    <label for="title">Title</label>
    <input type="text" name="title" id="input-title" /><br><br>
    <label for="content">Content</label>
    <textarea name="content" id="textarea-content"></textarea><br><br>
    <button id="create-button">Create</button>
    </form>`
    document.querySelector('#create-button').addEventListener('click', createBlogpost);
  }

  const showBlogpost = (blogpost) => {
    mainPanelEl.innerHTML = ""; //clears out panel
    const focusTitleEl = document.createElement('h3');
    const focusContentEl = document.createElement('p');
    focusTitleEl.innerHTML = blogpost.title;
    focusContentEl.innerHTML = blogpost.content;
    const editButtonEl = document.createElement('button');
    const deleteButtonEl = document.createElement('button');
    editButtonEl.id = 'edit-button';
    deleteButtonEl.id = 'delete-button';
    editButtonEl.innerHTML = 'Edit';
    deleteButtonEl.innerHTML = 'Delete';
    mainPanelEl.appendChild(focusTitleEl);
    mainPanelEl.appendChild(focusContentEl);
    mainPanelEl.appendChild(editButtonEl);
    mainPanelEl.appendChild(deleteButtonEl);

    document.querySelector('#edit-button').addEventListener('click', () => {
      editBlogpost(blogpost)
    });
    document.querySelector('#delete-button').addEventListener('click', () => {
      deleteBlogpost(blogpost)
    });
  }
  const loadTitles = () => {
    axios.get(`http://localhost:3001/blogposts`)
      .then(response => {
        console.log(response);
        blogpostTitlesListEl.innerHTML = "";
        response.data.forEach(blogpost => {
          const blogpostTitleEl = document.createElement('li');
          blogpostTitleEl.innerHTML = blogpost.title;
          blogpostTitlesListEl.appendChild(blogpostTitleEl);
          blogpostTitleEl.addEventListener('click', () => {
            showBlogpost(blogpost)
          });
        })
      })
      .catch(error => console.log(error));
  }

  loadTitles();
  document.querySelector('#new-blogpost').addEventListener('click', newBlogpost);
});
