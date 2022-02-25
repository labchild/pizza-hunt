const $addToppingBtn = document.querySelector('#add-topping');
const $pizzaForm = document.querySelector('#pizza-form');
const $customToppingsList = document.querySelector('#custom-toppings-list');

// when  user clicks the add topping btn
const handleAddTopping = event => {
  event.preventDefault();

  const toppingValue = document.querySelector('#new-topping').value;

  // if the input was empty, return false and exit fn
  if (!toppingValue) {
    return false;
  }

  // create a checkbox for the new topping
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'topping';
  checkbox.value = toppingValue;
  checkbox.id = toppingValue
    .toLowerCase()
    .split(' ')
    .join('-');

  // create a label for the new topping checkbox
  const label = document.createElement('label');
  label.textContent = toppingValue;
  // this indicates which el the label is for (for="")
  label.htmlFor = toppingValue
    .toLowerCase()
    .split(' ')
    .join('-');

  // create spacing for new checkbox el
  const divWrapper = document.createElement('div');

  // add check box and label to new div
  divWrapper.appendChild(checkbox);
  divWrapper.appendChild(label);
  // append div (and children) to page
  $customToppingsList.appendChild(divWrapper);

  // reset input
  toppingValue.value = '';
};

const handlePizzaSubmit = event => {
  event.preventDefault();

  const pizzaName = $pizzaForm.querySelector('#pizza-name').value;
  const createdBy = $pizzaForm.querySelector('#created-by').value;
  const size = $pizzaForm.querySelector('#pizza-size').value;
  const toppings = [...$pizzaForm.querySelectorAll('[name=topping]:checked')].map(topping => {
    return topping.value;
  });

  if (!pizzaName || !createdBy || !toppings.length) {
    return;
  }

  const formData = { pizzaName, createdBy, size, toppings };

  fetch('/api/pizzas', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(postResponse => {
      alert('Pizza created successfully!');
      console.log(postResponse);
    })
    .then(() => {
      document.location.reload();
    })
    .catch(err => console.log(err));
};

$pizzaForm.addEventListener('submit', handlePizzaSubmit);
$addToppingBtn.addEventListener('click', handleAddTopping);
