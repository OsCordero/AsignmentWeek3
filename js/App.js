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

const createPostState = function(page) {};

const readPostState = function(page) {};

//instanciate pageState
const page = new PageState();

//Init the first state
