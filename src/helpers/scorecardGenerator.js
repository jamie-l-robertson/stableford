function generateDefaultScoreCard(players, names) {
  let data = [];
  let holes = [];

  for (var i = 0; i < 18; i++) {
    holes.push({
      number: i + 1,
      putts: 0
    });
  }

  data = players.map((player, i) => {
    return {
      key: i,
      id: player.id,
      name: names[i].name,
      hole: holes
    };
  });

  return data;
}


export default generateDefaultScoreCard;