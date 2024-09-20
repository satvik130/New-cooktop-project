 export const elements ={
     
    searchForm:document.querySelector('.search'),
    searchInput: document.querySelector('.sreach_field'),
    searchRes: document.querySelector('.recipeList'),
    searchResList:document.querySelector('.recipeListPanel'),
    pagebtn: document.querySelector('.pagebtn'),
    recipe: document.querySelector('.recipeShowcase'),
    shopping: document.querySelector('.shoppingcartPanel'),
    likeListPanel : document.querySelector('.likeListPanel'),
    likeMenu : document.querySelector('.likes')

};

export const displayLoader = parent => {
   parent.insertAdjacentHTML('afterbegin', `
   <div class = "loader">
   <i class="fas fa-sync-alt"></i>
   </div>
   `)
}


export const clearLoader = () => {
   const load = document.querySelector('.loader');
   if(load)
   load.remove();
}
export const imageHTTPS = imageURL => {
   const newURL = "https"+imageURL.slice(4); 
}