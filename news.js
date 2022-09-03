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

     displayNews.sort((a,b) => {
        return b.total_view - a.total_view;
     });

     console.log(displayNews);
     
     displayNews.forEach( news => {
    //    console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = ` 
              <div class="card h-100 shadow rounded">
                    <img src="${news.image_url}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title cardTitle">${news.title ? news.title : 'No Title Found'}</h5>
                    <p class="card-text">${news.details.slice(0,200)}...</p>
                    <div class="d-flex justify-content-between">

                        <div class='d-flex pt-2 image'>
                            <img src="${news.author.img ? news.author.img : 'No Img Found'}" class="img-fluid rounded-circle" alt="...">
                            <div>
                            <p class='ms-2 fw-bold'>${news.author.name ? news.author.name : 'No Details Found'} <br>${news.author.published_date ? news.author.published_date : 'No Date Found'}</p>
                            </div>
                        </div >

                        <div class="mt-4 d-flex">
                            <i class="fa-regular fa-eye mt-1 mx-2"></i>
                            <h6 class="">${news.total_view ? news.total_view : '00'}M</h6>
                        </div>

                        <div class="mt-2">
                            <button class='btn btn-primary' style="height:50px;" onclick="loadModalNews('${news._id}')" data-bs-toggle="modal"  data-bs-target="#exampleModal">More Info</button>
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

