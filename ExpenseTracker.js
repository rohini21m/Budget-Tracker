const balanceTotal = document.querySelector(".bars .value");
const IncomeTotal = document.querySelector(".income-total");
const ExpenseTotal = document.querySelector(".expense-total");

const incomeBtn = document.querySelector(".tab1");
const expenseBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");

const IncomeEl = document.querySelector("#income");
const ExpenseEl = document.querySelector("#expense");
const AllEl = document.querySelector("#all");

const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

const IncomeTitle = document.getElementById("Income-title-input");
const IncomeAmount = document.getElementById("Income-Amount-input");
const AddIncome = document.getElementById("AddIncome");

const ExpenseTitle = document.getElementById("expense-title");
const ExpenseAmount = document.getElementById("expense-Amount");
const AddExpense = document.getElementById("AddExpense");

let Entry_List = [];
let income = 0,
  spends = 0,
  balance = 0;
const DELETE = "delete";
const EDIT = "edit";
expenseBtn.addEventListener("click", function () {
  show(ExpenseEl);
  hide([IncomeEl, AllEl]);
  inactive([incomeBtn, allBtn]);
  active(expenseBtn);
});
incomeBtn.addEventListener("click", function () {
  show(IncomeEl);
  hide([ExpenseEl, AllEl]);
  inactive([expenseBtn, allBtn]);
  active(incomeBtn);
});
allBtn.addEventListener("click", function () {
  show(AllEl);
  hide([ExpenseEl, IncomeEl]);
  inactive([expenseBtn, incomeBtn]);
  active(allBtn);
});
AddExpense.addEventListener("click", function () {
  //if any title or amount is empty exit //
  if (!ExpenseTitle.value || !ExpenseAmount.value) return;
  let expense = {
    type: "expense",
    title: ExpenseTitle.value,
    amount: parseInt(ExpenseAmount.value),
  };
  Entry_List.push(expense);
  UpdateUI();
  clearInput([ExpenseTitle, ExpenseAmount]);
});
AddIncome.addEventListener("click", function () {
  //if any title or amount is empty exit //
  if (!IncomeTitle.value || !IncomeAmount.value) return;

  let income = {
    type: "income",
    title: IncomeTitle.value,
    amount: parseInt(IncomeAmount.value),
  };
  Entry_List.push(income);
  UpdateUI();
  clearInput([IncomeTitle, IncomeAmount]);
});

function UpdateUI() {
  income = calculateTotal("income", Entry_List);
  spends = calculateTotal("expense", Entry_List);
  balance = Math.abs(calculateBalance(income, spends));

  // detemining sign in the balance section
  let sign = income >= spends ? "$" : "-$";

  balanceTotal.innerHTML = `<small>${sign}</small>${balance}`;
  IncomeTotal.innerHTML = `<small> $ </small> ${income}`;
  ExpenseTotal.innerHTML = `<small> $ </small> ${spends}`;

  clearElement([incomeList, expenseList, allList]);

  Entry_List.forEach((entry, index) => {
    if (entry.type == "expense") {
      showEntry(expenseList, entry.type, entry.title, entry.amount, index);
    } else if (entry.type == "income") {
      showEntry(incomeList, entry.type, entry.title, entry.amount, index);
    }

    showEntry(allList, entry.type, entry.title, entry.amount, index);
  });
}

function showEntry(list, type, title, amount, id) {
  const entry = `<li id = "${id}" class = "${type}">
                    <div class="entry"> ${title}:$${amount}</div>
                     <div id="edit"></div>
                     <div id="delete"></div>
                   
                    </li>`;

  const position = "afterbegin";
  list.insertAdjacentHTML(position, entry);
}

function clearInput(inputs) {
  inputs.forEach((input) => {
    input.value = "";
  });
}

function calculateTotal(type, list) {
  let sum = 0;
  list.forEach((entry) => {
    if (entry.type == type) {
      sum += entry.amount;
    }
  });
  return sum;
}

function calculateBalance(income, spends) {
  return income - spends;
}

function clearElement(elements) {
  elements.forEach((element) => {
    element.innerHTML = "";
  });
}

function show(element) {
  element.classList.remove("hide");
}

function hide(elements) {
  elements.forEach((element) => {
    element.classList.add("hide");
  });
}
function active(element) {
  element.classList.add("active");
}

function inactive(elements) {
  elements.forEach((element) => {
    element.classList.remove("active");
  });
}
