export default class GameHandeler {
  constructor() {}
  async CreateGame(dataBase) {
    const activeGames = await dataBase.GetAllActiveGames();
    const user = await dataBase.GetUser();

    let foundEmptyGame = false;
    activeGames.forEach(async (emptyId) => {
      if (
        emptyId.userId2 === null &&
        !foundEmptyGame &&
        emptyId.userId1 !== user.id
      ) {
        foundEmptyGame = true;
        emptyId.userId2 = user.id;
        await dataBase.UpdateSpesificActiveGame(emptyId.id);
      }
    });

    if (!foundEmptyGame) {
      dataBase.CreateGame();
    }
  }
  async GetMyActiveGames(dataBase) {
    const activeGames = await dataBase.GetAllActiveGames();
    const user = await dataBase.GetUser();
    const myActiveGames = [];
    activeGames.forEach((userGame) => {
      if (userGame.userId2 === user.id || userGame.userId1 === user.id) {
        myActiveGames.push(userGame);
      }
    });
    return myActiveGames;
  }
}
