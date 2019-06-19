var todosList = function () { };

todosList.prototype = Object.create({}, {
    todosHead: {
        get: () => {
            return element(by.xpath('//h1[@data-reactid=".0.0.0"]'));
        }
    },

    todoInputBox: {
        get: () => {
            return element(by.className("new-todo"));
        }
    },

    todoList: {
        get: () => {
            return element(by.className("todo-list"));
        }
    },

    todoListItems: {
        get: () => {
            return element.all(by.className("view"));
        }
    },

    radioBtns: {
        get: () => {

            return element.all(by.xpath("//input[@class='toggle']"));
        }
    },

    completedItems: {
        get: () => {
            return element.all(by.className("completed"));
        }
    },

    editableListItems: {
        get: () => {
            return element.all(by.className("editing"));
        }
    },
    editItem: {
        get: () => {
            return element(by.className("edit"));
        }
    },

    removeTodoBtns: {
        get: () => {
            return element.all(by.className("destroy"));
        }
    },

    activeTab: {
        get: () => {
            return element(by.xpath("//a[@href='#/active']"));
        }
    },

    allTab: {
        get: () => {
            return element(by.xpath("//a[@href='#/']"));
        }
    },

    completedTab: {
        get: () => {
            return element(by.xpath("//a[@href='#/completed']"));
        }
    },

    toggleAll: {
        get: () => {
            // return element(by.id("toggle-all"));
            return element(by.xpath("//label[@for='toggle-all']"));
        }
    },

    clearCompletedBtn: {
        get: () => {
            return element(by.className("clear-completed"));
        }
    },

    pendingItemsCount: {
        get: () => {
            return element(by.xpath("//*[@class='todo-count']/strong"));
        }
    }
});

module.exports = todosList;