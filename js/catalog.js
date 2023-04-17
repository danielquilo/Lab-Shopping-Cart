/* global Product, Cart */

"use strict";

// Set up an empty cart for use on this page.
state.cart = localStorage.cart ? new Cart(JSON.parse(localStorage.cart)) : new Cart([]);
if (state.cart.items) {
  state.cart.updateCounter();
  for (let i = 0; i < state.cart.items.length; i++) {
    updateCartPreview(state.cart.items[i]);
  }
}
// On screen load, we call this method to put all of the product options
// (the things in the state.allProducts array) into the drop down list.
function populateForm() {
  //TODO: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById("items");
  for (let i in state.allProducts) {
    const option = document.createElement("option");
    option.value = state.allProducts[i].name;
    option.textContent = state.allProducts[i].name;
    selectElement.appendChild(option);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  // TODO: Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  state.cart.saveToLocalStorage();
  state.cart.updateCounter();
  updateCartPreview(state.cart.items[state.cart.items.length - 1]);
  event.target.reset();
}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  const item = document.getElementById("items").value;
  const quantity = document.getElementById("quantity").value;
  state.cart.addItem(item, quantity);
  // TODO: suss out the item picked from the select list
  // TODO: get the quantity
  // TODO: using those, add one item to the Cart
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview(item) {
  const product = item.product;
  const quantity = item.quantity;
  const cartContent = document.getElementById("cartContents");
  const itemElement = document.createElement("div");
  itemElement.textContent = `${quantity} : ${product}`;
  cartContent.appendChild(itemElement);
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById("catalog");
catalogForm.addEventListener("submit", handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
