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
  Apijson.getSearchPosts(value)
    .then(data => {
      Ui.renderHomePage(data);
    })
    .catch(err => {
      // Ui.printErrorOutput();
    });
};

const readPostState = function(id) {
  Apijson.getPost(id)
    .then(data => {
      Ui.renderReadPostPage(data);
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
};

const createPostState = function(page) {
  Ui.renderCreatePostPage();
};
const editPostState = async function(id) {
  await Apijson.getPost(id)
    .then(data => {
      Ui.renderEditPostPage(data);
      console.log(data);
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
