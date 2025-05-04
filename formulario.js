
function enviarReserva(e) {
    e.preventDefault();
    fetch("https://script.google.com/macros/s/AKfycbzjhFkHQfNTg9t_mQBvycs075XNA2at7OQBr7aHAFRBVj6fboQJX5Ics3cf89IiJSIt/exec", {
        method: "POST",
        body: JSON.stringify({
            nombre: document.getElementById("nombre").value,
            email: document.getElementById("email").value,
            fecha: document.getElementById("fecha").value,
            mensaje: document.getElementById("mensaje").value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            alert("Reserva enviada con éxito");
            document.querySelector("form").reset();
        } else {
            alert("Hubo un error al enviar la reserva");
        }
    })
    .catch(error => {
        alert("Error de red");
    });
}
