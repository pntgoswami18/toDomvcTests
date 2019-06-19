let EC = protractor.ExpectedConditions;
var TodosList = require('./pageFactory');


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


});