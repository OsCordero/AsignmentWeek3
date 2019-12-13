//create post
document.querySelector('#create-post').addEventListener('click', e => {
  e.preventDefault();
  page.change(new createPostState());
  document.querySelector('#tags').addEventListener('keyup', e => {
    if (e.target.value == ',') {
      e.target.value = '';
    }
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9,]/g, '').replace(/(\,,*)\,/g, '$1');
  });
  document.querySelector('#create-btn').addEventListener('click', async e => {
    e.preventDefault();

    const postData = Ui.getPostData();

    const post = await Apijson.checkTags(postData.tags);
    console.log(post);
    Apijson.postPost(postData);
  });
});

//edit post
document.querySelector('body').addEventListener('click', async e => {
  if (e.target.classList.contains('edit')) {
    e.preventDefault();
    page.change(await editPostState(e.target.id));
    document.querySelector('#tags').addEventListener('keyup', e => {
      if (e.target.value == ',') {
        e.target.value = '';
      }
      e.target.value = e.target.value.replace(/[^a-zA-Z0-9,]/g, '').replace(/(\,,*)\,/g, '$1');
    });

    document.querySelector('#edit-btn').addEventListener('click', async e => {
      e.preventDefault();
      const postData = Ui.getPostData();
      await Apijson.checkTags(postData.tags);
      const tagsId = await Apijson.getTagsIds(postData.tags);
      postData.tags = tagsId;
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
document.querySelector('.search-form').addEventListener('submit', e => {
  e.preventDefault();
  const title = document.querySelector('.search-input').value;
  page.change(new homeSearchState(title));
});

async function fillTagBar() {
  tags = await Apijson.getTags();
  console.log(tags);
  tags.forEach(tag => {
    console.log('aber');
    console.log(document.querySelector('.tag-bar'));
    document.querySelector('.tag-bar').innerHTML += ` <li><a href="">${tag.name}</a></li>`;
  });
}
fillTagBar();
