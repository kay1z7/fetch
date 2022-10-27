let page = 1;

function render() {
  let container = document.querySelector(".container");
  container.innerHTML = "";
  fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
    .then(result => result.json())
    .then(data =>
      data.forEach(item => {
        container.innerHTML += `
          <div class="card">
            <div class="card-header">
              <b>Post id: ${item.id}</b><br />
              <b>${item.title}</b>
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>${item.body}</p>
              </blockquote>
              <button
                class="btn btn-dark user-btn"
                id="authorId-${item.userId}"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                About author
              </button>
            </div>
          </div>
          `;
      })
    );

  addModalEvent();
}

render();

function writeAuthorObj(id) {
  let modal = document.querySelector(".modal-body");
  modal.innerHTML = `
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `;
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(result => result.json())
    .then(data => {
      setTimeout(() => {
        modal.innerHTML = "";
        modal.innerHTML += `
        <p><b>Author id</b>: ${data.id}</p>
        <p><b>Email</b>: ${data.email}</p>
        <p><b>Name</b>: ${data.name}</p>
        <p><b>Username</b>: ${data.username}</p>
        `;
      }, 1000);
    });
}

function getPostAuthor(e) {
  let authorId = e.target.id.split("-")[1];
  writeAuthorObj(authorId);
}

function addModalEvent() {
  setTimeout(() => {
    let authorBtns = document.querySelectorAll(".user-btn");
    authorBtns.forEach(item => item.addEventListener("click", getPostAuthor));
  }, 2000);
}

let nextPage = document.querySelector("#next-page");
let prevPage = document.querySelector("#prev-page");

function checkPages() {
  if (page === 1) {
    prevPage.style.display = "none";
    nextPage.style.display = "block";
  } else if (page === 10) {
    prevPage.style.display = "block";
    nextPage.style.display = "none";
  } else {
    prevPage.style.display = "block";
    nextPage.style.display = "block";
  }
}
checkPages();

nextPage.addEventListener("click", () => {
  page++;
  render();
  checkPages();
});

prevPage.addEventListener("click", () => {
  page--;
  render();
  checkPages();
});

let homeBtn = document.querySelector("#home-btn");
homeBtn.addEventListener("click", () => {
  page = 1;
  render();
  checkPages();
});

let searchBtn = document.querySelector("#search-btn");
let searchInp = document.querySelector("#search-inp");
searchInp.addEventListener("input", e => {
  let users = (products = products.filter(item => {
    return (
      item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );
  }));
  render((data = products));
});
