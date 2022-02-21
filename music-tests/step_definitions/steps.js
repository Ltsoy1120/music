const { I } = inject();
// Add in your custom step files

Given('я нахожусь на странице {string}', (page) => {
  //I.waitForElement('form',10)
  I.amOnPage(page);
});

When('я ввожу {string}  в поле {string}', (value, fieldName) => {
  I.fillField({id: fieldName}, value);
});

When('я нажимаю на кнопку {string}', (button) => {
  I.click({id: button});
});

Then('я вижу текст {string}', () => {
  I.see("Artists")
});
