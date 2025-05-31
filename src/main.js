document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("Message sent successfully!");
    } else {
      alert("Something went wrong.");
    }
  });