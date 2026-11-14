let btn_home = document.getElementById("btn_home");
let btn_add_transaction = document.getElementById("btn_add_transaction");
let btn_transactions = document.getElementById("btn_transactions");
let btn_settings = document.getElementById("btn_settings");
let btn_profile = document.getElementById("btn_profile");

let homePage = document.querySelector(".home-page");
let transactionsPage = document.querySelector(".transactions-page");
let addTransactionPage = document.querySelector(".add-transaction-page");
let settingsPage = document.querySelector(".settings-page");
let profilePage = document.querySelector(".profile-page");

let btn_View_All = document.getElementById("view_all");


let content = document.querySelector(".content");



// pages
function showHomePage() {
    btn_home.classList.add("active");
    btn_add_transaction.classList.remove("active");
    btn_transactions.classList.remove("active");
    btn_settings.classList.remove("active");
    btn_profile.classList.remove("active");

    homePage.style.display = "block";
    transactionsPage.style.display = "none";
    addTransactionPage.style.display = "none";
    settingsPage.style.display = "none";
    profilePage.style.display = "none";
}

btn_home.addEventListener("click", function (event) {
    showHomePage();
});


function showAddTransactionsPage() {
    btn_home.classList.remove("active");
    btn_add_transaction.classList.add("active");
    btn_transactions.classList.remove("active");
    btn_settings.classList.remove("active");
    btn_profile.classList.remove("active");

    addTransactionPage.style.display = "block";
}

btn_add_transaction.addEventListener("click", function (event) {
    showAddTransactionsPage();
});


function showTransactionsPage() {
    btn_home.classList.remove("active");
    btn_add_transaction.classList.remove("active");
    btn_transactions.classList.add("active");
    btn_settings.classList.remove("active");
    btn_profile.classList.remove("active");

    homePage.style.display = "none";
    transactionsPage.style.display = "block";
    addTransactionPage.style.display = "none";
    settingsPage.style.display = "none";
    profilePage.style.display = "none";
}
btn_transactions.addEventListener("click", function (event) {
    showTransactionsPage();
});
btn_View_All.addEventListener("click", function (event) {
    showTransactionsPage();
});


btn_settings.addEventListener("click", function (event) {
    btn_home.classList.remove("active");
    btn_add_transaction.classList.remove("active");
    btn_transactions.classList.remove("active");
    btn_settings.classList.add("active");
    btn_profile.classList.remove("active");

    addTransactionPage.style.display = "none";
    transactionsPage.style.display = "none";
    homePage.style.display = "none";
    settingsPage.style.display = "block";
    profilePage.style.display = "none";
});

btn_profile.addEventListener("click", function (event) {
    btn_home.classList.remove("active");
    btn_add_transaction.classList.remove("active");
    btn_transactions.classList.remove("active");
    btn_settings.classList.remove("active");
    btn_profile.classList.add("active");

    addTransactionPage.style.display = "none";
    transactionsPage.style.display = "none";
    homePage.style.display = "none";
    settingsPage.style.display = "none";
    profilePage.style.display = "block";
});



// closing add transaction page
let closeAddTransactionPage = document.getElementById("close-add-transaction");

closeAddTransactionPage.addEventListener("click", function (event) {
    addTransactionPage.style.display = "none";
    clearTransactionForm();
    add_transaction_btn.innerText = "Add Transaction";
    add_transaction_btn.onclick = handleAddTransaction;
    showHomePage();
});


// Seve General Settings
let language = '';
let currency = '';
let balances = '';


let language_select = document.getElementById("Language");
let currency_select = document.getElementById("currency");
let balances_select = document.getElementById("hide-balances");
let save_general_settings_btn = document.getElementById("save-general-settings");


function general_settings() {
    let sevedGeneralSettings =  JSON.parse(localStorage.getItem("general_settings")) || {language: "english", currency:"$", balances:"show"};

    language = sevedGeneralSettings.language;
    currency = sevedGeneralSettings.currency;
    balances = sevedGeneralSettings.balances;

    language_select.value = language;
    currency_select.value = currency;
    balances_select.value = balances;

}

save_general_settings_btn.onclick = function(){
    let sevedGeneralSettings = {language: `${language_select.value}`, currency: `${currency_select.value}`, balances: `${balances_select.value}`}

    localStorage.setItem("general_settings", JSON.stringify(sevedGeneralSettings));

    general_settings()

    // Refresh Page
    location.reload();
}

