import { useDataContext } from "../context/DataContext";
export default function Leaderboard() {
  const { leaderboard } = useDataContext();
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
                  Tokens Deposit
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((player: any, index: number) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-primary-bg" : "bg-secondary-bg"
                  } hover:bg-accent-color hover:text-primary-bg transition duration-300`}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Player Avatar"
                      className="w-10 h-10 rounded-full border-2 border-primary-color"
                    />
                   
                  </td>
                  <td className="px-4 py-3">{player.user}</td>
                  <td className="px-4 py-3">{player.score}</td>
                  <td className="px-4 py-3">5 USDC</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
