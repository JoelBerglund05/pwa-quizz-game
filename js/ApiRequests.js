export default class ApiRequests{
  constructor() {}

  async GetARowFrom(table, idToRow) {
    const { data, error } = await this.supabase.from(table).select();

    if (error) {
      console.log("Kunde inte hämta data: ", error);
      return;
    }
    return data;
  }

  async GetUser() {
    const {
      data: { user },
    } = await this.supabase.auth.getUser();
    return user;
  }

  async CreateGame() {
    const response = await fetch("http://127.0.0.1/api/create-game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "bearer": sessionStorage.getItem("token"),
        "Accept": "application/json",
      }
    });

    if (error) {
      console.log("Kunde inte spara data: ", error);
    }
  }

  async GetAllActiveGames() {
    const { data, error } = await this.supabase.from("activeGames").select();

    if (error) {
      console.log("Kunde inte hämta data: ", error);
    }
  }

  async UpdateSpesificActiveGame(activeGameId) {
    const user = await this.GetUser();

    const { data, error } = await this.supabase
      .from("activeGames")
      .update({ userId2: user.id })
      .eq("id", activeGameId)
      .select();

    if (error) {
      console.log("Kunde inte updatera data: ", error);
    }
  }
}
