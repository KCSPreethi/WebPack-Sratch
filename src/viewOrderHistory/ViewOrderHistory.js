

window.onload=function(){

const viewHistoryButton = document.getElementById('viewHistory');
viewHistoryButton.onclick = function () {
  let orderHistory = new OrderHistory();
  orderHistory.getOrderHistory();
};
  
}

export default class OrderHistory {
  getOrderHistory() {
    var userName = window.localStorage.getItem('userId');
    fetch(`http://localhost:8080/user/${userName}/order`)
      .then(function (response) {
        return response.json();
      })
      .then(function (apiJsonData) {
        console.log(apiJsonData);
        let table = new HistoryTable();
        table.renderDataInTheTable(apiJsonData);
      });
  }
}

class HistoryTable {
  renderDataInTheTable(orders) {
    const mytable = document.getElementById('html-data-table');

    mytable.innerHTML = '';

    let newRow = this.createTableHeading();

    mytable.appendChild(newRow);

    orders.forEach((order) => {
      let newRow = document.createElement('tr');

      let cell = document.createElement('td');
      cell.innerText = order['id'].first;
      newRow.appendChild(cell);

      cell = document.createElement('td');
      cell.innerText = order['type'];
      newRow.appendChild(cell);

      cell = document.createElement('td');
      cell.innerText = 'NON-PERFORMANCE';
      if (order['esopType'] == 1) cell.innerText = 'PERFORMANCE';
      newRow.appendChild(cell);

      cell = document.createElement('td');
      cell.innerText = order['qty'];
      newRow.appendChild(cell);

      cell = document.createElement('td');
      cell.innerText = order['price'];
      newRow.appendChild(cell);

      cell = document.createElement('td');
      cell.innerText = order['status'];
      newRow.appendChild(cell);

      cell = document.createElement('td');
      cell.innerText = order['filledQty'];
      newRow.appendChild(cell);

      cell = document.createElement('td');
      cell.innerText = 'unfilledOrder';
      if (order['filled']) {
        let x = new FilledTable();
        cell = x.createTableForTransaction(order['filled']);
        console.log(typeof order['filled'][0].price);
        //cell.innerText = createTableForTransaction()
      }
      newRow.appendChild(cell);

      mytable.appendChild(newRow);
    });
  }

  createTableHeading() {
    let newRow = document.createElement('tr');

    let cell = document.createElement('th');
    cell.innerText = 'OrderId';
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.innerText = 'Type';
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.innerText = 'EsopType';
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.innerText = 'Quantity';
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.innerText = 'Price';
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.innerText = 'Status';
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.innerText = 'FilledQty';
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.innerText = 'Filled';
    newRow.appendChild(cell);

    return newRow;
  }
}

class FilledTable {
  createTableForTransaction(filledOrder) {
    const table = document.createElement('table');
    table.id = 'transTable';
    table.class = 'tableFixHead';
    const tableBody = document.createElement('tbody');

    const newRow = document.createElement('tr');
    let cell = document.createElement('td');
    cell.innerText = 'Quantity';
    newRow.appendChild(cell);

    cell = document.createElement('td');
    cell.innerText = 'Price';
    newRow.appendChild(cell);

    tableBody.appendChild(newRow);

    for (let orderNo = 0; orderNo < filledOrder.length; orderNo++) {
      const newRow = document.createElement('tr');

      let cell = document.createElement('td');
      cell.innerText = filledOrder[orderNo].quantity;
      newRow.appendChild(cell);

      cell = document.createElement('td');
      cell.innerText = filledOrder[orderNo].price;
      newRow.appendChild(cell);

      tableBody.appendChild(newRow);
    }

    table.appendChild(tableBody);

    table.setAttribute('border', '2');

    return table;
  }
}
