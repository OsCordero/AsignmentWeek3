class UI {
  renderHomePage(posts) {
    //setting featured posts
    //LARGE FEATURED POSTS

    document.querySelector('.content').innerHTML = `
    <section class="featured-section">
        <div class="featured-posts">
          <div class="large-posts"></div>
          <div class="small-posts"></div>
          <div class="medium-posts"></div>
        </div>
        <div class="featured-link"><a href="">SEE ALL FEATURED ></a></div>
      </section>
      <hr />
      <section class="posts-list"></section>
    `;
    document.querySelector('.large-posts').textContent = null;
    document.querySelector('.large-posts').innerHTML = `
    <div class="large-post" id="${posts[0].id}">
        <a class="large-post-image" href=""></a>
        <h1>${posts[0].title}</h1>
        <p>
        ${posts[0].subTitle}
        </p>
        <div class="action">
            <a class="delete" href="" id="${posts[0].id}">&#10008</a>
            <a class="edit" href="" id="${posts[0].id}">&#9998</a>
        </div>
    `;
    document.querySelector('.large-post-image').style.backgroundImage = `url('${posts[0].image}')`;

    //SMALL FEATURED POSTS
    const smallPost = document.querySelector('.small-posts');
    smallPost.innerText = '';
    for (let i = 1; i < 4; i++) {
      smallPost.innerHTML += /*html*/ `
        <div class="small-post id="${posts[i].id}">
            <a class="small-post-image sm-post-${posts[i].id}" href=""></a>
            <div class="small-post-content">
                <h3>${posts[i].title}</h3>
                <p>
                ${posts[i].subTitle}
                </p>
                 <div class="action">
                    <a class="delete" href="" id="${posts[i].id}">&#10008</a>
                    <a class="edit" href="" id="${posts[i].id}">&#9998</a>
                </div>
            </div>
        </div>
        `;
      document.querySelector(
        '.sm-post-' + posts[i].id
      ).style.backgroundImage = `url('${posts[i].image}')`;
    }

    //MEDIUM FEATURED POSTS
    document.querySelector('.medium-posts').textContent = null;
    document.querySelector('.medium-posts').innerHTML = `
        <div class="medium-post id="${posts[4].id}">
            <a class="medium-post-image" href=""></a>
            <h1>${posts[4].title}</h1>
            <p>
            ${posts[4].subTitle}
            </p>
            <div class="action">
            <a class="delete" href="" id="${posts[4].id}">&#10008</a>
            <a class="edit" href="" id="${posts[4].id}">&#9998</a>
        </div>
        </div>`;
    document.querySelector('.medium-post-image').style.backgroundImage = `url('${posts[4].image}')`;

    //REGULAR POST-LIST
    const postsList = document.querySelector('.posts-list');
    postsList.textContent = null;

    for (let i = 5; i < posts.length; i++) {
      postsList.innerHTML += `
        <div class="post-list id="${posts[i].id}">
          <div class="post-list-content">
            <div class="post-list-data">
            <h2>${posts[i].title}</h2>
            <p>
              ${posts[i].subTitle}
            </p>
          </div>
            <div class="action">
            <a class="delete" href="" id="${posts[i].id}">&#10008</a>
            <a class="edit" href="" id="${posts[i].id}">&#9998</a>
        </div>
          </div>
          <a href="" class="post-list-image post-list-${posts[i].id}"></a>
        </div>`;
      document.querySelector(
        '.post-list-' + posts[i].id
      ).style.backgroundImage = `url('${posts[i].image}')`;
    }
  }

  renderCreatePostPage() {
    document.querySelector('.content').innerHTML = `
        <div class="create-form">
        <form action="">
          <div class="form-grid">
            <h1 class="new-post">New post</h1>
            <label for="image">Image(Url):</label>
            <input type="text" name="image" id="image" />
            <span class="error" id="error-image"></span>
            <label for="image">Title:</label>
            <input type="text" name="title" id="title" />
            <span class="error" id="error-title"></span>
            <label for="image">Sub Title:</label>
            <input type="text" name="subtiTle" id="subtitle" />
            <span class="error" id="error-subtitle"></span>
            <label for="image">Author:</label>
            <input type="text" name="author" id="author" />
            <span class="error" id="error-author"></span>
            <label for="image">Date:</label>
            <input type="date" name="date" id="date" />
            <span class="error" id="error-date"></span>
            <label for="image">Body:</label>
            <textarea name="body" id="body" cols="10" rows="10"></textarea>
             <span class="error" id="error-body"></span>
            <label for="image">Tags:</label>
            <input type="text" name="tags" id="tags" />
            <span class="error" id="error-tags"></span>
            <button class="btn" id="create-btn">Create</button>
          </div>
        </form>
      </div>
        `;
  }

  renderEditPostPage(post) {
    const date = new Date(post.createDate).toISOString().substr(0, 10);
    document.querySelector('.content').innerHTML = `
        <div class="edit-form">
      
        <form action="">
          <div class="form-grid">
            <h1 class="new-post">Edit Post: ${post.title} </h1>
            <input type="text" hidden name="id" id="id" value="${post.id}" value=""/>
            <label for="image">Image(Url):</label>
            <input type="text" name="image" id="image" value="${post.image} "/>
            <span class="error" id="error-image"></span>
            <label for="image">Title:</label>
            <input type="text" name="title" id="title" value="${post.title}"/>
            <span class="error" id="error-title"></span>
            <label for="image">Sub Title:</label>
            <input type="text" name="subtiTle" id="subtitle" value="${post.subTitle}"/>
            <span class="error" id="error-subtitle"></span>
            <label for="image">Author:</label>
            <input type="text" name="author" id="author" value="${post.author} "/>
            <span class="error" id="error-author"></span>
            <label for="image">Date:</label>
            <input type="date" name="date" id="date" value="${date}"/>
            <span class="error" id="error-date"></span>
            <label for="image">Body:</label>
            <textarea name="body" id="body" cols="10" rows="10" value=" ">${post.body}</textarea>
             <span class="error" id="error-body"></span>
            <label for="image">Tags:</label>
            <input type="text" name="tags" id="tags" value="${post.tags} "/>
            <span class="error" id="error-tags"></span>
            <button class="btn" id="edit-btn">Edit</button>
          </div>
        </form>
      </div>
        `;
  }

  renderReadPostPage() {
    document.querySelector('.content').innerHTML = `
        <p>This is the read pahe </p>
        `;
  }

  getPostData() {
    const id = document.querySelector('#id') == null ? null : document.querySelector('#id').value;
    const image = document.querySelector('#image').value;
    const title = document.querySelector('#title').value;
    const subTitle = document.querySelector('#subtitle').value;
    const author = document.querySelector('#author').value;
    const createDate = document.querySelector('#date').value.replace(/-/g, '/'); //date format on api
    const body = document.querySelector('#body').value;
    const tags = document.querySelector('#tags').value;

    const postData = {
      id,
      image,
      title,
      subTitle,
      author,
      createDate,
      body,
      tags,
    };
    if (this.validatePostData(postData)) {
      return postData;
    } else {
      return 'nada';
    }
  }

  validatePostData(post) {
    const imageError = document.querySelector('#error-image');
    const titleError = document.querySelector('#error-title');
    const subtitleError = document.querySelector('#error-subtitle');
    const authorError = document.querySelector('#error-author');
    const dateError = document.querySelector('#error-date');
    const bodyError = document.querySelector('#error-body');
    const tagsError = document.querySelector('#error-tags');

    imageError.style.display = 'none';
    titleError.style.display = 'none';
    subtitleError.style.display = 'none';
    authorError.style.display = 'none';
    dateError.style.display = 'none';
    bodyError.style.display = 'none';
    tagsError.style.display = 'none';

    let generalError = false;
    if (this.validateNotNull(post.image)) {
      imageError.style.display = 'block';
      imageError.classList.add('error');
      imageError.innerHTML = 'this is a required field';
      generalError = true;
    }
    if (this.validateNotNull(post.title)) {
      titleError.style.display = 'block';
      titleError.classList.add('error');
      titleError.innerHTML = 'this is a required field';
      generalError = true;
    }
    if (this.validateNotNull(post.subTitle)) {
      subtitleError.style.display = 'block';
      subtitleError.classList.add('error');
      subtitleError.innerHTML = 'this is a required field';
      generalError = true;
    }
    if (this.validateNotNull(post.author)) {
      authorError.style.display = 'block';
      authorError.classList.add('error');
      authorError.innerHTML = 'this is a required field';
      generalError = true;
    }
    if (this.validateNotNull(post.createDate)) {
      dateError.style.display = 'block';
      dateError.classList.add('error');
      dateError.innerHTML = 'this is a required field';
      generalError = true;
    }
    if (this.validateNotNull(post.body)) {
      bodyError.style.display = 'block';
      bodyError.classList.add('error');
      bodyError.innerHTML = 'this is a required field';
      generalError = true;
    }
    if (this.validateNotNull(post.tags)) {
      tagsError.style.display = 'block';
      tagsError.classList.add('error');
      tagsError.innerHTML = 'this is a required field';
      generalError = true;
    }
    if (!generalError) {
      return true;
    } else {
      return false;
    }
  }
  validateNotNull(value) {
    if (value == '' || value == null) {
      return true;
    } else {
      return false;
    }
  }

  printSuccess(action) {
    //'redirect' to home page
    page.change(new homeState());
    //display success message
    document.querySelector('.success').classList.remove('hidden');
    document.querySelector('.success').style.display = 'block';
    document.querySelector('.success').innerHTML =
      '<span> &#10004; </span>Post ' + action + ' successfully';
    //add hidden class to message to fade out (see .hidden css)
    setTimeout(function() {
      document.querySelector('.success').classList.add('hidden');
    }, 2000);
    //givin time to fade out and hidding div
    setTimeout(function() {
      document.querySelector('.success').style.display = 'none';
    }, 3500);
    window.scroll(0, 0);
  }
}
