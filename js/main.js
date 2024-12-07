import ApiRequests from "./ApiRequests.js";
import EventManager from "./EventManager.js";
import GameHandeler from "./GameHandeler.js";
import Auth from "./Auth.js";

class Main {
  constructor() {
    this.dataBase = new ApiRequests();
    this.authenticattion = new Auth();
    this.eventManager = new EventManager();
    this.gameHandeler = new GameHandeler();
    this.btnDBRequest = document.getElementById("btnDBRequest");
    this.displayData = document.getElementById("dBData");

    this.name = document.getElementById("name");
    this.btnCreateAccount = document.getElementById("createAccount");
    this.email = document.getElementById("email");
    this.password = [
      document.getElementById("password1"),
      document.getElementById("password2"),
    ];
    this.btnSignIn = document.getElementById("signIn");
    this.btnCreateGame = document.getElementById("createGame");

    this.tmp = document.getElementById("tmp");
  }
  RegisterServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./js/ServiceWorker.js").then((reg) => {
        console.log("Registration succeeded. Scope is " + reg.scope);
      });
    }
  }
  async DisplayQuestion(id) {
    const DBData = await this.dataBase.GetARowFrom("quizz", id);

    if (DBData !== null) {
      DBData.map((data) => {
        this.displayData.innerHTML = data.questions;
      });
    }
  }
  async CreateAccount() {
    const {
      data: { user },
    } = await this.dataBase.supabase.auth.getUser();

    console.log(user);
  }

  async SignInUser() {
    const {
      data: { user },
    } = await this.dataBase.supabase.auth.getUser();

    console.log("HEJJJJJ");

    console.log(user);
  }
  Main() {
    const clickEvent = "click";
    this.RegisterServiceWorker();

    this.eventManager.EventListener(this.btnDBRequest, clickEvent, () =>
      this.DisplayQuestion(1),
    );

    this.eventManager.EventListener(this.btnCreateAccount, clickEvent, () =>
      this.authenticattion.SignUpUser(this.name.value, this.email.value, [
        this.password[0].value,
        this.password[1].value,
      ]),
    );

    this.eventManager.EventListener(this.btnSignIn, clickEvent, () =>
      this.authenticattion.SignInUser(this.email.value, this.password[0].value),
    );

    this.eventManager.EventListener(this.btnCreateGame, clickEvent, () =>
      this.gameHandeler.CreateGame(this.dataBase),
    );
  }
}

const main = new Main();
main.Main();
