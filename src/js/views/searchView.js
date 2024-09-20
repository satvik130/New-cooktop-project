import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () =>{
    elements.searchInput.value = '';

};

export const clearResults =() =>{
     elements.searchResList.innerHTML='';
     elements.pagebtn.innerHTML='';
};

export const highlightSelected = (id) => {
    if(id){
        if(document.querySelectorAll('.card'))
            document.querySelectorAll('.card').forEach(el=> el.classList.remove('activeCard'));
        if(document.querySelector(`.recipeList a[href="#${id}"`))
            document.querySelector(`.recipeList a[href="#${id}"`).firstElementChild.classList.add('activeCard');
    }
}

export const limitRecipeTitle =(title,limit=17) => { //  BUG: didnt exported 
     const newTitle =[];
     if(title.length >limit){
         title.split(' ').reduce((acc,cur)=>{
             if(acc+length<=limit){
                 newTitle.push(cur);

             }
             return acc + cur.length;
            },0);
            return`${newTitle.join(' ')}...`;
         }
        return title;
}

const renderRecipe = recipe =>{
    const markup = ` 
    <a class="card-link" href="#${recipe.recipe_id}">
        <div class="card">
            <img src="${recipe.image_url}" alt="${recipe.title}">
                <div class="cardTitle">${limitRecipeTitle(recipe.title)}</div>
                <div class="cardCook">${recipe.publisher}</div>
        </div>
    </a>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend',markup);
};

/*type: prev or next
const createButton =(page,type) =>`
<button class="${type}" data-goto=${type ==='prev'? page -1 : page+1}>
      <span>Page ${type ==='prev'? page-1 : page+1}</span>
</button>
      
`;*/

const renderButtons =(cur,total) =>{
    if(cur === 1)
    {
        //display next
    
        elements.pagebtn.insertAdjacentHTML('beforeend',`
        <button class="next" data-page="${cur+1}">PAGE <span>${cur+1}</span> &gt;  </button>
        `)


    }
    else if(cur === total)
    {
        //display prev
        
        elements.pagebtn.insertAdjacentHTML('beforeend',`
        <button class="prev" data-page="${cur-1}">&lt; PAGE <span>${cur-1}</span> </button>
        `)
    }
    else{
        //display both
        
        elements.pagebtn.insertAdjacentHTML('beforeend',`
        <button class="prev" data-page="${cur-1}">&lt; PAGE <span>${cur-1}</span> </button>
        <button class="next" data-page="${cur+1}">PAGE <span>${cur+1}</span> &gt;  </button>
        `)
    }
    
};

export const renderResults = (recipes,page=1,resPerPage=10) =>{
    clearResults();
    const start =(page -1)*resPerPage;
    const end = page * resPerPage;
    recipes.slice(start,end).forEach(renderRecipe);

    //render pagination buttons
    renderButtons (page,Math.ceil(recipes.length/resPerPage));
};