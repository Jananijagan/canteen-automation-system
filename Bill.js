document.addEventListener("DOMContentLoaded", () => {
    const billDetails = JSON.parse(localStorage.getItem("billDetails"));
    
    if (!billDetails) {
        // Redirect to cart if no bill data is present
        window.location.href = "Cart.html";
        return;
    }

    const billContent = document.getElementById("billContent");
    billContent.innerHTML = `
        <p>Date: ${new Date(billDetails.date)}</p>
        <p>Canteen: ${billDetails.canteenName}</p>
        <p>Payment Method: ${billDetails.paymentMethod}</p>
        <h3>Items</h3>
        <ul>
            ${billDetails.items.map(item => `
                <li>${item.name} - Quantity: ${item.quantity}, Price: ₹${item.price}</li>
            `).join("")}
        </ul>
        <p><strong>Total Price:</strong> ₹${billDetails.totalPrice}</p>
        <p>Contact: ${billDetails.userContact}</p>
        <button class="btn"><a href="Home.html" class="bill-btn">Continue to Home</a></button>
    `;

    // Clear cart and store bill in the database when "Continue to Home" is clicked
    const continueButton = document.querySelector('.bill-btn');
    continueButton.addEventListener("click", () => {
        fetch('/Bill', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(billDetails) // Send the bill details to backend
        })
        .then(response => response.json())
        .then(data => {
            console.log('Bill saved successfully:', data);
            
            // Clear cart data from localStorage
            localStorage.removeItem("cart");
            // Redirect to the home page
            window.location.href = "Home.html";
        })
        .catch(error => console.error('Error saving bill:', error));
    });
});
