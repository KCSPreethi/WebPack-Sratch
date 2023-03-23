/**
 * @jest-environment jsdom
 */

import  ViewOrderService  from '../src/viewOrderHistory/ViewOrderService.js';

describe('ViewOrderService', () => {
  beforeEach(() => {
    window.localStorage.setItem('userId', 'atul_1');
  });
  afterEach(() => {
    window.localStorage.clear();
  });
  it('fetch user order history', async () => {
    const mockResponse = [
      { id: 1, name: 'Order 1' },
      { id: 2, name: 'Order 2' },
      { id: 3, name: 'Order 2' },
    ];
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    const mockFetch = jest.fn().mockImplementation(() => mockFetchPromise);
    fetch = mockFetch;
    const viewOrderService = new ViewOrderService();
    let response = await viewOrderService.viewOrderServiceFetch();
    expect(response).toBe(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8080/user/atul_1/order'
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('Order passed when quantity is valid', async () => {
    const mockQuantity = 1; // set an invalid quantity for testing purposes
    const mockResponse = {
      errors: ['Invalid quantity'],
    };
    const mockFetchPromise = Promise.resolve({
      ok: false,
      json: () => Promise.resolve(mockResponse),
    });
    const mockFetch = jest.fn().mockImplementation(() => mockFetchPromise);
    fetch = mockFetch;
    const orderService = new ViewOrderService();

    let orderResult = await orderService.orderProduct(mockQuantity);

    expect(orderResult.success).toBe(true);
    // expect(orderResult.error).toBe(mockResponse.errors[0]);

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8080/user/atul_9/order'
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('Order failed when quantity is invalid', async () => {
    const mockQuantity = 0; // set an invalid quantity for testing purposes
    const mockResponse = {
      errors: ['Invalid quantity'],
    };
    const mockFetchPromise = Promise.resolve({
      ok: false,
      json: () => Promise.resolve(mockResponse),
    });
    const mockFetch = jest.fn().mockImplementation(() => mockFetchPromise);
    fetch = mockFetch;
    const orderService = new ViewOrderService();

    let orderResult = await orderService.orderProduct(mockQuantity);

    expect(orderResult.success).toBe(false);
    expect(orderResult.error).toBe(mockResponse.errors[0]);
    expect(global.fetch).toHaveBeenCalledTimes(0);
  });
});
