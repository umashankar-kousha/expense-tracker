let StoredData = localStorage.getItem("transactions");

let allData = [[], { totalBalance: 0, totalIncome: 0, totalExpense: 0 }];

if (StoredData) {
  allData = JSON.parse(StoredData);
}
let data = allData[0];
let balances = allData[1];

let addTransactionBtnContainerEl = document.getElementById(
  "addTransactionBtnContainer"
);

let addtransactionEl = document.getElementById("addtransaction");
let transactionNameEl = document.getElementById("transactionName");
let amountEl = document.getElementById("amount");
let IncomeEl = document.getElementById("Income");
let ExpenseEl = document.getElementById("Expense");
let RecentTransactionsEl = document.getElementById("RecentTransactions");
let balanceEl = document.getElementById("balance");
let totalIncomeEl = document.getElementById("totalIncome");
let totalExpenseEl = document.getElementById("totalExpense");

addTransactionBtnContainerEl.addEventListener("click", () => {
  addtransactionEl.classList.remove("hide");
  addTransactionBtnContainerEl.classList.add("hide");
});

function updateRecentTransactions(data) {
  let recentData = data.slice(0, 3);
  RecentTransactionsEl.innerHTML = "";
  if (recentData.length !== 0) {
    recentData.forEach((element) => {
      let transactionItem = document.createElement("li");
      transactionItem.classList.add("transaction-item");
      let containerEl = document.createElement("div");
      containerEl.classList.add("transaction-item-note");
      let typeSpanEl = document.createElement("span");
      typeSpanEl.classList.add("type");
      element.type === "Income"
        ? typeSpanEl.classList.add("income")
        : typeSpanEl.classList.add("expense");
      typeSpanEl.innerHTML = element.type;
      let nameSpanEl = document.createElement("span");
      nameSpanEl.classList.add("name");
      nameSpanEl.innerHTML = element.name;
      containerEl.appendChild(typeSpanEl);
      containerEl.appendChild(nameSpanEl);
      let transactionAmountEl = document.createElement("p");
      transactionAmountEl.classList.add("amount");
      if (element.type === "Income") {
        transactionAmountEl.classList.add("green");
        transactionAmountEl.innerHTML = `+ ${element.amount}`;
      } else {
        transactionAmountEl.classList.add("red");
        transactionAmountEl.innerHTML = `- ${element.amount}`;
      }

      transactionItem.appendChild(containerEl);
      transactionItem.appendChild(transactionAmountEl);
      RecentTransactionsEl.appendChild(transactionItem);
    });
  }
}

function renderSummary(balances) {
  balanceEl.textContent = `\u20B9 ${balances.totalBalance}`;
  totalIncomeEl.textContent = `\u20B9 ${balances.totalIncome}`;
  totalExpenseEl.textContent = `\u20B9 ${balances.totalExpense}`;
}

renderSummary(balances);
updateRecentTransactions(data);

function validateInput(name, amount) {
  let validInput = true;
  if (isNaN(Number(name)) === false) {
    validInput = false;
    alert("Please Enter Valid Name ");
    return validInput;
  }
  if (isNaN(Number(amount)) === true) {
    validInput = false;
    alert("Please Enter Valid Amount ");
    return validInput;
  }
  return validInput;
}

addtransactionEl.addEventListener("submit", (event) => {
  event.preventDefault();

  let name = transactionNameEl.value;
  let amount = amountEl.value;
  let isValidInputs = validateInput(name, amount);
  if (isValidInputs) {
    let type = IncomeEl.checked ? IncomeEl.value : ExpenseEl.value;
    if (type === "Income") {
      balances.totalBalance += Number(amount);
      balances.totalIncome += Number(amount);
    } else {
      balances.totalBalance -= Number(amount);
      balances.totalExpense += Number(amount);
    }

    renderSummary(balances);

    data.unshift({
      name: name,
      amount: amount,
      type: type,
    });

    /* balances = {
      totalBalance: totalBalance,
      totalIncome: totalIncomeEl,
      totalExpense: totalExpense,
    }; */
    allData = [data, balances];
    let stringifiedData = JSON.stringify(allData);
    localStorage.setItem("transactions", stringifiedData);

    updateRecentTransactions(data);
    transactionNameEl.value = "";
    amountEl.value = "";
    IncomeEl.checked = true;
    addtransactionEl.classList.add("hide");
    addTransactionBtnContainerEl.classList.remove("hide");
  }
});
