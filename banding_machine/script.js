//variables
const $productList = document.querySelector("ul.list_product");
const $btnReturn = document.querySelector(".cont_bottom .btn_return");
const $btnDeposit = document.querySelector(".cont_bottom .btn_deposit");
const $btnGet = document.querySelector(".cont_bottom .btn_get");
const $inputDeposit = document.querySelector(".cont_bottom .input_deposit");
const $balance = document.querySelector(".txt_balance");
const $budget = document.querySelector(".txt_budget");

let selectItems = [];
let orderItems = [];

// event listeners
$productList.addEventListener("click", itemClickHandler);
$btnDeposit.addEventListener("click", depositBtnClickHandler);
$btnReturn.addEventListener("click", returnBtnClickHandler);
$btnGet.addEventListener("click", getBtnClickHandler);

// event handlers
function getBtnClickHandler() {
  addOrder();
}

function returnBtnClickHandler() {
  const currBudget = parseInt(localStorage.getItem("budget"));
  const currBalance = parseInt($balance.textContent);

  if (currBalance > 0) {
    localStorage.setItem("budget", currBalance + currBudget);
    $budget.textContent = `${currBalance + currBudget}원`;
    $balance.textContent = "0원";
  }
}

function depositBtnClickHandler() {
  const currBudget = localStorage.getItem("budget");
  const currBalance = parseInt($balance.textContent);
  const inputDeposit = parseInt($inputDeposit.value);

  if (inputDeposit <= currBudget) {
    const remind = currBudget - inputDeposit;
    $balance.textContent = `${currBalance + inputDeposit}원`;
    localStorage.setItem("budget", remind);
    $budget.textContent = `${remind}원`;
  } else {
    alert("소지금보다 적은 금액만 입력할 수 있습니다.");
  }
  $inputDeposit.value = "";
}

function itemClickHandler(e) {
  const target = e.target;
  let $selectItem;
  let productName = "";

  // 선택한 아이템의 name 가져오기
  if (target.tagName === "BUTTON") {
    $selectItem = target;
    productName = target.querySelector(".product_name").textContent;
  } else if (target.parentElement.tagName === "BUTTON") {
    $selectItem = target.parentElement;
    if (target.classList.contains("product_name")) {
      productName = target.textContent;
    } else {
      productName =
        target.parentElement.querySelector(".product_name").textContent;
    }
  }

  // 선택한 아이템의 가격이 잔액보다 작고
  // 재고 수량 보다 적게 선택됐는지 확인
  const itemInfo = products.find((item) => item.name === productName);
  const currBalance = parseInt($balance.textContent);

  if (itemInfo.price <= currBalance) {
    $selectItem.classList.add("active");

    // 선택한 아이템이 selectItems에 존재하는지 확인
    let foundIdx = selectItems.findIndex(
      (product) => product.name === productName
    );

    if (foundIdx >= 0) {
      if (selectItems[foundIdx].stock >= 1) {
        selectItems[foundIdx].quantity = selectItems[foundIdx].quantity + 1;
        selectItems[foundIdx].stock = selectItems[foundIdx].stock - 1;
        if (selectItems[foundIdx].stock === 0) {
          $selectItem.classList.remove("active");
          $selectItem.parentElement.classList.add("soldout");
        }
      } else {
        alert(
          `재고 수량이 부족합니다. (${selectItems[foundIdx].name}의 남은 수량: ${selectItems[foundIdx].stock})`
        );
        return;
      }
    } else {
      if (itemInfo.stock >= 1) {
        selectItems.push({
          ...itemInfo,
          stock: itemInfo.stock - 1,
          quantity: 1,
        });

        if (itemInfo.stock - 1 === 0) {
          console.log($selectItem);
          $selectItem.classList.remove("active");
          $selectItem.parentElement.classList.add("soldout");
        }
      } else {
        alert(
          `재고 수량이 부족합니다. (${selectItems[foundIdx].name}의 남은 수량: ${selectItems[foundIdx].stock})`
        );
        return;
      }
    }

    localStorage.setItem("selectItems", JSON.stringify(selectItems));
    $balance.textContent = `${currBalance - itemInfo.price}원`;
    addBasket();
  } else {
    alert("잔액이 부족합니다.");
  }
}

// functions
function init() {
  localStorage.clear();

  // 초기 UI 세팅
  $balance.textContent = "0원";
  productSetting();

  const budget = prompt("소지금을 입력해주세요.(숫자만)");
  localStorage.setItem("budget", budget);
  $budget.textContent = `${localStorage.getItem("budget")}원`;
}

function productSetting() {
  products.forEach((product) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const img = document.createElement("img");
    const $name = document.createElement("span");
    const $price = document.createElement("span");

    button.classList.add("btn_item");
    img.src = `./images/${product.image}`;
    $name.textContent = product.name;
    $name.classList.add("product_name");
    $price.textContent = `${product.price}원`;
    $price.classList.add("price");

    button.append(img, $name, $price);
    li.appendChild(button);
    $productList.appendChild(li);
  });
}

function addBasket() {
  const $selectList = document.querySelector(".cont_bottom .cont_chosen ul");

  // 기존에 추가된 아이템 모두 지우기
  removeAllChildren($selectList);

  selectItems.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("item");
    const img = document.createElement("img");
    img.src = `./images/${item.image}`;
    const $name = document.createElement("span");
    $name.classList.add("product_name");
    $name.textContent = item.name;
    const $quantity = document.createElement("span");
    $quantity.classList.add("quantity");
    $quantity.textContent = item.quantity;

    li.append(img, $name, $quantity);
    $selectList.appendChild(li);
  });
}

function addOrder() {
  const $selectList = document.querySelector(".cont_bottom .cont_chosen > ul");
  const $orderList = document.querySelector(".cont_get .cont_chosen > ul");

  // 깊은 복사(deep copy)
  const currSelectItem = JSON.stringify(selectItems);
  JSON.parse(currSelectItem).forEach((selectItem) => {
    const foundIdx = orderItems.findIndex(
      (orderItem) => orderItem.name === selectItem.name
    );
    if (foundIdx >= 0) {
      orderItems[foundIdx].quantity =
        parseInt(orderItems[foundIdx].quantity) + parseInt(selectItem.quantity);
    } else {
      orderItems.push(selectItem);
    }
  });

  // 기존에 추가된 아이템 모두 지우기
  removeAllChildren($orderList);

  orderItems.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("item");
    const img = document.createElement("img");
    img.src = `./images/${item.image}`;
    const $name = document.createElement("span");
    $name.classList.add("product_name");
    $name.textContent = item.name;
    const $quantity = document.createElement("span");
    $quantity.classList.add("quantity");
    $quantity.textContent = item.quantity;

    li.append(img, $name, $quantity);
    $orderList.appendChild(li);
  });

  removeAllChildren($selectList);
  selectItems = [];

  setTotalPrice();
}

function setTotalPrice() {
  const $totalPrice = document.querySelector("#cont_order .total_price");
  const prefix = "총금액: ";
  let total = 0;

  orderItems.forEach((item) => {
    total += parseInt(item.price) * parseInt(item.quantity);
  });

  $totalPrice.textContent = prefix + total + "원";
}

function removeAllChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// start
init();
