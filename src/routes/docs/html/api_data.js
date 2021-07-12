define({ "api": [
  {
    "type": "get",
    "url": "/game/:id",
    "title": "1. Get a game's scorecard",
    "description": "<p>Retrieve a game's scorecard</p>",
    "name": "get_game",
    "group": "GameGroup",
    "sampleRequest": [
      {
        "url": "https://jlemon.org/scorecards/api/v1/game/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "/Users/joeylemon/Desktop/scorecards/src/routes/games/games.controller.js",
    "groupTitle": "Games",
    "groupDescription": "<p>These endpoints define CRUD routes for the list of games in the database</p>"
  },
  {
    "type": "get",
    "url": "/games",
    "title": "1. List of games",
    "description": "<p>Retrieve a list of all previous games</p>",
    "name": "get_games",
    "group": "GameGroup",
    "sampleRequest": [
      {
        "url": "https://jlemon.org/scorecards/api/v1/games"
      }
    ],
    "version": "0.0.0",
    "filename": "/Users/joeylemon/Desktop/scorecards/src/routes/games/games.controller.js",
    "groupTitle": "Games",
    "groupDescription": "<p>These endpoints define CRUD routes for the list of games in the database</p>"
  }
] });