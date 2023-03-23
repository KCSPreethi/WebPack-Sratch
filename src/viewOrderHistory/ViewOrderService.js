class ViewOrderService {
  async viewOrderServiceFetch() {
    var userName = window.localStorage.getItem('userId');
    const response = await fetch(
      `http://localhost:8080/user/${userName}/order`
    );
    return await response.json();
  }

  async orderProduct(quantity) {
    try {
      if (quantity < 1) {
        throw new Error('Invalid quantity');
      }
      var userName = window.localStorage.getItem('userId');
      const response = await fetch(`http://localhost:8080/user/atul_9/order`);
      const data = await response.json();

      return {
        success: true,
        orderId: data.orderId,
        totalCost: data.totalCost,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = ViewOrderService;
