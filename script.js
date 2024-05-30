let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expnese-table-body');
const totalAmountCell = document.getElementById('total-amount');

let isEditing = false;
let currentEditIndex = -1;

addBtn.addEventListener('click', function () {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    if (isEditing) {
        updateExpense(currentEditIndex, category, amount, date);
        isEditing = false;
        addBtn.textContent = 'Add';
    } else {
        addExpense(category, amount, date);
    }

    clearInputs();
});

function addExpense(category, amount, date) {
    const expense = { category, amount, date };
    expenses.push(expense);

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    addExpenseToTable(expense);
}

function addExpenseToTable(expense) {
    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const editCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        const index = expenses.indexOf(expense);
        expenses.splice(index, 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expensesTableBody.removeChild(newRow);
    });

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', function () {
        categorySelect.value = expense.category;
        amountInput.value = expense.amount;
        dateInput.value = expense.date;

        isEditing = true;
        currentEditIndex = expenses.indexOf(expense);
        addBtn.textContent = 'Update';
    });

    deleteCell.appendChild(deleteBtn);
    editCell.appendChild(editBtn);
}

function updateExpense(index, category, amount, date) {
    const expense = expenses[index];

    totalAmount -= expense.amount;

    expense.category = category;
    expense.amount = amount;
    expense.date = date;

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    refreshTable();
}

function refreshTable() {
    expensesTableBody.innerHTML = '';

    for (const expense of expenses) {
        addExpenseToTable(expense);
    }
}

function clearInputs() {
    categorySelect.value = '';
    amountInput.value = '';
    dateInput.value = '';
}

for (const expense of expenses) {
    totalAmount += expense.amount;
    totalAmountCell.textContent = totalAmount;

    addExpenseToTable(expense);
}