general_settings();



// add transaction
let add_transaction_btn = document.getElementById('transaction-btn');

let transaction_name = document.getElementById("transaction-name");
let transaction_amount = document.getElementById("transaction-amount");
let type = document.getElementById("transaction-type");
let category = document.getElementById("transaction-category");
let date = document.getElementById("transaction-date");

function addTransaction() {
    if (transaction_name.value && transaction_amount.value && type.value && category.value && date.value) {
        let transaction = {
            name: transaction_name.value,
            amount: transaction_amount.value,
            type: type.value,
            category: category.value,
            date: date.value
        };
        let transactions = JSON.parse(localStorage.getItem("transactions"));
        transactions.push(transaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }
}

let transactionForm = document.getElementById("add-transaction-form");

function handleAddTransaction() {
    if (!transactionForm.reportValidity()) {
        return;
    }

    if (Number(transaction_amount.value) <= 0) {
        alert("Amount must be greater than zero");
        return;
    }

    if (localStorage.getItem("transactions") === null) {
        localStorage.setItem("transactions", JSON.stringify([]));
    }

    addTransaction();
    clearTransactionForm();
    showTransactions();
    showLastFourTransactions();

    addTransactionPage.style.display = "none";
    showHomePage();

    calculateTotalIncome_Expense_netBalance();
}

function clearTransactionForm() {
    transaction_name.value = "";
    transaction_amount.value = "";
    type.value = "";
    category.value = "";
    date.value = "";
}

add_transaction_btn.onclick = handleAddTransaction ;


// show transactions
let transactionsTable = document.getElementById("transaction-list");

function showTransactions() {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    let content_tr = "";

    transactions.forEach(function(transaction) {
        let type_avec_color = '';
        let amount_avec_color = '';
        let i = transactions.indexOf(transaction);
        if(transaction.type == 'income'){
            type_avec_color = `<td class="type_income">${transaction.type}</td>`
            amount_avec_color = `<td class="amount_income">+ ${currency}${transaction.amount}</td>`;
        }
        else {
            type_avec_color = `<td class="type_expense">${transaction.type}</td>`;
            amount_avec_color = `<td class="amount_expense">- ${currency}${transaction.amount}</td>`;
        }
        content_tr += `<tr>
            <td>${transaction.date}</td>
            <td>${transaction.name}</td>
            <td>${transaction.category}</td>
            ${type_avec_color}
            ${amount_avec_color}
            <td>
                <button type="button" class="edit-btn" onclick="editTransaction(${i})">Edit</button>
                <button type="button" class="delete-btn" onclick="deleteTransaction(${i})">Delete</button>
            </td>
        </tr>`;
    });

    transactionsTable.innerHTML = content_tr;
}
showTransactions();


// show last 4 transactions
function showLastFourTransactions() {
    let transactions = JSON.parse(localStorage.getItem("transactions"))|| [];
    let lastFourTransactions = transactions.slice(-4);
    let lastFourTransactionsTable = document.getElementById("last-four-transactions");

    let content_tr = "";
    
    lastFourTransactions.forEach(function(transaction) {
        let amount_avec_color = '';
        if(transaction.type == 'income'){
            amount_avec_color = `<td class="td-Amount amount_income">+ ${currency}${transaction.amount}</td>`;
        }
        else {
            amount_avec_color = `<td class="td-Amount amount_expense">- ${currency}${transaction.amount}</td>`;
        }
        content_tr += `<tr>
                            <td class="td-start"><span class="name">${transaction.name}</span><span class="category">${transaction.category}</span></td>
                            <td class="td-date">${transaction.date}</td>
                            ${amount_avec_color}
                        </tr>`;
    });

    lastFourTransactionsTable.innerHTML = content_tr;
}
showLastFourTransactions();


// delete transaction
function deleteTransaction(index) {
    let transactions = JSON.parse(localStorage.getItem("transactions"));
    transactions.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    showTransactions();
    showLastFourTransactions();
    calculateTotalIncome_Expense_netBalance();
}


// edit transaction
function editTransaction(index) {
    let transactions = JSON.parse(localStorage.getItem("transactions"));
    let transaction = transactions[index];

    showAddTransactionsPage();
    add_transaction_btn.innerText = "Update Transaction";

    transaction_name.value = transaction.name;
    transaction_amount.value = transaction.amount;
    type.value = transaction.type;
    category.value = transaction.category;
    date.value = transaction.date;

    add_transaction_btn.onclick = function() {

        // Check form validation
        if (!transactionForm.reportValidity()) {
            return;
        }

        if (Number(transaction_amount.value) <= 0) {
            alert("Amount must be greater than zero");
            return;
        }
        
        transaction.name = transaction_name.value;
        transaction.amount = transaction_amount.value;
        transaction.type = type.value;
        transaction.category = category.value;
        transaction.date = date.value;

        localStorage.setItem("transactions", JSON.stringify(transactions));
        showTransactions();
        showLastFourTransactions();
        clearTransactionForm();
        add_transaction_btn.innerText = "Add Transaction";
        add_transaction_btn.onclick = handleAddTransaction;
        addTransactionPage.style.display = "none";
        showHomePage();
        calculateTotalIncome_Expense_netBalance();
    }

}


// search transactions
let searchCat = document.getElementById("category");
let searchType = document.getElementById("type");
let searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", function (event) {
    
    let content_tr = "";

    let transactions = JSON.parse(localStorage.getItem("transactions"));
    for (let i = 0; i < transactions.length; i++) {
        let transaction = transactions[i];
        if ((searchCat.value === "" || transaction.category === searchCat.value) && (searchType.value === "" || transaction.type === searchType.value)) {
            // Show the transaction
            let type_avec_color = '';
            let amount_avec_color = '';
            let i = transactions.indexOf(transaction);
            if(transaction.type == 'income'){
                type_avec_color = `<td class="type_income">${transaction.type}</td>`
                amount_avec_color = `<td class="amount_income">+ ${currency}${transaction.amount}</td>`;
            }
            else {
                type_avec_color = `<td class="type_expense">${transaction.type}</td>`;
                amount_avec_color = `<td class="amount_expense">- ${currency}${transaction.amount}</td>`;
            }
            content_tr += `<tr>
                <td>${transaction.date}</td>
                <td>${transaction.name}</td>
                <td>${transaction.category}</td>
                ${type_avec_color}
                ${amount_avec_color}
                <td>
                    <button type="button" class="edit-btn" onclick="editTransaction(${i})">Edit</button>
                    <button type="button" class="delete-btn" onclick="deleteTransaction(${i})">Delete</button>
                </td>
            </tr>`;
        }
        transactionsTable.innerHTML = content_tr;
    }
});


