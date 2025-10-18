let StoredData = localStorage.getItem("transactions");

let allData = [[], { totalBalance: 0, totalIncome: 0, totalExpense: 0 }];

if (StoredData) {
  allData = JSON.parse(StoredData);
}
let data = allData[0];
let balances = allData[1];

console.log(allData);

let transactionsContainerEl = document.getElementById("transactionsContainer");
let transactionNameEl = document.getElementById("transactionName");
let filterEl = document.getElementById("filter");

transactionNameEl.textContent = "All Transactions";

function updateTransactions(data) {
  transactionsContainerEl.innerHTML = "";
  if (data.length !== 0) {
    data.forEach((element) => {
      let typeClass = "expense";
      let amountClass = "red";
      let sign = "-";
      if (element.type === "Income") {
        typeClass = "income";
        amountClass = "green";
        sign = "+";
      }
      transactionsContainerEl.innerHTML += `<li class="transaction-item">
            <div class="transaction-item-note">
           
              <span class="type ${typeClass}">${element.type}</span>
              <span class="name">${element.name}</span>
            </div>
            
             <p class="amount ${amountClass}">${sign} ${element.amount} </p>   
        </li>`;
    });
  }
}

updateTransactions(data);

filterEl.addEventListener("change", () => {
  let filteredData;
  if (filterEl.value === "All") {
    filteredData = data;
    transactionNameEl.textContent = "All Transactions";
  } else {
    filteredData = data.filter((element) => {
      return filterEl.value === element.type;
    });
    transactionNameEl.textContent = `${filterEl.value} Transactions`;
  }
  updateTransactions(filteredData);
});
