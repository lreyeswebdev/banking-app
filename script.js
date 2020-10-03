// For Data Structure
var bankController = (function() {

    var Users = function(id, user, amount) {
        this.id = id;
        this.user = user;
        this.amount = amount;
    };

    var allUsers = [];

    return {
        createUser: function(user) {
            var newUser, ID, amount;
            amount = 0;

            // create new ID
            if (allUsers.length > 0) {
                ID = allUsers[allUsers.length -1].id + 1;
            } else {
                ID = 0;
            }            

            newUser = new Users(ID, user, amount);

            // Push to data structure
            allUsers.push(newUser);

            // returns new user
            return newUser;
        },

        deposit: function(user, amount) {
            var newAmount;                       

            allUsers.map(u => {                
                if (user.username == u.user) {
                    newAmount = parseFloat(u.amount) + parseFloat(amount.depositAmt);
                    u.amount = newAmount;
                    var userCard = document.querySelector(`#user-${u.id}`);
                    var userAmount = userCard.querySelector('.user-amount');
                    userAmount.innerHTML = (u.amount);
                } 
            })
        },

        withdraw: function(user, amount) {
            var newAmount;

            allUsers.map(u => {                
                if (user.username == u.user) {
                    newAmount = parseFloat(u.amount) - parseFloat(amount.withdrawAmt);
                    u.amount = newAmount;
                    var userCard = document.querySelector(`#user-${u.id}`);
                    var userAmount = userCard.querySelector('.user-amount');
                    userAmount.innerHTML = u.amount;
                }
            })
        },

        send: function(from_user, to_user, amount) {
            var newSenderAmt, newReceiverAmt;

            allUsers.map(u => {
                if (from_user.fromUser == u.user) {
                    newSenderAmt = parseFloat(u.amount) - parseFloat(amount.sendAmt);
                    u.amount = newSenderAmt;
                    var userCard = document.querySelector(`#user-${u.id}`);
                    var userAmount = userCard.querySelector('.user-amount');
                    userAmount.innerHTML = u.amount;
                }
                
                if (to_user.toUser == u.user) {
                    newReceiverAmt = parseFloat(u.amount) + parseFloat(amount.sendAmt);
                    u.amount = newReceiverAmt;
                    var userCard = document.querySelector(`#user-${u.id}`);
                    var userAmount = userCard.querySelector('.user-amount');
                    userAmount.innerHTML = u.amount;
                }
            })
        },        

        testing: function() {
            console.log(allUsers);
        }
    };

})();

// For UI
var UIController = (function() {
    // some code
    var HTMLelements = {
        // add here the list of html elements to be used to avoid repetition
        createUserBtn: '#createUserBtn',
        userContainer: '.user-list',
        depositBtn: '#depositBtn',
        withdrawBtn: '#withdrawBtn',
        sendBtn: '#sendBtn',
    }    

    return {
        getUser: function() {
            return {
                username: prompt('Provide a Username:')
            };            
        },

        getDeposit: function() {
            return {
                depositAmt: prompt('How much will you deposit?')
            };
        },

        getWithdrawal: function() {
            return {
                withdrawAmt: prompt('How much will you withdraw?')
            };
        },

        getSender: function() {
            return {
                fromUser: prompt('Who will send the amount?')
            }
        },

        getReceiver: function() {
            return {
                toUser: prompt('To whom will you send the amount to?')
            };
        },

        getSendAmount: function() {
            return {
                sendAmt: prompt('How much will you send?')
            };
        },

        addUserItem: function(obj) {
            var html, newHtml;

            // create html string with placeholder text
            html = '<div class="user-card" id="user-%id%"><h3>%username%</h3><img src="head.jpg" alt="User image" class="image"><div class="amount-title">Account Balance:</div><div class="user-amount">%amount%</div></div>';

            // replace placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%username%', obj.user);
            newHtml = newHtml.replace('%amount%', (obj.amount));

            // insert html into the DOM
            document.querySelector(HTMLelements.userContainer).insertAdjacentHTML('beforeend', newHtml);
        },

        getHTMLelements: function() {
            return HTMLelements;
        }
    };
})();

// Global App Controller
var controller = (function(bankCtrl, UICtrl){

    var setupEventListeners = function() {
        var html = UICtrl.getHTMLelements();

        // Create user
        document.querySelector(html.createUserBtn).addEventListener('click', ctrlAddUser);

        // Deposit to user
        document.querySelector(html.depositBtn).addEventListener('click', ctrlDeposit);

        // Withdraw from user
        document.querySelector(html.withdrawBtn).addEventListener('click', ctrlWithdraw);

        // Send to another user
        document.querySelector(html.sendBtn).addEventListener('click', ctrlSend);
        
    };
    
    var ctrlAddUser = function() {
        var user, newUser;

        // 1. Get user input data
        user = UICtrl.getUser();
        // console.log(user);

        if (user.username !== "" && isNaN(user.username)) {
            // 2. Add item to bank controller
            newUser = bankCtrl.createUser(user.username);

            // 3. Add item to UI
            UICtrl.addUserItem(newUser);
        } else {
            alert('Please provide a valid username that uses letters and please do not leave the field blank.');
        }
    };

    var ctrlDeposit = function() {
        var user, amount;
        // 1. get depositor input data
        user = UICtrl.getUser();

        // 2. get amount to deposit
        amount = UICtrl.getDeposit();

        // 3. update user account balance
        bankCtrl.deposit(user, amount);
    };

    var ctrlWithdraw = function() {
        var user, amount;
        // 1. get user to withdraw
        user = UICtrl.getUser();

        // 2. get amount to withdraw
        amount = UICtrl.getWithdrawal();

        // 3. update user account balance
        bankCtrl.withdraw(user, amount);
    };
    
    var ctrlSend = function() {
        var from_user, to_user, amount;
        // 1. get sender name
        from_user = UICtrl.getSender();

        // 2. get receiver name
        to_user = UICtrl.getReceiver();

        // 3. get amount to send
        amount = UICtrl.getSendAmount();

        // 4. update user account balances
        bankCtrl.send(from_user, to_user, amount);
    };
    
    return {
        init: function() {
            console.log('App started!');
            setupEventListeners();
        }
    }

})(bankController, UIController);

controller.init();

