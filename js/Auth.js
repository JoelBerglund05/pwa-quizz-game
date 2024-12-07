export default class Auth {
  async SignUpUser(name, email, password) {
    if (password[0] !== password[1]) {
      alert("Lösenorden är inte samma");
      return;
    } 
    else if (sessionStorage.getItem("token")) {
      alert("Redan inloggad")
      return;
    }

    const response = await fetch("http://127.0.0.1/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password[0],
        password_confirmation: password[1],
      }),
    });

    let json = "";
    try {
      json = await response.json();
      console.log(json);
    } catch (error) {
      console.log("kunde inte skapa konto: ", error);
      console.log(json);
    }

    sessionStorage.setItem("token", json.token);
    Response.redirect("http://127.0.0.1:5501/index.html")
  }

  async SignInUser(email, password) {
    const response = await fetch("http://127.0.0.1/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        password_confirmation: password,
      }),
    });

    let json = "";
    try {
      json = await response.json();
      console.log(json)
    } catch (error) {
      console.log("Kunde inte logga in", error);
    }

    localStorage.setItem("token", json.token);
  }

  async LogOutUser() {
    localStorage.removeItem("token");
  }
}
