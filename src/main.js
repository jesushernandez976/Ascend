document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('https://ascend-back-end.onrender.com/contact', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("Message sent successfully!");
      this.reset();  // Clear form after success
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    alert("Network error. Please check your connection.");
    console.error("Fetch error:", error);
  }
});


  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });