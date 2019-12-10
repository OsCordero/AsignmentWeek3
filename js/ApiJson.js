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
}
