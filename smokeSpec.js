let EC = protractor.ExpectedConditions;
var TodosList = require('./pageFactory');
let hasClass = require('./utilities').hasClass;


describe('Sanity testing for todos list', () => {

  var todosList;

  beforeEach(() => {
    todosList = new TodosList();
  });

  it('Should open up todomvc page', () => {

    browser.ignoreSynchronization = true // since todos MVC page is not an angular page 
    browser.get("http://todomvc.com/examples/typescript-react/#/");
    browser.wait(EC.presenceOf(todosList.todosHead), 6000);
    expect(todosList.todosHead.getText()).toEqual('todos');

  });

  it('Should add todo', () => {
    expect(todosList.todoInputBox.isDisplayed()).toBe(true);

    todosList.todoInputBox.sendKeys('Get groceries');
    todosList.todoInputBox.sendKeys(protractor.Key.ENTER);


  });

  it("Should check to-do list", () => {

    expect(todosList.todoList.isDisplayed()).toBe(true);
  });

  it("Should check todo in to-do list", () => {
    expect((todosList.todoListItems.get(0)).isDisplayed()).toBe(true, 'no item in todo list');

    expect((todosList.todoListItems.get(0)).getText()).toEqual('Get groceries');

  });

  it("Should mark a todo as done", () => {

    todosList.radioBtns.click();

    expect((todosList.completedItems.get(0)).isDisplayed()).toBe(true, 'completed items were not found');
  });

  it("Should update the description of a to-do item", () => {
    browser.actions().doubleClick(todosList.todoListItems.get(0)).perform();

    todosList.editItem.sendKeys(" and milk");
    todosList.editItem.sendKeys(protractor.Key.ENTER);

    expect((todosList.todoListItems.get(0)).getText()).toEqual('Get groceries and milk');

  });

  // remove an item from to-do list
  it("Should remove an item from to-do list", () => {
    // first add an item
    todosList.todoInputBox.sendKeys('Pay bills');
    todosList.todoInputBox.sendKeys(protractor.Key.ENTER);

    // get count of items in to-do list
    var todoItemsCount = todosList.todoListItems.count();

    expect((todosList.removeTodoBtns.get(0)).isDisplayed()).
      toBe(true, "remove button was not displayed");
    todosList.removeTodoBtns.get(0).click();

    // check count of items in to-do list after removal
    expect(todosList.todoListItems.count()).
      not.toEqual(todoItemsCount, "Item not removed. Item count is still the same");

  });

  // switch views between ALL, ACTIVE and COMPLETED
  it("Should switch view to Active to-dos", () => {
    // click on active tab
    todosList.activeTab.click();
    expect(hasClass(todosList.activeTab, 'selected')).toBe(true, "Active tab is not selected");

    // check for count of active items 
    var activeItemsCount = todosList.todoListItems.count();

    // mark the item as done
    todosList.radioBtns.get(0).click();

    // check the count of active items again
    expect(todosList.todoListItems.count()).
      not.toEqual(activeItemsCount, "Active items count is still the same");
  });

  it("Should switch view to Completed to-dos", () => {
    //switch view to completed tab
    todosList.completedTab.click();
    expect(hasClass(todosList.completedTab, 'selected')).toBe(true, "Completed tab is not selected");

    // check for one completed task
    var completedItemsCount = todosList.todoListItems.count();
    expect(completedItemsCount).toEqual(1, "Number of completed items is not 1");

    // mark the item as undone
    todosList.radioBtns.get(0).click();

    // check the count of completed items
    expect(todosList.todoListItems.count()).not.toEqual(completedItemsCount, "Completed items list still has items");
  });

  it("Should switch to All to-dos", () => {
    // click on All tab
    todosList.allTab.click();
    expect(hasClass(todosList.allTab, 'selected')).toBe(true, "All tab is not selected");


    // check the number of items in list
    expect(todosList.todoListItems.count()).toEqual(1, "Number of items in All to-dos is not 1");
  });


  // check for pending items count in the item counter
  it("Should check pending items counter in footer", () => {
    var itemsCount = todosList.todoListItems.count();
    var footerCounter = todosList.pendingItemsCount.getText();
    expect(itemsCount == footerCounter);
  });


  // test bulk operations
  it("Should bulk mark items as done", () => {

    // mark all as done
    todosList.toggleAll.click();
    expect(todosList.pendingItemsCount.getText()).toEqual('0', "Pending items were remaining in the list");

    // toggle all as undone
    todosList.toggleAll.click();
    expect(todosList.pendingItemsCount.getText()).toEqual('1', "Completed items were remaining in the list");

  });


  // clear completed
  it("Should clear completed tasks from the list", () => {
    // mark all items as completed
    todosList.toggleAll.click();

    // click clear completed button
    todosList.clearCompletedBtn.click();
    expect(todosList.pendingItemsCount.isPresent()).toBeFalsy(); // item count should not be in the DOM

  })

});