function createLogin(): void {
    const form = document.createElement("form");
    form.style.position = "absolute"; // Position the form absolutely
    form.style.right = "50px";          // Center the form horizontally
    form.style.top = "50px";           // Center the form vertically

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Username";
    input.style.marginRight = "10px"; // Add some space to the right of the input

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Login";
    form.appendChild(input); // add input field
    form.appendChild(button); // add the button to the form
    document.body.appendChild(form); // add the form to the body
}

window.onload = () => {
    const message: string = "Welcome to the Pong game!";
    const header = document.createElement("h2");
    header.textContent = message;
    document.body.appendChild(header);
    createLogin();
};
