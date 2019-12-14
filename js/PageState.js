const Ui = new UI();
const Apijson = new ApiJson();
const PageState = function() {
  let currentState = new homeState(this);

  this.init = function() {
    this.change(new homeState());
  };
  this.change = function(state) {
    currentState = state;
  };
};

const homeState = function(page) {
  Apijson.getPosts()
    .then(data => {
      Ui.renderHomePage(data);
    })
    .catch(err => {
      // Ui.printErrorOutput();
    });
};

const homeSearchState = function(value) {
  Apijson.getSearchPosts(value).then(
    data => {
      Ui.renderHomePage(data);
    },
    err => {
      Ui.printErrorOutput();
    }
  );
};

const homeFilterState = function(tag) {
  Apijson.getFilterPosts(tag).then(
    data => {
      Ui.renderHomePage(data);
    },
    err => {
      Ui.printErrorOutput();
    }
  );
};

const readPostState = async function(id) {
  await Apijson.getPost(id)
    .then(async post => {
      authorName = await Apijson.getAuthorName(post.author);
      console.log(post);
      Ui.renderReadPostPage(post, authorName);
    })
    .catch(err => {
      console.log(err);
    });
};

const createPostState = async function(page) {
  await Apijson.getAuthors().then(authors => {
    Ui.renderCreatePostPage(authors);
  });
};
const editPostState = async function(id) {
  await Apijson.getPost(id)
    .then(async post => {
      await Apijson.getAuthors().then(authors => {
        console.log(post);
        Ui.renderEditPostPage(post, authors);
      });
    })
    .catch(err => {
      console.log(err);
    });
};

//instanciate pageState
const page = new PageState();
const logoBtn = document.querySelector('.logo');

//change state to home state
logoBtn.addEventListener('click', e => {
  page.change(new homeState());
  e.preventDefault();
});
