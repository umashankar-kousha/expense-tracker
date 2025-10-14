let addTransactionBtnContainerEl = document.getElementById(
  "addTransactionBtnContainer"
);

let addtransactionEl = document.getElementById("addtransaction");

addTransactionBtnContainerEl.addEventListener("click", () => {
  addtransactionEl.classList.remove("hide");
  addTransactionBtnContainerEl.classList.add("hide");
});