let search_transactions_name = document.getElementById("search_transactions_name");

search_transactions_name.onkeyup = function() {
    showTransactionsPage();
        
    let content_tr = "";

    let transactions = JSON.parse(localStorage.getItem("transactions"));
    for (let i = 0; i < transactions.length; i++) {
        let transaction = transactions[i];
        if (transaction.name.toLowerCase().includes(search_transactions_name.value.toLowerCase())) {
            // Show the transaction
            let type_avec_color = '';
            let amount_avec_color = '';
            let i = transactions.indexOf(transaction);
            if(transaction.type == 'income'){
                type_avec_color = `<td class="type_income">${transaction.type}</td>`
                amount_avec_color = `<td class="amount_income">+ ${currency}${transaction.amount}</td>`;
            }
            else {
                type_avec_color = `<td class="type_expense">${transaction.type}</td>`;
                amount_avec_color = `<td class="amount_expense">- ${currency}${transaction.amount}</td>`;
            }
            content_tr += `<tr>
                <td>${transaction.date}</td>
                <td>${transaction.name}</td>
                <td>${transaction.category}</td>
                ${type_avec_color}
                ${amount_avec_color}
                <td>
                    <button type="button" class="edit-btn" onclick="editTransaction(${i})">Edit</button>
                    <button type="button" class="delete-btn" onclick="deleteTransaction(${i})">Delete</button>
                </td>
            </tr>`;
        }
        transactionsTable.innerHTML = content_tr;
    }
}


