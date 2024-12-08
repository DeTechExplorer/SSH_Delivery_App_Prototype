// MyOrdersPage.js
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
    if (!currentOrder || selectedItems.length === 0) return;

    const updatedOrders = completedOrders.map(order => {
      if (order.id === currentOrder.id) {
        return {
          ...order,
          items: order.items.map(item => ({
            ...item,
            refundRequested: selectedItems.includes(item.id) ? true : item.refundRequested
          }))
        };
      }
      return order;
    });

    // Update localStorage and state
    localStorage.setItem('completedOrders', JSON.stringify(updatedOrders));
    setCompletedOrders(updatedOrders);
    
    // Reset modal state
    setShowRefundModal(false);
    setSelectedItems([]);
    setCurrentOrder(null);
    
    // Show confirmation
    alert('Refund request submitted successfully!');
  };

  const handleOpenRefundModal = (order) => {
    setCurrentOrder(order);
    setSelectedItems([]);
    setShowRefundModal(true);
  };

  const RefundModal = () => {
    if (!currentOrder) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content refund-modal">
          <div className="modal-header">
            <h2>Request Refund</h2>
            <p>Select items that weren't delivered</p>
          </div>
          <div className="modal-body">
            {currentOrder.items.filter(item => !item.refundRequested).map(item => (
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
                />
                <label htmlFor={item.id}>
                  <span className="refund-item-name">{item.name}</span>
                  <span className="refund-item-details">
                    x{item.quantity} - £{(item.price * item.quantity).toFixed(2)}
                  </span>
                </label>
              </div>
            ))}
            {currentOrder.items.filter(item => item.refundRequested).map(item => (
              <div key={item.id} className="refund-item refund-item-disabled">
                <label>
                  <span className="refund-item-name">{item.name}</span>
                  <span className="refund-item-details">
                    x{item.quantity} - £{(item.price * item.quantity).toFixed(2)}
                  </span>
                  <span className="refund-status">Refund Already Requested</span>
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
                setCurrentOrder(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>
        {`
          /* Base styles */
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f4f8;
            color: #2c3e50;
          }

          .location-bar {
            background-color: #3498db;
            color: white;
            padding: 10px;
            text-align: center;
            position: sticky;
            top: 0;
            z-index: 100;
          }

          .top-bar {
            background-color: white;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 40px;
            z-index: 100;
          }

          .logo-search-location {
            display: flex;
            align-items: center;
            gap: 20px;
            flex-grow: 1;
            justify-content: center;
          }

          #logo-img {
            max-height: 130px;
          }

          /* Orders Container */
          .orders-container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            margin-bottom: 100px;
          }

          .orders-header {
            color: #3498db;
            font-size: 28px;
            margin-bottom: 30px;
            text-align: center;
          }

          /* Empty State */
          .empty-orders {
            text-align: center;
            padding: 40px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .empty-orders h2 {
            color: #3498db;
            margin-bottom: 15px;
          }

          .empty-orders p {
            color: #7f8c8d;
            margin-bottom: 25px;
          }

          /* Order Card */
          .order-card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
          }

          .order-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          }

          .order-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #eee;
          }

          .order-header h3 {
            color: #3498db;
            margin: 0;
            font-size: 20px;
          }

          .order-info {
            text-align: right;
            color: #2c3e50;
          }

          .order-date {
            color: #7f8c8d;
            font-size: 14px;
            margin-top: 5px;
          }

          .order-total {
            font-weight: bold;
            color: #2ecc71;
            font-size: 18px;
            margin-top: 5px;
          }

          .shared-badge {
            background-color: #3498db;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            margin-top: 5px;
            display: inline-block;
          }

          /* Order Items */
          .order-items {
            margin: 20px 0;
          }

          .order-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            border-bottom: 1px solid #f5f5f5;
          }

          .item-details {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .item-name {
            font-weight: 500;
          }

          .item-quantity {
            color: #7f8c8d;
          }

          .item-price {
            font-weight: bold;
            color: #2c3e50;
          }

          /* Refund Modal */
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
            z-index: 1000;
          }

          .modal-content {
            background: white;
            padding: 25px;
            border-radius: 15px;
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
          }

          .refund-modal {
            max-width: 600px !important;
          }

          .modal-header {
            margin-bottom: 20px;
          }

          .modal-header h2 {
            color: #3498db;
            margin: 0 0 8px 0;
          }

          .modal-header p {
            color: #666;
            margin: 0;
          }

          .refund-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px;
            border-bottom: 1px solid #eee;
          }

          .refund-item input[type="checkbox"] {
            width: 20px;
            height: 20px;
            cursor: pointer;
          }

          .refund-item label {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
          }

          .refund-item-name {
            font-weight: 500;
            color: #2c3e50;
          }

          .refund-item-details {
            color: #7f8c8d;
          }

          .refund-item-disabled {
            background-color: #f8f9fa;
            opacity: 0.7;
          }

          .refund-status {
            color: #e74c3c;
            font-style: italic;
            margin-left: 10px;
            font-size: 14px;
          }

          .modal-footer {
            margin-top: 20px;
            display: flex;
            gap: 10px;
            justify-content: flex-end;
          }

          .modal-button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
          }

          .join-button {
            background-color: #2ecc71;
            color: white;
          }

          .join-button:disabled {
            background-color: #95a5a6;
            cursor: not-allowed;
          }

          .cancel-button {
            background-color: #e74c3c;
            color: white;
          }

          /* Bottom Navigation */
          .bottom-nav {
            position: fixed;
            bottom: 0;
            width: 100%;
            background: white;
            padding: 15px;
            display: flex;
            justify-content: space-around;
            box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
            z-index: 100;
          }

          .bottom-nav button {
            background: #3498db;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            font-weight: 500;
          }

          .bottom-nav button:hover {
            background-color: #2980b9;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .orders-container {
              padding: 15px;
            }

            .order-header {
              flex-direction: column;
              align-items: flex-start;
            }

            .order-info {
              text-align: left;
              margin-top: 10px;
            }
          }
        `}
      </style>

      <div className="location-bar">
        SSH Home Delivers
      </div>

      <header className="top-bar">
        <div className="logo-search-location">
          <div id="logo">
            <img src={Logo} alt="Logo" id="logo-img" />
          </div>
        </div>
      </header>

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
                  <div className="order-date">{order.date}</div>
                </div>
                <div className="order-info">
                  <div className="order-total">Total: £{order.total.toFixed(2)}</div>
                  {order.isSharedOrder && (
                    <div className="shared-badge">Shared Order</div>
                  )}
                </div>
              </div>

              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                    </div>
                    <div className="item-info">
                      <span className="item-price">£{(item.price * item.quantity).toFixed(2)}</span>
                      {item.refundRequested && (
                        <span className="refund-status">Refund Requested</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button 
                className="refund-btn"
                onClick={() => handleOpenRefundModal(order)}
                disabled={order.items.every(item => item.refundRequested)}
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