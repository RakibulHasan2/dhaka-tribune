 //load the category list from API
 const categoriesLoad = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    try{
        const res = await fetch(url);
        const data = await res.json();
       displayCategory(data.data.news_category);  
    }
    catch(error){
        console.log(error);
    }
 }
 categoriesLoad();
 //displaying category list
 const displayCategory = categories => {
    // console.log(categories);
    const categoryContainer = document.getElementById('category-container');
    categories.forEach( category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <a class="nav-link text-secondary fw-bold" href="#" onclick ="categoryNewsLoad('${category.category_id}')">${category.category_name}</a>
        `;
        categoryContainer.appendChild(categoryDiv);
    })
 }

 //load category news
 const categoryNewsLoad =  async category_id => {
    const url =  `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    try{
        //start toggle spinner
        toggleSpinner(true);
        const res = await fetch(url);
        const data = await res.json();
      displayCategoryNews(data.data);
    }
    catch(error){
        console.log(error);
    }
  
 }
 const displayCategoryNews = displayNews =>{

    //total news found list
    const categoryFound = document.getElementById('news-found');
    categoryFound.innerHTML = '';
    const categoryH3 = document.createElement('h3');
    categoryH3.innerHTML = `Total ${displayNews.length ? displayNews.length : 'No'} News Founded`;
    categoryFound.appendChild(categoryH3);

    // //sorting array 
    // const sortedArrayNews = displayNews.sort();
    // console.log(sortedArrayNews);

    //   console.log(displayNews);
     const newsContainer = document.getElementById('news-container');
     newsContainer.innerHTML = '';
     
     displayNews.forEach( news => {
    //    console.log(news);
        const newsDiv = document.createElement('div');
        
        newsDiv.innerHTML = `
        <div class="card mb-3 mt-5 p-3 shadow p-3 mb-5 bg-body rounded">
            <div class="row g-0">
                <div class="col-lg-3">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-lg-9">
                    <div class="card-body">
                      <h5 class="card-title fs-4">${news.title ? news.title : 'No Title Found'}</h5>
                      <p class="card-text text-overflow">${news.details}</p>
                    </div>
                    <div class="d-flex justify-content-between mt-4">
                        <div class="image d-flex">
                            <img src="${news.author.img ? news.author.img : 'No Title Found'}" class="img-fluid rounded-circle" alt="...">
                            <div>
                            <p class="card-title fw-bold mx-3">${news.author.name ? news.author.name : 'No Details Found'}</p>
                            <p class="card-title fw-bold mx-3">${news.author.published_date ? news.author.published_date : 'No Date Found'}</p>
                            </div>
                        </div>

                        <div class="mt-3 d-flex">
                        <i class="fa-regular fa-eye mt-1 mx-3"></i>
                          <h5>${news.total_view ? news.total_view : '00'}M</h5>
                        </div>

                        <div class="mt-3">
                          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick ="loadModalNews('${news._id}')">More Info </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
        //stop toggle spinner
        toggleSpinner(false);
     })   
}

//adding toggle spinner
const toggleSpinner  = isLoading => {
    const loaderSpinner = document.getElementById('loader');
    if(isLoading)
    {
            loaderSpinner.classList.remove('d-none');
    }
    else{
        loaderSpinner.classList.add('d-none');
    }
}

const loadModalNews = async news_id =>  {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayModal(data.data[0]);
    }
    catch(error){
        console.log(error);
    }
}
// loadModalNews();

const displayModal = modalDetails => {
    console.log(modalDetails);
    const modalTitle = document.getElementById('exampleModalLabel');
     modalTitle.innerText = modalDetails.author.name;
     const modalInfo = document.getElementById('modal-details');
     modalInfo.innerHTML = `
     <p> Release Date : ${modalDetails.author.published_date ? modalDetails.author.published_date : 'No Release Date Found'} </p>
     <p> Total Views : ${modalDetails.total_view ? modalDetails.total_view : 'No Views Found'} </p>
     <p> Rating : ${modalDetails.rating.number ? modalDetails.rating.number : 'No Ratings Found'} </p>
     <p> Badge : ${modalDetails.rating.badge ? modalDetails.rating.badge : 'No Badge Found'} </p>
     `;
}

