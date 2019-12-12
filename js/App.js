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
//edit post
document.querySelector('body').addEventListener('click', e => {
  // if (e.target.classList.contains('edit')) {
  //e.preventDefault();
  //   page.change(new editPostState(e.target.id));
  //   setTimeout(() => {
  //     document.querySelector('#edit-btn').addEventListener('click', e => {
  //       e.preventDefault();
  //       const postData = Ui.getPostData();
  //       console.log(postData);
  //       Apijson.updatePost(postData);
  //     });
  //   }, 1000);
  // }
});
