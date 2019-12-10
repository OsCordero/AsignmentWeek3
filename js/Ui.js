class UI {
  renderHomePage(posts) {
    //setting featured posts
    //LARGE FEATURED POSTS

    document.querySelector('.large-posts').textContent = null;
    document.querySelector('.large-posts').innerHTML = `
    <div class="large-post">
        <a class="large-post-image" href=""></a>
        <h1>${posts[0].title}</h1>
        <p>
        ${posts[0].subTitle}
        </p>
    </div>
    `;
    document.querySelector('.large-post-image').style.backgroundImage = `url('${posts[0].image}')`;

    //SMALL FEATURED POSTS
    const smallPost = document.querySelector('.small-posts');
    smallPost.innerText = '';
    for (let i = 1; i < 4; i++) {
      console.log(i);
      smallPost.innerHTML += /*html*/ `
        <div class="small-post">
            <a class="small-post-image sm-post-${posts[i].id}" href=""></a>
            <div class="small-post-content">
                <h3>${posts[i].title}</h3>
                <p>
                ${posts[i].subTitle}
                </p>
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
        <div class="medium-post">
            <a class="medium-post-image" href=""></a>
            <h1>${posts[4].title}</h1>
            <p>
            ${posts[4].subTitle}
            </p>
        </div>`;
    document.querySelector('.medium-post-image').style.backgroundImage = `url('${posts[4].image}')`;

    //REGULAR POST-LIST
    const postsList = document.querySelector('.posts-list');
    postsList.textContent = null;
    console.log(posts.length);
    for (let i = 5; i < posts.length; i++) {
      postsList.innerHTML += `
        <div class="post-list">
          <div class="post-list-content">
            <h2>${posts[i].title}</h2>
            <p>
              ${posts[i].subTitle}
            </p>
          </div>
          <a href="" class="post-list-image post-list-${posts[i].id}"></a>
        </div>`;
      document.querySelector(
        '.post-list-' + posts[i].id
      ).style.backgroundImage = `url('${posts[i].image}')`;
    }
  }
}
