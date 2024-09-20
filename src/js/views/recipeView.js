import {elements, imageHTTPS} from './base'; 
const Fraction = require('fraction.js'); // ye kiya hai import

export const clearRecipe =()=>{
    elements.recipe.innerHTML='';
}

const formatQuant = quant => {
    const roundQuant = Math.round(quant*100)/100;
    const frac = new Fraction(roundQuant);
    return frac.toFraction(true);

}

    
const createIngredient = ingredient => {
    
      const html =   `
        <div class="ingredient">
            <i class="far fa-check-circle"></i>
            <div class="quantity">${formatQuant(ingredient.quant)}</div>
            <div class="ingredientName"><span class="unit">${ingredient.unit}</span>  ${ingredient.ingredient}</div>
        </div>
        
        `;
        return html;
}

export const renderRecipe = (recipe,isLiked) =>{
     const markup =`
     <div class="recipePhoto">
            <img src="${recipe.img}" alt="${recipe.title}">
            <h1><span>${recipe.title}</span></h1>
      </div>
        <div class="recipeDetails">
            <div class="time">
                <i class="far fa-clock"></i>
                <span class="inputTime">${recipe.time}</span>
            </div>
            <div class="serving">
                <i class="fas fa-user"></i>
                <span class="inputPeople">${recipe.servings}</span>
                <button class="plus"> + </button>
                <button class="minus">-</button>
            </div>
            <div class="heart">
                <i class="fas fa-heart ${isLiked?"liked":""}"></i>
            </div>
        </div>
        <div class="ingredientList">
            ${recipe.ingredients.map(el => createIngredient(el)).join('')} 
        </div>
        <div class="addbtnContainer">
         <button class="addbtn"><i class="fas fa-shopping-cart"></i>Add To shopping Cart</button>
        </div>
        <div class="directions">
            <h2>How To Cook</h2>
            <div class="content">This recipe was carefully designed and tested by <span class="creator"> ${recipe.author}</span>.Please check out directions at their website.</div>
            <a href="${recipe.url}">
            <button class="dirbutton">DIRECTIONS <i class="fas fa-play"></i></button>
           </a>
         </div>

     `;
     elements.recipe.insertAdjacentHTML('afterbegin',markup);
}

export const updateServings = (recipe) => document.querySelector('.inputPeople').textContent = recipe.servings;

export const updateIng = (recipe) => {
    const quantityDivs  = Array.from(document.querySelectorAll('.quantity'));
    quantityDivs.forEach((el,i) => {
        el.textContent =formatQuant(recipe.ingredients[i].quant);
    })
}
