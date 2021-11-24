//*************search field arrow function
search = () => {
  const searchField = document.getElementById("search-Field");
  const bookCard = document.getElementById("bookCard");
  const totalFound = document.getElementById("found");
  const emptyInput = document.getElementById("emptyInput");
  const error = document.getElementById("error");

  const searchValue = searchField.value;
  bookCard.textContent = "";
  totalFound.innerText = "";
  error.style.display = "none";
  if (searchValue === "") {
    spinner("hidden");
    emptyInput.style.display = "block";
    error.style.display = "none";
    totalFound.innerText = "";
    bookCard.textContent = "";
  } 
  else {
    spinner("visible");
    emptyInput.style.display = "none";
    //  Load book url
    const url = `https://openlibrary.org/search.json?q=${searchValue}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        displayBook(data);
      });
  }
   //clear the search field
  searchField.value = "";
};

displayBook = (data) => {
  const totalFound = document.getElementById("found");
  totalFound.innerText = `Almost ${data.numFound} Results found. `;

  console.log("results", data);

  //***********display error message *//
  const error = document.getElementById("error");
  if (data.numFound === 0) {
    totalFound.innerText = "";
    error.style.display = "block";
    spinner("hidden");
  } else {
    error.style.display = "none";
    const bookCard = document.getElementById("bookCard");
//display each book in a card
    data?.docs.forEach((item) => {
      //Access div
      const div = document.createElement("div");
      console.log(item);
      //    conditional image show
      item?.cover_i
        ? (imgUrl = `https://covers.openlibrary.org/b/id/${item?.cover_i}-M.jpg`)
        : (imgUrl = "images/error.png");

      // conditional author
      item?.author_name ? (auth = item?.author_name.join()) : (auth = "not available");
      // conditional publisher
      item?.publisher[0] ? (publisher = item?.publisher[0]) : (publisher = "not available");
      // conditional publish date
      item?.publish_date[0] ? (publishDate = item?.publish_date[0]) : (publishDate = "not available");

      console.log(item?.title);
//display each book in a card
      div.innerHTML = `
       <div class="col">
           <div class="card">
                <img height='450px'  src=${imgUrl}  class="card-img-top" alt="...">
               <div class="card-body">
                   <h5 id="author" class="card-title">${item?.title}</h5>
                   <h6 class="card-text">Author:  <span class ="text-secondary"> ${auth} </span></h6>
                   <h6 class="card-text">Publisher: <span class ="text-secondary"> ${publisher} </span> </h6>
                   <h6 class="card-text">Published: <span class ="text-secondary">  ${publishDate} </span> </h6>

               </div>
           </div>
       </div>
       `;
      bookCard.appendChild(div);
      spinner("hidden");
    });
  }
};

// ********** //spinner function
spinner = (property) => {
  const spinner = document.getElementById("spinner");
  spinner.style.visibility = property;
};
