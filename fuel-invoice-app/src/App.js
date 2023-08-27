import React, { useState } from 'react';
import './App.css';

function App() {
  const [gallonCapacity, setGallonCapacity] = useState('');
  const [noOfGallonsInVehicle, setNoOfGallonsInVehicle] = useState('');
  const [invoices, setInvoices] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8089/invoice/receiptResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gallonCapacity: parseFloat(gallonCapacity),
        noOfGallonsInVehicle: parseFloat(noOfGallonsInVehicle),
      }),
    });
    const data = await response.json();
    setInvoices([data]);
  };

  return (
    <div className="App">
      <h1>Fuel Invoice App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Gallon Capacity:
          <input
            type="number"
            value={gallonCapacity}
            onChange={(e) => setGallonCapacity(e.target.value)}
          />
        </label>
        <br />
        <label>
          Gallons in Vehicle:
          <input
            type="number"
            value={noOfGallonsInVehicle}
            onChange={(e) => setNoOfGallonsInVehicle(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Calculate Invoice</button>
      </form>
      <div className="invoices">
        {invoices.map((invoice, index) => (
          <div key={index} className="invoice">
            <h2>Invoice {index + 1}</h2>
            <p>Date: {invoice.date}</p>
            <p>Price Per Gallon: {invoice.pricePerGallon}</p>
            <p>No. of Gallons To Be Filled: {invoice.noOfGallonsToBeFilled}</p>
            <p>Total Price: {invoice.totalPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
