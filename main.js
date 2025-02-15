class BankAccount {
    constructor(name, age, balance) {
        this.name = name;
        this.age = age;
        this.balance = balance;
    }

    async BalanceCompare(amount) {
        return new Promise((resolve, reject) => {
            if (amount < 0) {
                reject(new Error("Amount cannot be negative"));
            }
            setTimeout(() => {
                resolve(this.balance >= amount);
            }, 1000);
        });
    }
    async withdraw(amount) {
        try {
            if (amount <= 0) {
                throw new Error("Amount must be greater than zero");
            }

            const isEnough = await this.BalanceCompare(amount);

            if (isEnough) {
                this.balance -= amount;
                return `Withdrawn ${amount}. New balance: ${this.balance}`;
            } else {
                throw new Error("Insufficient balance.");
            }
        } catch (error) {
            return `Error: ${error.message}`;
        }
    }

    accountinfo() {
        console.log(`Name: ${this.name}, Balance: ${this.balance}`);
    }
}

let account = new BankAccount("Ahmed", 30, 0);

function showPopup(message) {
    const popup = document.getElementById("popupNotification");
    popup.textContent = message;
    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 3000);
}

async function setInitialAmount() {
    const initialAmount = parseFloat(document.getElementById('initialAmount').value);
    if (isNaN(initialAmount) || initialAmount <= 0) {
        showPopup("Please enter a valid initial amount.");
        return;
    }
    account.balance = initialAmount;
    showPopup(`Initial balance set to ${account.balance}`);
}

async function addMoneyToBalance() {
    const addAmount = parseFloat(document.getElementById('addAmount').value);
    if (isNaN(addAmount) || addAmount <= 0) {
        showPopup("Please enter a valid amount to add.");
        return;
    }
    account.balance += addAmount;
    showPopup(`New balance after adding: ${account.balance}`);
}

async function processWithdrawal() {
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const resultElement = document.getElementById('result');

    if (isNaN(amount) || amount <= 0) {
        resultElement.textContent = 'Please enter a valid amount.';
        resultElement.classList.add('error');
        resultElement.classList.remove('success');
        return;
    }

    try {
        const message = await account.withdraw(amount);
        resultElement.textContent = message;
        if (message.includes('Withdrawn')) {
            resultElement.classList.add('success');
            resultElement.classList.remove('error');
        } else {
            resultElement.classList.add('error');
            resultElement.classList.remove('success');
        }
    } catch (error) {
        resultElement.textContent = error.message;
        resultElement.classList.add('error');
        resultElement.classList.remove('success');
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function togglePurpleMode() {
    document.body.classList.toggle('purple-mode');
}