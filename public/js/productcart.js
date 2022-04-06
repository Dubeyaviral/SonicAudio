if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}


function ready(){
    const removeCartItem = document.getElementsByClassName('btn-danger');
    updateCartTotal();
    for(var i=0;i<removeCartItem.length;i++){
        var button = removeCartItem[i];
        button.addEventListener('click',removeCart)
    }

    var addcartbtn = document.getElementsByClassName('addcart');
    for(var i=0;i<addcartbtn.length;i++){
        var button = addcartbtn[i];
        button.addEventListener('click', addToCartClicked);
    }
}

function removeCart(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal();
}

function addToCartClicked(event){
    var button = event.target;
    var shopProduct = button.parentElement.parentElement;
    var title = shopProduct.getElementsByClassName('hName')[0].innerText;
    var price = shopProduct.getElementsByClassName('price')[0].innerText;
    var imageSrc = shopProduct.getElementsByClassName('productImg')[0].src;
   
    addItemToCart(title,price,imageSrc);
}

function addItemToCart(title,price,imageSrc){
    var cartRow = document.createElement('tr');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item');
    for(var i=0;i<cartItemNames.length;i++){
        if(cartItemNames[i].getElementsByClassName('cart-itemTitle').innerText === title){
            alert("This item is already added to the cart");
            return;
        }
    }
    var cartRowContents = `<td class="cart-item">
      <img class="cartimg" src="${imageSrc}" alt="" srcset="" width="100px" height="100px">
      <p class='cart-item cart-itemTitle'> ${title} </p> </td>
    <td class="cart-price" >${price}</td>
    <td>
      <input
        type="number"
        name="quantity"
        class="cart-quantity"
        min="1"
        max="5"
        step="1"
        value="1"
      />
      <button
        id="removebtn"
        class="btn btn-danger btn-sm m-3 "
        type="button"
      >
        Remove
      </button>
    </td>`;
  cartRow.innerHTML += cartRowContents;
  cartItems.append(cartRow);
  updateCartTotal()
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCart); 
    cartRow.getElementsByClassName('cart-quantity')[0].addEventListener('change',updateCartTotal);
    
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for(var i=0;i<cartRows.length;i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName ('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('Rs.',''));
        var quantity = quantityElement.value;
        total +=price*quantity;
        total = Math.round(total*100)/100;
        
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = `Rs. ${total}`;

}