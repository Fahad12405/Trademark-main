document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("hello");

  let contactFormData = {
    FullName: document.getElementById("fullName").value,
    PhoneNumber: document.getElementById("phone").value,
    Email: document.getElementById("email").value,
    Subject: document.getElementById("subject").value,
    Message: document.getElementById("message").value,
  };
  console.log(contactFormData);
  emailjs.send("service_dmhl49c", "template_8divavo", contactFormData).then(
    (response) => {
      console.log("Success!", response.status, response.text);
      // alert("Your form has been submitted successfully!");
      Swal.fire({
        icon: "success",
        title: "Your Deatils Has Been Send",
        text: "Thanks You.",
        confirmButtonText: "OK",
      });
    },
    (error) => {
      console.error("Failed to send form", error);
      alert("There was an error sending your form. Please try again.");
    }
  );
});