// calculate total income and total expense and total net balance
function calculateTotalIncome_Expense_netBalance() {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let totalIncome = 0;
    let totalExpense = 0;

    let totalIncomeElements = document.querySelectorAll(".total-income");
    let totalExpenseElements = document.querySelectorAll(".total-expense");
    let totalNetBalanceElements = document.querySelectorAll(".total-net-balance");
    let savingsRateElement = document.getElementById("percentage-savings-rate");

    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === "income") {
            totalIncome += parseFloat(transactions[i].amount);
        } else {
            totalExpense += parseFloat(transactions[i].amount);
        }
    }

    let totalNetBalance = totalIncome - totalExpense;

    let savingsRate = 0;

    if (totalIncome > 0) {
        savingsRate = ((totalIncome - totalExpense) / totalIncome) * 100;
    }
    

    if(balances == 'show'){
        totalIncomeElements.forEach(element => {
            element.textContent = `${currency}${totalIncome.toFixed(2)}`;
        });

        totalExpenseElements.forEach(element => {
            element.textContent = `${currency}${totalExpense.toFixed(2)}`;
        });

        totalNetBalanceElements.forEach(element => {
            element.textContent = `${currency}${totalNetBalance.toFixed(2)}`;
        });

        savingsRateElement.textContent = `${savingsRate.toFixed(2)} %`
    }
    else if(balances == 'hide'){
        totalIncomeElements.forEach(element => {
            element.textContent = '*****';
        });
    
        totalExpenseElements.forEach(element => {
            element.textContent = '*****';
        });
    
        totalNetBalanceElements.forEach(element => {
            element.textContent = '*****';
        });

        savingsRateElement.textContent = '*****';
    }
    else{
        totalIncomeElements.forEach(element => {
            element.textContent = '*****';
            element.style.cursor = 'pointer';

            element.onclick = function(){
                if (element.textContent == '*****') {
                    element.textContent = `${currency}${totalIncome.toFixed(2)}`;
                } else {
                    element.textContent = '*****';
                }
            }
        });

        totalExpenseElements.forEach(element => {
            element.textContent = '*****';
            element.style.cursor = 'pointer';

            element.onclick = function(){
                if (element.textContent == '*****') {
                    element.textContent = `${currency}${totalExpense.toFixed(2)}`;
                } else {
                    element.textContent = '*****';
                }
            }
        });

        totalNetBalanceElements.forEach(element => {
            element.textContent = '*****';
            element.style.cursor = 'pointer';

            element.onclick = function(){
                if (element.textContent == '*****') {
                    element.textContent = `${currency}${totalNetBalance.toFixed(2)}`;
                } else {
                    element.textContent = '*****';
                }
            }
        });


        savingsRateElement.textContent = '*****';
        savingsRateElement.style.cursor = 'pointer';

        savingsRateElement.onclick = function(){
            if (savingsRateElement.textContent == '*****') {
                savingsRateElement.textContent = `${savingsRate.toFixed(2)} %`
            } else {
                savingsRateElement.textContent = '*****';
            }
        }
        
    }


    let savingMessage = document.getElementById("saving-message");

    if (totalIncome === 0 || savingsRate === 0) {
        savingMessage.innerHTML = `<i class="info-message" data-lucide="piggy-bank"></i>
                                    <span class="info-message">Start saving today!</span>`;
        savingMessage.style.backgroundColor = "var(--info-bg)";
    }
    else if (savingsRate >= 50) {
        savingMessage.innerHTML = `<i class="great-message" data-lucide="trending-up"></i>
                                    <span class="great-message">Great job! Keep saving!</span>`;
        savingMessage.style.backgroundColor = "var(--great-message)";
        
    }
    else {
        savingMessage.innerHTML = `<i class="danger-message" data-lucide="circle-alert"></i>
                                     <span class="danger-message">Try to save more!</span>`;
        savingMessage.style.backgroundColor = "var(--danger-bg)";
    }
}

calculateTotalIncome_Expense_netBalance();


// Dark Mode
const themeBtn = document.getElementById("theme-btn");

let savedTheme = localStorage.getItem("theme") || "light";

document.documentElement.setAttribute("data-theme", savedTheme);

// Update Icon
function updateThemeIcon() {
    const iconName = savedTheme === "dark" ? "sun" : "moon";

    themeBtn.innerHTML = `<i data-lucide="${iconName}"></i>`;

    lucide.createIcons();
}

updateThemeIcon();

// Toggle Theme
themeBtn.addEventListener("click", function () {
    themeBtn.classList.add("rotate");

    savedTheme = savedTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", savedTheme);

    localStorage.setItem("theme", savedTheme);

    updateThemeIcon();
});



// profile bio
let showBio = document.getElementById('show-bio');
let bio =  document.getElementById('bio');

showBio.textContent = `${bio.value}`;



// Reset Data
let reset_data_btn = document.getElementById('reset-data-btn');
reset_data_btn.onclick = function(){
    localStorage.removeItem('transactions');
    // Refresh Page
    location.reload();
}


// loader code
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");

    loader.classList.add("hidden");
});



