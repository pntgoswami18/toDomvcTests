let EC = protractor.ExpectedConditions;

describe('Sanity testing for todos list', () => {

  it('Should open up todomvc page', () => {
    var todosHead = element(by.xpath('//h1[@data-reactid=".0.0.0"]'));

    // browser.waitForAngular(false);
    browser.wait(EC.presenceOf(todosHead), 6000);
    browser.get("http://todomvc.com/examples/typescript-react/#/");
    expect(todosHead.getText()).toEqual('todos');

  });

  it('Should add todo', () => {
    var todoInputBox = element(by.className("new-todo"));
    expect(todoInputBox.isDisplayed()).toBe(true);

    todoInputBox.sendKeys('Get groceries');
    todoInputBox.sendKeys(protractor.Key.ENTER);


  });

  it("Should check to-do list", () => {
    var todoList = element(by.className("todo-list"));
    expect(todoList.isDisplayed()).toBe(true);
  });


});