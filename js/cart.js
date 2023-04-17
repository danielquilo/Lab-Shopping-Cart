/* global Cart */
"use strict";
const help = document.getElementById("tbody");
// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById("cart");
table.addEventListener("click", removeItemFromCart);

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  state.cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
  state.cart.updateCounter();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  const tableRows = document.querySelectorAll("#cart tbody tr");
  for (let i = 0; i <= tableRows.length; i++) {
    if (tableRows[i]) {
      tableRows[i].remove();
    }
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  const tableBody = document.querySelector("#cart tbody");
  for (let i in state.cart.items) {
    const tr = document.createElement("tr");
    const xTD = document.createElement("td");
    xTD.textContent = "x";
    xTD.classList.add("remover");
    xTD.id = i;

    const qTD = document.createElement("td");
    qTD.textContent = state.cart.items[i].quantity;

    const iTD = document.createElement("td");
    iTD.textContent = state.cart.items[i].product;

    tableBody.appendChild(tr);
    tr.appendChild(xTD);
    tr.appendChild(qTD);
    tr.appendChild(iTD);
  }
  // TODO: Find the table body
  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
}

function removeItemFromCart(event) {
  if (event.target.classList.contains("remover")) {
    state.cart.removeItem(parseInt(event.target.id));
    state.cart.saveToLocalStorage();
    renderCart();
  }

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table
}

// This will initialize the page and draw the cart on screen
renderCart();
