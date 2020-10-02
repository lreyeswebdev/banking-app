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

        deposit: function(user) {
            // add deposit amount to amount
            // update data structure
            // return new balance amount
        },

        getBalance: function(id) {
            var balance = allUsers[id].amount;
            return balance;
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
        getBalance: '.balBtn'
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

        getReceive: function() {
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
            html = '<div class="user-card" id="user-%id%"><h3>%username%</h3><img src="head.jpg" alt="User image" class="image"><div class="card-buttons"><button class="depositBtn">Deposit</button><button class="withdrawBtn">Withdraw</button><button class="sendBtn">Send</button><button class="balBtn">Get Balance</button></div></div>';

            // replace placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%username%', obj.user);

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
        

        // Withdraw from user

        // Send to another user

        // Display balance
        // document.querySelector(html.getBalance).addEventListener('click', ctrlGetBalance);

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

    var ctrlDepost = function() {

    };
    
    var ctrlGetBalance = function() {
        // var itemID, splitID, ID;

        // itemID = event.target.parentNode.parentNode.id;

        // if (itemID) {
        //     splitID = itemID.split('-');
        //     ID = parseInt(splitID[1]);

        //     alert('The balance is Php ' + bankCtrl.getBalance(ID));
        // }
        
        
    };
    
    return {
        init: function() {
            console.log('App started!');
            setupEventListeners();
        }
    }

})(bankController, UIController);

controller.init();

