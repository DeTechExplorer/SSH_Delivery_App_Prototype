import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo.jpeg';

function MyOrdersPage() {
  const navigate = useNavigate();
  const [completedOrders, setCompletedOrders] = useState([]);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('completedOrders') || '[]');
    setCompletedOrders(savedOrders);
  }, []);

  const handleRefundRequest = () => {
    const updatedOrders = completedOrders.map(order => {
      if (order.id === currentOrder.id) {
        return {
          ...order,
          items: order.items.map(item => ({
            ...item,
            refundRequested: selectedItems.includes(item.id)
          }))
        };
      }
      return order;
    });

    localStorage.setItem('completedOrders', JSON.stringify(updatedOrders));
    setCompletedOrders(updatedOrders);
    setShowRefundModal(false);
    setSelectedItems([]);
    alert('Refund request submitted successfully!');
  };

  // Refund Modal Component
  const RefundModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Request Refund</h2>
          <p>Select items that weren't delivered</p>
        </div>
        <div className="modal-body">
          {currentOrder?.items.map(item => (
            <div key={item.id} className="refund-item">
              <input
                type="checkbox"
                id={item.id}
                checked={selectedItems.includes(item.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedItems([...selectedItems, item.id]);
                  } else {
                    setSelectedItems(selectedItems.filter(id => id !== item.id));
                  }
                }}
                disabled={item.refundRequested}
              />
              <label htmlFor={item.id}>
                {item.name} (£{item.price.toFixed(2)})
                {item.refundRequested && <span className="refund-status"> - Refund Requested</span>}
              </label>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button 
            className="modal-button join-button"
            onClick={handleRefundRequest}
            disabled={selectedItems.length === 0}
          >
            Submit Refund Request
          </button>
          <button 
            className="modal-button cancel-button"
            onClick={() => {
              setShowRefundModal(false);
              setSelectedItems([]);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
          .orders-container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
          }

          .orders-header {
            color: #3498db;
            margin-bottom: 20px;
          }

          .empty-orders {
            text-align: center;
            padding: 40px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .order-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .order-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
          }

          .order-items {
            margin: 15px 0;
          }

          .order-item {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid #f5f5f5;
          }

          .refund-btn {
            background-color: #e74c3c;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .refund-btn:hover {
            background-color: #c0392b;
          }

          .refund-requested {
            color: #e74c3c;
            font-style: italic;
          }

          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .modal-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            width: 90%;
            max-width: 500px;
          }

          .refund-item {
            padding: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .bottom-nav {
            position: fixed;
            bottom: 0;
            width: 100%;
            background: white;
            padding: 10px;
            display: flex;
            justify-content: space-around;
            box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
          }

          .bottom-nav button {
            background: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
          }
        `}
      </style>

      <div className="orders-container">
        <h1 className="orders-header">My Orders</h1>
        
        {completedOrders.length === 0 ? (
          <div className="empty-orders">
            <h2>No orders yet</h2>
            <p>Your completed orders will appear here</p>
            <button onClick={() => navigate('/')} className="refund-btn">
              Start Shopping
            </button>
          </div>
        ) : (
          completedOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p>Date: {order.date}</p>
                </div>
                <div>
                  <p>Total: £{order.total.toFixed(2)}</p>
                  {order.isSharedOrder && <span>Shared Order</span>}
                </div>
              </div>

              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <span>{item.name} x{item.quantity}</span>
                    <span>£{(item.price * item.quantity).toFixed(2)}</span>
                    {item.refundRequested && (
                      <span className="refund-requested">Refund Requested</span>
                    )}
                  </div>
                ))}
              </div>

              <button 
                className="refund-btn"
                onClick={() => {
                  setCurrentOrder(order);
                  setShowRefundModal(true);
                }}
              >
                Request Refund
              </button>
            </div>
          ))
        )}
      </div>

      {showRefundModal && <RefundModal />}

      <div className="bottom-nav">
        <button onClick={() => navigate('/categories')}>Categories</button>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/myorders')}>My Orders</button>
      </div>
    </>
  );
}

export default MyOrdersPage;