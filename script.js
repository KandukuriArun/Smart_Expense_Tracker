const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const totalDisplay = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Load existing expenses
displayExpenses();
updateTotal();

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const amount = Number(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  const expense = {
    id: Date.now(),
    title,
    amount,
    category,
    date
  };

  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpenses();
  updateTotal();
  expenseForm.reset();
});

function displayExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach(exp => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${exp.title} - ${exp.category} - ₹${exp.amount}
      <span class="delete" onclick="deleteExpense(${exp.id})">❌</span>
    `;

    expenseList.appendChild(li);
  });
}

function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  displayExpenses();
  updateTotal();
}

function updateTotal() {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  totalDisplay.textContent = total;
}
