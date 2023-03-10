
// Инициализация списка автомобилей
let carList = [
  { brand: "Toyota", model: "Corolla", color: "Синий", qty: 5, price: 1000000 },
  { brand: "Toyota", model: "Camry", color: "Черный", qty: 3, price: 1500000 },
  { brand: "Honda", model: "Civic", color: "Красный", qty: 2, price: 800000 },
  { brand: "Nissan", model: "Almera", color: "Белый", qty: 7, price: 600000 },
  { brand: "Lada", model: "Granta", color: "Зеленый", qty: 10, price: 500000 },
  { brand: "Ford", model: "Focus", color: "Серый", qty: 4, price: 1200000 },
  { brand: "Kia", model: "Rio", color: "Желтый", qty: 1, price: 900000 },
  { brand: "Hyundai", model: "Solaris", color: "Оранжевый", qty: 6, price: 1100000 },
  { brand: "Volkswagen", model: "Polo", color: "Коричневый", qty: 8, price: 1300000 },
  { brand: "BMW", model: "X3", color: "Сиреневый", qty: 2, price: 3000000 },
];

// Настройки постраничного вывода
const pageSize = 5;
const currentPage = 1;

// Функция вывода списка на страницу
function displayList() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = " ";
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = startIndex + pageSize;
  let carSubset = carList.slice(startIndex, endIndex);
  for (let i = 0; i < carSubset.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML =
      "<td>" +
      carSubset[i].brand +
      "</td><td>" +
      carSubset[i].model +
      "</td><td>" +
      carSubset[i].color +
      "</td><td>" +
      carSubset[i].qty +
      "</td><td>" +
      carSubset[i].price +
      "</td><td><button onclick='openModal(\"edit\", " +
      (startIndex + i) +
      ")'>Редактировать</button><button onclick='deleteCar(" +
      (startIndex + i) +
      ")'>Удалить</button></td>";
    tableBody.appendChild(row);
  }
  
  displayPagination();
}

// Функция вывода постраничной навигации на страницу
function displayPagination() {
  let pageCount = Math.ceil(carList.length / pageSize);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  for (let i = 1; i <= pageCount; i++) {
    let button = document.createElement("button");
    button.innerHTML = i;
    button.onclick = function () {
      currentPage = parseInt(this.innerHTML);
      displayList();
    };
    if (i === currentPage) {
      button.classList.add("active");
    }
    pagination.appendChild(button);
  }
}

// Функция сортировки списка по выбранному полю
function sortTable(column) {
  carList.sort(function (a, b) {
    let x = a[Object.keys(a)[column]].toLowerCase();
    let y = b[Object.keys(b)[column]].toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });
  displayList();
}

// Функция поиска автомобилей по заданному параметру
function searchCar(query) {
  let results = [];
  for (let i = 0; i < carList.length; i++) {
    for (let property in carList[i]) {
      if (
        carList[i][property]
          .toString()
          .toLowerCase()
          .includes(query.toLowerCase())
      ) {
        results.push(carList[i]);
        break;
      }
    }
  }
  carList = results;
  currentPage = 1;
  displayList();
}

// Функция добавления автомобиля
function addCar(brand, model, color, qty, price) {
  carList.push({ brand: brand, model: model, color: color, qty: qty, price: price });
  displayList();
  closeModal();
}

// Функция редактирования автомобиля
function editCar(index, brand, model, color, qty, price) {
  carList[index].brand = brand;
  carList[index].model = model;
  carList[index].color = color;
  carList[index].qty = qty;
  carList[index].price = price;
  displayList();
  closeModal();
}

// Функция удаления автомобиля с подтверждением
function deleteCar(index) {
  const confirmDelete = confirm("Удалить выбранный автомобиль?");
  if (confirmDelete) {
    carList.splice(index, 1);
    displayList();
  }
}

// Функция открытия модального окна для добавления или редактирования автомобиля
function openModal(action, index) {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
  const carForm = document.getElementById("carForm");
  carForm.reset();
  const title = modal.querySelector(".modal-title");
  const brandField = modal.querySelector("#carBrand");
  const modelField = modal.querySelector("#carModel");
  const colorField = modal.querySelector("#carColor");
  const qtyField = modal.querySelector("#carQty");
  const priceField = modal.querySelector("#carPrice");
  if (action === "add") {
    title.innerHTML = "Добавить автомобиль";
    carForm.onsubmit = function (event) {
      event.preventDefault();
      addCar(
        brandField.value,
        modelField.value,
        colorField.value,
        qtyField.value,
        priceField.value
      );
    };
  } else if (action === "edit") {
    title.innerHTML = "Редактировать автомобиль";
    let car = carList[index];
    brandField.value = car.brand;
    modelField.value = car.model;
    colorField.value = car.color;
    qtyField.value = car.qty;
    priceField.value = car.price;
    const carIndexField = document.getElementById("carIndex");
    carIndexField.value = index;
    carForm.onsubmit = function (event) {
      event.preventDefault();
      editCar(
        index,
        brandField.value,
        modelField.value,
        colorField.value,
        qtyField.value,
        priceField.value
      );
    };
  }
}

// Функция закрытия модального окна
function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

// Инициализация списка на странице
displayList();
