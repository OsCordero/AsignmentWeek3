//create post
document.querySelector('#create-post').addEventListener('click', e => {
  e.preventDefault();
  page.change(new createPostState());
  document.querySelector('#create-btn').addEventListener('click', e => {
    e.preventDefault();
    const postData = Ui.getPostData();
    Apijson.postPost(postData);
  });
});

//edit post
document.querySelector('body').addEventListener('click', async e => {
  if (e.target.classList.contains('edit')) {
    e.preventDefault();
    page.change(await editPostState(e.target.id));

    document.querySelector('#edit-btn').addEventListener('click', e => {
      e.preventDefault();
      const postData = Ui.getPostData();
      console.log(postData);
      Apijson.updatePost(postData);
    });
  }
});

//read post
document.querySelector('body').addEventListener('click', e => {
  if (e.target.classList.contains('read')) {
    e.preventDefault();
    page.change(new readPostState(e.target.id));
  }
});

//delete post
document.querySelector('body').addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    e.preventDefault();
    if (confirm('are you sure? this can not be undone!')) {
      Apijson.deletePost(e.target.id);
    }
  }
});

//search post
document.querySelector('.search-btn').addEventListener('click', e => {
  e.preventDefault();
  const title = document.querySelector('.search-input').value;
  page.change(new homeSearchState(title));
});
