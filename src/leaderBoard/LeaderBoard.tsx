

export default function Leaderboard() {
    const players = [
      {
        id: 1,
        name: "PlayerOne",
        wallet: "0x123...456",
        score: 500,
        tokensWon: 50,
        avatar: "https://via.placeholder.com/50",
      },
      {
        id: 2,
        name: "PlayerTwo",
        wallet: "0x789...012",
        score: 450,
        tokensWon: 45,
        avatar: "https://via.placeholder.com/50",
      },
      {
        id: 3,
        name: "PlayerThree",
        wallet: "0x345...678",
        score: 400,
        tokensWon: 40,
        avatar: "https://via.placeholder.com/50",
      },
      {
        id: 4,
        name: "PlayerFour",
        wallet: "0x901...234",
        score: 350,
        tokensWon: 35,
        avatar: "https://via.placeholder.com/50",
      },
      {
        id: 5,
        name: "PlayerFive",
        wallet: "0x567...890",
        score: 300,
        tokensWon: 30,
        avatar: "https://via.placeholder.com/50",
      },
    ];
  
    return (
        <>

     
      <div className="max-w-5xl  mx-auto mt-24 bg-secondary-bg text-text-color p-6 rounded-lg shadow-lg">
        
        <h2 className="text-3xl font-bold text-primary-color mb-4 text-center">
          Leaderboard
        </h2>
        <p className="text-muted-text-color text-center mb-6">
          Compete for the top spot in Snake Game! 🐍
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-secondary-bg">
                <th className="px-4 py-2 text-left text-primary-color uppercase text-sm">
                  Rank
                </th>
                <th className="px-4 py-2 text-left text-primary-color uppercase text-sm">
                  Player
                </th>
                <th className="px-4 py-2 text-left text-primary-color uppercase text-sm">
                  Wallet
                </th>
                <th className="px-4 py-2 text-left text-primary-color uppercase text-sm">
                  Score
                </th>
                <th className="px-4 py-2 text-left text-primary-color uppercase text-sm">
                  Tokens Won
                </th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr
                  key={player.id}
                  className={`${
                    index % 2 === 0 ? "bg-primary-bg" : "bg-secondary-bg"
                  } hover:bg-accent-color hover:text-primary-bg transition duration-300`}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <img
                      src={player.avatar}
                      alt="Player Avatar"
                      className="w-10 h-10 rounded-full border-2 border-primary-color"
                    />
                    <span>{player.name}</span>
                  </td>
                  <td className="px-4 py-3">{player.wallet}</td>
                  <td className="px-4 py-3">{player.score}</td>
                  <td className="px-4 py-3">{player.tokensWon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </>
    );
  }
  