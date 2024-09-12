var modal = document.getElementById("signupModal");
var closeBtns = document.querySelectorAll(".close");
let stkPush = document.getElementById("stkPush");

function signUp() {
  console.log("Its should show the modal:");
  modal.style.display = "block";
}
// Close modal
closeBtns.forEach(function (btn) {
  btn.onclick = function () {
    modal.style.display = "none";
  };
});

// Close modal if clicked outside of content
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

stkPush.addEventListener("submit", (e) => {
  e.preventDefault();

  let phoneNumber = document.getElementById("phone").value;
  let membership = document.getElementById("membership").value;
  const errorMessage = document.querySelector(".phone-validator");
  
  console.log(`The phone number is: ${phoneNumber}`)
  console.log(`The ammount is : ${membership}`)
  if (phoneNumber.length < 12) {
     errorMessage.style.display = "block";
    return;
  }
  makePayment(phoneNumber, membership)
  alert("Complete the payment from your phone to complete registration");
  document.getElementById("stkPush").reset();
  modal.style.display = "none";
});

function makePayment(number, amount) {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    phone_number: number,
    amount: amount,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://127.0.0.1:8000/stk-push", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  
}

