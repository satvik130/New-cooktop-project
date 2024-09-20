import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/ShoppingList';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingListView from './views/shoppingListView';
import * as likeView from './views/likeView';
import { elements, displayLoader, clearLoader } from './views/base';



/**Global state of the app
 * -Search object
 * - Current recipe object
 * - Shopping list object
 * -liked recipes
 */

const state = {};
window.state = state;

//SEARCH CONTROLLER
const controlSerach = async () => {

    //1.get a query
    const query = searchView.getInput();

    if (query) {
        //2. new search object and add to state
        state.Search = new Search(query);

        //3 prepare UI result
        searchView.clearInput();
        searchView.clearResults();
        displayLoader(elements.searchRes);
        try {
            // 4 search for recipes
            await state.Search.getResult();

            // 5 render result on UI//
            searchView.clearInput();
            clearLoader(); // BUG 
            searchView.renderResults(state.Search.result);

        } catch (err) {
            alert(`something went wrong ${err}`);
            clearLoader();
        }



    }

}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSerach();

});


const pageClick = (event) => {
    const btn = event.target.closest('.pagebtn>button');
    if (btn) {
        const nextPage = btn.dataset.page;
        searchView.renderResults(state.Search.result, parseInt(nextPage));

    }
}

elements.pagebtn.addEventListener('click',pageClick);

//RECIPE CONTROLLER

const controlRecipe = async () => {
    //get the id from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        //prepare UI for changes
        recipeView.clearRecipe();
        displayLoader(elements.recipe);


        //create new recipe objects
        state.recipe = new Recipe(id);
        searchView.highlightSelected(id);

        try {
            //get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //render recipe
            clearLoader(); // BUG
            if(!state.likes)
            state.likes = new Likes();
            recipeView.renderRecipe(state.recipe,state.likes.isLiked(id));

        } catch (err) {
            alert(`error processing recipe! :${err}`);
        }



    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));





const plusMinusClick = (event) => {
    if (event.target.matches('.plus, .plus *')) {

        state.recipe.updateServings('inc'); // changed true with inc 


    }
    if (event.target.matches('.minus, .minus *')) {
        if (state.recipe.servings > 1)
            state.recipe.updateServings('dec'); // changed false with dec
    }
    if (state.recipe) {
        recipeView.updateIng(state.recipe);
        recipeView.updateServings(state.recipe);
    }


}

elements.recipe.addEventListener('click', plusMinusClick);

//shoppinglist

const controlList = event => {
    if (event.target.matches('.addbtn, .addbtn *')) {
        if (!state.List)
            state.List = new List();
        state.recipe.ingredients.forEach(ingObj => {
            state.List.additem(ingObj.quant, ingObj.unit, ingObj.ingredient);
        });
        state.List.items.forEach(item => {
            shoppingListView.DisplayItem(item);
        })
    }
}

const handleShopfuncs = (event) => {
    const id = event.target.closest('.ingredientCard').dataset.itemid;
    if (event.target.matches('.del, .del *')) {
        state.List.deleteItem(id);
        shoppingListView.deleteitem(id);
    }
    else if (event.target.matches(".shopQuantVal>input")) {
        const value = event.target.value;
        state.List.updateCount(id, value);
    }



}

elements.recipe.addEventListener('click', controlList)
elements.shopping.addEventListener('click', handleShopfuncs)
window.s = state;

//LIKE CONTROLER


const controlLikes = (event) => {
    if(event.target.matches(".heart, .heart *")) {
        if(!state.likes)
            state.likes = new Likes()
        likeView.toggleLike()
        if(state.likes.isLiked(state.recipe.id)) {
            //remove from state
            state.likes.delLike(state.recipe.id);
            //remove from ui
            likeView.delLikeUi(state.recipe.id)

        }
        else {
            //toggle bottun ui

            //add to state
            const item = state.likes.addLike(
                state.recipe.id,
                state.recipe.title,
                state.recipe.publisher,
                state.recipe.image,
            )
            //add to UI
                likeView.addLikeUi(item);

        }

        likeView.toggleLikeMenu(state.likes.getLikeNums());
    }
}

elements.recipe.addEventListener('click', controlLikes);

const startup = ()=>{
    state.likes = new Likes();
    state.likes.restoreLike();
    if(state.likes)
    state.likes.list.forEach(item => {likeView.addLikeUi(item);})
    likeView.toggleLikeMenu(state.likes.getLikeNums());
}

window.addEventListener('load',startup);
// debugging

window.s = state;

 /* wo hata rhne doo
// tumne hata kyu diya :( are mai hata nahi rahi thii sorry* 
    ike = (event) => 
    {*/

