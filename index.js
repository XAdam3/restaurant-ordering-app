import menuArray from "/data.js";

const menu = document.getElementById("menu");
const order = document.getElementById("order");
const modal = document.getElementById("modal");

let foodItemName = [];
let isItemRemoved = false;

document.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.dataset.add) {
    order.classList.remove("hidden");
    getOrder(e.target.dataset.add);
    getOrderHtml(e.target.dataset.add);
    total();
  }
  if (e.target.dataset.remove) {
    isItemRemoved = true;
    removeItem(e.target.dataset.remove);
  }

  if (e.target.id === "order-btn") {
    modal.classList.remove("hidden");
  }
  if (e.target.id === "modal-btn") {
    modal.classList.add("hidden");
    submitForm();
    confirmationOfOrder(fullName);
  }
});

function getMenuHtml() {
  let menuHtml = "";

  menuArray.forEach((item) => {
    let ingredients = "";

    const ingredientsArray = item.ingredients;
    ingredientsArray.forEach((ingredient) => {
      ingredients += ingredient;
    });
    const { name, uuid, price, emoji } = item;

    menuHtml += `
    <div class="menu-container">
                <div class="menu-item" id=${uuid}>
                        <span class="emoji" >${emoji}</span>
                        <div class="menu-details">
                            <p class="name">${name}</p>
                            <p class="ingredients">${ingredients}</p>
                            <p class="price">$${price}</p>
                        </div>
                        <div class="plus-icon">
                            <i class="fa-sharp fa-solid fa-circle-plus icon"
                            data-add="${uuid}"
                            ></i>
                        </div>
                </div>
    </div>     
        `;
  });
  return menuHtml;
}

function getOrderHtml() {
  const selectedItems = document.getElementById("selected-items");
  if (foodItemName.length > 0) {
    let orderHtml = "";
    foodItemName.forEach((item) => {
      orderHtml += `<div class="order-name">
              <p>${item.name}</p>
              <span class="remove" data-remove="${item.uuid}">remove</span>
              <p class="order-price">$${item.price}</p>
          </div>`;
      selectedItems.innerHTML = orderHtml;
    });
  }
}

function getOrder(itemId) {
  const menuList = [...menuArray];

  const menuItem = menuList.filter((item) => item.uuid === itemId)[0];

  foodItemName.push(menuItem);
}

function removeItem(id) {
  const removedItem = foodItemName.filter((item) => item.uuid === id);
  if (isItemRemoved && foodItemName.length > 0) {
    foodItemName.pop(removedItem);
    getOrderHtml();
    total();
  } else {
    order.classList.add("hidden");
  }
}

function total() {
  const total = document.getElementById("total");
  let totalAmount = 0;
  if (foodItemName.length > 0) {
    foodItemName.forEach((item) => {
      return (totalAmount += item.price);
    });

    total.innerHTML = `<p>$${totalAmount}</p>`;
  } else {
    totalAmount = 0;
  }
}

function submitForm() {
  const formData = new FormData(modal);
  const fullName = formData.get("name");

  confirmationOfOrder(fullName);
}

function confirmationOfOrder(fullName) {
  const html = `
  <div class ="order-confirmation" id="confirmation">
    <p> Thanks, ${fullName}! Your order is on its way!</p>
  </div>
                `;
  order.innerHTML = html;
}

function render() {
  menu.innerHTML = getMenuHtml();
}
render();
