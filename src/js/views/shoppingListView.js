import {elements} from './base'; 

export const DisplayItem = item =>{
    const markup =`
    <div class="ingredientCard" data-itemid=${item.id}>
        <div class="shopQuantity">
            <input type="number" value="${item.quant}" steps="${item.quant}" class="shopQuantVal">
            <div class="shopUnit">${item.unit}</div>
        </div>
        <div class="shopItemName">${item.ingredient}</div>
        <div class="del"><i class="far fa-times-circle"></i></div>
    </div>
    `;

    elements.shopping.insertAdjacentHTML('beforeend',markup);

}

export const deleteitem =id =>{
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if(item)
    item.parentElement.removeChild(item);
};