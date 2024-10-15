let currentStep = 1;
const totalSteps = 6; // Update this to reflect total steps including payment
let packagePrice = 0; // Variable to store the package price

function showStep(step) {
    for (let i = 1; i <= totalSteps; i++) {
        document.getElementById(`step-${i}`).classList.remove('active');
    }
    document.getElementById(`step-${step}`).classList.add('active');
}

function nextStep(step) {
    if (validateStep(currentStep)) {
        currentStep = step;
        showStep(currentStep);
    }
}

function prevStep(step) {
    currentStep = step;
    showStep(currentStep);
}

function validateStep(step) {
    const formStep = document.getElementById(`step-${step}`);
    const inputs = formStep.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });

    return isValid;
}

// New function to update the payment amount based on selected package
function updatePaymentAmount() {
    const selectedPackage = document.querySelector('input[name="package"]:checked');
    if (selectedPackage) {
        switch (selectedPackage.value) {
            case 'basic':
                packagePrice = 35; // Package price
                break;
            case 'standard':
                packagePrice = 135; // Package price
                break;
            case 'premium':
                packagePrice = 225; // Package price
                break;
            default:
                packagePrice = 0; // Default to 0
        }
        // document.getElementById('totalAmount').textContent = packagePrice; // Update the total amount display
    }
}

// Add event listeners to update the payment amount when a package is selected
const packageRadios = document.querySelectorAll('input[name="package"]');
packageRadios.forEach(radio => {
    radio.addEventListener('change', updatePaymentAmount);
});


let selectedPackageDetails = {};

// Function to update the selected package details
function updateSelectedPackage() {
    const selectedPackage = document.querySelector('input[name="package"]:checked');
    if (selectedPackage) {
        selectedPackageDetails = {
            name: selectedPackage.value, // Get the package name
            price: selectedPackage.getAttribute('data-price'), // Get the price
            description: selectedPackage.closest('.package-card').querySelector('h5').innerText // Get the package description
        };
    }
}

// Add event listeners to the radio buttons
const Packege = document.querySelectorAll('input[name="package"]');
Packege.forEach(radio => {
    radio.addEventListener('change', updateSelectedPackage);
});

let payNow = document.getElementById('payNow');
let apiURL = "https://stripe-backend-iota.vercel.app"

document.getElementById('registrationForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Collect form data
    const formData = {
        markName: document.getElementById("markName").value,
        ownershipType: document.querySelector('input[name="ownershipType"]:checked').value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        country: document.getElementById("country").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        zip: document.getElementById("zip").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        description: document.getElementById("description").value,
        searchType: document.querySelector('input[name="searchType"]:checked').value,
        package: document.querySelector('input[name="package"]:checked').value,
        processingSpeed: document.querySelector('input[name="processingSpeed"]:checked').value,
        termsAccepted: document.getElementById("terms").checked,
        // pakegePrice: document.getElementById("totalAmount").textContent,

    };


    // Stripe Payment Method
    const stripe = await Stripe("pk_test_51Q5CQjBSRlxFwzyWZZr67eMkwml3WUCZdRg4bcW5mtBx1NffoI3wDxNJ7QPAzEVUczP8ntAnMPmlDYeTyWEBpjl100xLHDUUps");
    payNow.innerText = "Processing...";
    const body = {
        packege: selectedPackageDetails // Package details from the form
    };

    const headers = {
        "Content-Type": "application/json"
    };

    const response = await fetch(`${apiURL}/create-checkout-session`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        const errorResponse = await response.json(); // Parse the error response
        console.error("Error creating checkout session:", errorResponse.error);
        return; // Exit the function on error
    }

    const session = await response.json(); // Parse JSON only if response is okay

    // Redirect to the Stripe checkout
    const result = await stripe.redirectToCheckout({
        sessionId: session.id // Use the session ID received from the backend
    });

    if (result.error) {
        console.error(result.error.message);
        Swal.fire({
            icon: 'Error',
            title: 'Payment failed. Please try again.',
            text: 'Try Again',
            confirmButtonText: 'OK'
        });
        // alert("Payment failed. Please try again.");
        payNow.innerText = "Pay Now";
    }


    //     emailjs.send("service_dmhl49c","template_glih28d", formData)
    //         .then((response) => {
    //             console.log("Success!", response.status, response.text);
    //             // alert("Your form has been submitted successfully!");
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Your Payment Successful',
    //                 text: 'Thanks You.',
    //                 confirmButtonText: 'OK'
    //             });
    //             document.getElementById('registrationForm').reset();
    //             showStep(1); // Reset to step 1
    //             currentStep = 1;
    //         }, (error) => {
    //             console.error("Failed to send form", error);
    //             alert("There was an error sending your form. Please try again.");
    //         });

});



