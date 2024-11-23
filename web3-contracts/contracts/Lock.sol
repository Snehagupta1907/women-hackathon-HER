// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";

contract SnakeGame {
    IERC20 public _token;
    address public owner;
    struct Player {
        uint256 startingDeposit;
        uint256 score;
        uint256 lifes;
    }

    struct Pool {
        uint256 poolId;
        address[] participants;
        mapping(address => Player) players;
        uint256 totalDeposit;
        uint256 startTime;
        uint256 endTime;
    }

    uint256 public nextPoolId = 1; // Counter for pool IDs
    mapping(uint256 => Pool) public pools; // All pools by ID

    event PoolCreated(uint256 poolId);
    event JoinedPool(uint256 poolId, address player, uint256 deposit);
    event ScoreUpdated(uint256 poolId, address player, uint256 newScore);

    constructor(address _usdtToken) {
        owner = msg.sender;
        _token = IERC20(_usdtToken);
    }

    // Create a new pool
    function createPool() external returns (uint256) {
        require(msg.sender == owner, "Only the owner can create a pool");
        uint256 poolId = nextPoolId++;
        Pool storage newPool = pools[poolId];
        newPool.poolId = poolId;
        newPool.startTime = block.timestamp;
        newPool.endTime = block.timestamp + 1 days;
        newPool.totalDeposit = 0;
        emit PoolCreated(poolId);
        return poolId;
    }

    // Join an existing pool
    function joinPool(uint256 poolId, uint256 depositAmount) external {
        Pool storage pool = pools[poolId];
        require(pool.poolId != 0, "Pool does not exist");
        require(depositAmount == 5, "Deposit amount must be greater than 0");
        // Transfer tokens to the contract
        require(
            _token.transferFrom(
                msg.sender,
                address(this),
                depositAmount * (10**18)
            ),
            "Token transfer failed"
        );
        Player storage player = pool.players[msg.sender];
        require(player.startingDeposit == 0, "Player already in the pool");
        // Add the player to the pool
        player.startingDeposit = depositAmount;
        player.score = 0;
        player.lifes = 3;
        pool.participants.push(msg.sender);
        pool.totalDeposit += depositAmount;
        emit JoinedPool(poolId, msg.sender, depositAmount);
    }

    function updateScore(
        uint256 poolId,
        address player,
        uint256 newScore
    ) external {
        Pool storage pool = pools[poolId];
        require(pool.poolId != 0, "Pool does not exist");
        require(pool.players[player].lifes > 0, "You have no lifes");
        require(
            pool.players[player].startingDeposit > 0,
            "Player not in the pool"
        );
        pool.players[player].score = newScore;
        pool.players[player].lifes = pool.players[player].lifes - 1;
        emit ScoreUpdated(poolId, player, newScore);
    }

    // Get the leaderboard for a pool
    function getLeaderboard(uint256 poolId)
        external
        view
        returns (address[] memory, uint256[] memory)
    {
        Pool storage pool = pools[poolId];
        require(pool.poolId != 0, "Pool does not exist");

        uint256 length = pool.participants.length;
        address[] memory players = new address[](length);
        uint256[] memory scores = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            address participant = pool.participants[i];
            players[i] = participant;
            scores[i] = pool.players[participant].score;
        }

        return (players, scores);
    }

    // Get a player's information in a specific pool
    function getPlayerInfo(uint256 poolId, address player)
        external
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        Pool storage pool = pools[poolId];
        require(pool.poolId != 0, "Pool does not exist");
        Player storage playerData = pool.players[player];
        return (playerData.startingDeposit, playerData.score, playerData.lifes);
    }
}
