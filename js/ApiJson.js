class ApiJson {
  constructor() {
    this.url = ' http://localhost:3000';
  }

  async getPosts() {
    let data = {};
    const postsResponse = await fetch(this.url + '/posts?_sort=createDate&_order=desc');
    const posts = await postsResponse.json();

    if (postsResponse.status === 200) {
    } else {
      throw new Error(postsResponse.statusText);
    }

    return posts;
  }
  async getSearchPosts(value) {
    let data = {};
    const postsResponse = await fetch(
      this.url + '/posts?_sort=createDate&_order=desc&title_like=' + value
    );
    const posts = await postsResponse.json();

    if (postsResponse.status === 200) {
    } else {
      throw new Error(postsResponse.statusText);
    }

    return posts;
  }

  async getFilterPosts(tag) {
    console.log(tag);
    const tagId = await this.getTagsIds([tag]);
    console.log(tagId);
    const posts = await this.getPosts();
    let filterPosts = [];
    let i;
    for (i = 0; i < posts.length; i++) {
      for (let j = 0; j < posts[i].tags.length; j++) {
        if (posts[i].tags[j] == tagId) {
          filterPosts.push(posts[i]);
          break;
        }
      }
    }
    return filterPosts;
  }
  async getPost(id) {
    let data = {};
    const postsResponse = await fetch(this.url + '/posts/' + id);
    const post = await postsResponse.json();
    if (postsResponse.status === 200) {
    } else {
      throw new Error(postsResponse.statusText);
    }
    const tagsNames = await this.getTagsNames(post.tags);
    post.tags = tagsNames;
    return post;
  }
  async postPost(post) {
    const response = await fetch(this.url + '/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (response.status !== 400) {
      const resData = await response.json();
      Ui.printSuccess('created');
      return resData;
    }
  }

  async updatePost(post) {
    const response = await fetch(this.url + '/posts/' + post.id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (response.status !== 400) {
      const resData = await response.json();
      Ui.printSuccess('edited');
      return resData;
    }
  }
  async deletePost(id) {
    const response = await fetch(this.url + '/posts/' + id, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (response.status !== 400) {
      const resData = await response.json();
      Ui.printSuccess('deleted');
      return resData;
    }
  }

  async getTags() {
    const response = await fetch(this.url + '/tags');
    const tags = await response.json();
    return tags;
  }
  async checkTags(tags) {
    let tagsUrl = '/tags?';
    tags.forEach(tag => {
      tagsUrl += 'name=' + tag + '&';
    });
    const response = await fetch(this.url + tagsUrl);
    const repeatedTags = await response.json();
    const stringTags = repeatedTags.map(tag => {
      return tag.name.toLowerCase();
    });
    const newTags = tags.filter(x => !stringTags.includes(x));
    const objetNewTags = newTags.map(name => ({ name, slug: name }));
    console.log(objetNewTags);
    await this.postTags(objetNewTags);
    console.log(newTags);
    return newTags;
  }

  async postTags(tags) {
    for (const tag of tags) {
      await fetch(this.url + '/tags', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(tag),
      });
    }
  }

  async getTagsIds(tags) {
    let tagsUrl = '/tags?';
    tags.forEach(tag => {
      tagsUrl += 'name=' + tag + '&';
    });
    console.log(tags);

    const response = await fetch(this.url + tagsUrl);
    const fetchedTags = await response.json();
    console.log(fetchedTags);
    const tagsIds = fetchedTags.map(tag => tag.id);

    return tagsIds;
  }

  async getTagsNames(tags) {
    if (tags.length > 0) {
      let tagsUrl = '/tags?';
      tags.forEach(tag => {
        tagsUrl += 'id=' + tag + '&';
      });
      const response = await fetch(this.url + tagsUrl);
      const fetchedTags = await response.json();
      const tagsNames = fetchedTags.map(tag => tag.name);
      return tagsNames;
    } else {
      return '';
    }
  }
}
