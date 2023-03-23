const form = document.getElementById('form1');
const qty = document.getElementById('quantity');
var type;
const price = document.getElementById('price');
var esopType = document.getElementById('esopType');



export class PlaceOrder {
  placeOrder() {
    var content = this.getJson();

    var userName = window.localStorage.getItem('userId');
    console.log(userName);
    fetch(`http://localhost:8080/user/${userName}/order`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: content,
    })
      .then((response) => response.json())
      .then((json) => this.getOutputOfRequest(json));
  }
  getOutputOfRequest(json) {
    console.log(json);
    if (json.error) {
      document.getElementById('message').innerHTML = json.error;
      document.getElementById('message').style.color = 'red';
      return Promise.reject(json);
    } else {
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = 'Order Placed';
      document.getElementById('esopType').disabled = false;
      return Promise.resolve(json);
    }
  }

  getJson() {
    var content;
    if (type == 'SELL') {
      console.log('IN sell');
      content = JSON.stringify({
        quantity: parseInt(qty.value),
        type: type,
        price: parseInt(price.value),
        esopType: esopType.value,
      });
    } else {
      content = JSON.stringify({
        quantity: parseInt(qty.value),
        type: type,
        price: parseInt(price.value),
      });
    }
    return content;
  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  let order = new PlaceOrder();
  order.placeOrder();
});

window.buySellCheck=function buySellCheck() {
  if (document.getElementById('buy').checked) {
    type = 'BUY';
    document.getElementById('esopType').disabled = true;
  } else {
    type = 'SELL';
    document.getElementById('esopType').disabled = false;
    document.getElementById('esopType').checked = 'NORMAL';
  }
}

