async function fillTagBar() {
  tags = await Apijson.getTags();
  tags.forEach(tag => {
    document.querySelector(
      '.tag-bar'
    ).innerHTML += ` <li><a class="tag" href="">${tag.name}</a></li>`;
  });
}
fillTagBar();
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

    const postData = await Ui.getPostData();
    await Apijson.checkTags(postData.tags);
    const tagsId = await Apijson.getTagsIds(postData.tags);
    postData.tags = tagsId;
    Apijson.postPost(postData);
  });
});

//edit post
document.querySelector('.content').addEventListener('click', async e => {
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
      const postData = await Ui.getPostData();
      await Apijson.checkTags(postData.tags);
      const tagsId = await Apijson.getTagsIds(postData.tags);
      postData.tags = tagsId;
      Apijson.updatePost(postData);
    });
  }
});

//read post
document.querySelector('.content').addEventListener('click', async e => {
  if (e.target.classList.contains('read')) {
    e.preventDefault();
    page.change(await readPostState(e.target.id));
    document.querySelector('.tags-list').addEventListener('click', e => {
      if (e.target.classList.contains('tag')) {
        e.preventDefault();
        tag = e.target.innerHTML;
        page.change(new homeFilterState(tag));
      }
    });
  }
});

//delete post
document.querySelector('.content').addEventListener('click', e => {
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

//filter post by tag
function filterByTag() {
  document.querySelector('.tag-bar').addEventListener('click', e => {
    if (e.target.classList.contains('tag')) {
      e.preventDefault();
      tag = e.target.innerHTML;
      page.change(new homeFilterState(tag));
    }
  });
}

filterByTag();
