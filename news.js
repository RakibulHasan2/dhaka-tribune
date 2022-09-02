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
        console.log(category);
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
        const res = await fetch(url);
        const data = await res.json();
      displayCategoryNews(data.data);
    }
    catch(error){
        console.log(error);
    }
 }
 categoryNewsLoad();
 const displayCategoryNews = displayNews =>{
    // console.log(displayNews);
     const newsContainer = document.getElementById('news-container');
     
     displayNews.forEach( news => {
        // console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card mb-3 mt-5">
            <div class="row g-0">
                <div class="col-lg-3">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-lg-9 border">
                    <div class="card-body">
                      <h5 class="card-title">${news.title}</h5>
                      <p class="card-text">${news.details}</p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
     })
    
}