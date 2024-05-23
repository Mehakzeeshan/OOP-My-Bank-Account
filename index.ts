#! /usr/bin/env node

import inquirer from "inquirer"

// Bank Account
interface BankAccount {
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void 
    deposit(amount: number): void
    checkBalance(): void
}

// Bank Account Class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber
        this.balance = balance
    }

// Debit money
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
        console.log(`Withdrawal of $${amount} successful and your ramaining balnace is $${this.balance}.`);
        } else {
            console.log("You have insufficient balance.");
            }
        }

// Credit Money 
deposit(amount: number): void {
    if(amount > 100) {
        amount -= 1          // $1 fee charged if more than $100 is deposited
    } this.balance += amount;
    console.log(`Deposit of $${amount} successful. Remaining balance is ${this.balance}`);
    }


// Check Balance
checkBalance(): void {
    console.log(`Current balance: $${this.balance}`);
    }
}


// Customer Class

class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number,  mobileNumber: number,  account: BankAccount) {
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.age = age
        this.mobileNumber = mobileNumber
        this.account = account
    }

}; 


// Create Bank Accounts

const accounts: BankAccount[] = [
    new BankAccount (2002, 700),
    new BankAccount (2005, 2000),
    new BankAccount (2008, 5000)
]

// Create customers

const customers: Customer[] = [
    new Customer ("Zainab", "Saleem", "Female", 28, 3164528732, accounts[0]),
    new Customer ("Syed", "Rohan", "Male", 36, 3224528732, accounts[1]),
    new Customer ("Inayatullah", "Khan", "Male", 51, 33264528732, accounts[2]),
]

// Functions to interact with bank account
async function services() {
do{
    const accountNumberInput = await inquirer.prompt({
        name: "accountNumber",
        type: "number",
        message: "Enter your acount number"
    })
    const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
   
     if(customer) {
        console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
        const ans = await inquirer.prompt([{
            name: "select",
            type: "list",
            message: "Select an operation you want to perform",
            choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
    }]);
    switch (ans.select) {
        case "Deposit":
            const depositAmount = await inquirer.prompt({
                name: "amount",
                type: "number",
                message: "Enter the amount you want to deposit"
            })
            customer.account.deposit(depositAmount.amount);
            break;

            case "Withdraw":
                const withdrawAmount = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Enter the amount you want to withdraw"
                })
                customer.account.withdraw(withdrawAmount.amount);
                break; 
                
                case "Check Balance":
                    customer.account.checkBalance();
                    break;    

                case "Exit":
                    console.log("Exiting bank program............");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;    // ye return exit wale case ko function se bahir lejayega 
                     
            }

        } else {
            
            console.log("Invalid account number. Please try again.");
            
        }

    } while (true)

}

services();