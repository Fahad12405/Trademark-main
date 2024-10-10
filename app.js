function openModal(button) {
    const title = button.getAttribute('data-title');
    const price = button.getAttribute('data-price');
    document.getElementById('modal-title').innerHTML = title + ' <br>in Just <span>' + price + '</span>';
    document.getElementById('popupform_cr').style.display = 'block';
}

function closeModal() {
    document.getElementById('popupform_cr').style.display = 'none';
}

document.getElementById('formClose').addEventListener('click', function() {
    closeModal();
});

window.onclick = function(event) {
    const modal = document.getElementById('popupform_cr');
    if (event.target === modal) {
        closeModal();
    }
};

window.onkeydown = function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
};

function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission

    // Optionally, you can gather the form data here if needed
    const formData = {
        name: document.querySelector('input[name="customer_full_name"]').value,
        email: document.querySelector('input[name="customer_email"]').value,
        phone: document.querySelector('input[name="customer_phone"]').value,
        // Add any other necessary fields here
    };

    // You can process formData or send it via EmailJS here if needed

    // Redirect to the specified page
    window.location.href = "BrandmarkFote/brandmarkefort.html"; // Redirect to this URL
}
