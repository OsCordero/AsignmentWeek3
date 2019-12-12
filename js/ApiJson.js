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
  async getPost(id) {
    let data = {};
    const postsResponse = await fetch(this.url + '/posts/' + id);
    const post = await postsResponse.json();
    if (postsResponse.status === 200) {
    } else {
      throw new Error(postsResponse.statusText);
    }
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
}
