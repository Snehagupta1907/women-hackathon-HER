/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, ReactNode } from "react";
import { useAccount } from "wagmi";
import { useEthersSigner } from "../utils/signer";
import { ethers, BigNumber, Contract } from "ethers";
import toast from "react-hot-toast";
import { tokenAbi, mainContractABI, Addresses } from "../constant/index";

// Context types
interface DataContextProps {
  createPool: () => void;
  getPlayerInfo: (poolId: number) => void;
  userInfo: any;
  joinPool: (poolId: number, amount: number) => void;
  updateScore: (poolId: number, user: any, score: number) => void;
  getLeaderboard: (poolId: number) => void;
  leaderboard: any;
}

interface DataContextProviderProps {
  children: ReactNode;
}

// Context initialization
const DataContext = React.createContext<DataContextProps | undefined>(
  undefined
);

const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
}) => {
  const { address, chain } = useAccount();
  const [activeChain, setActiveChainId] = useState<number | undefined>(
    chain?.id
  );
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [leaderboard, setLeaderboard] = useState<any>([]);

  useEffect(() => {
    setActiveChainId(chain?.id);
  }, [chain?.id]);

  const signer = useEthersSigner({ chainId: activeChain });

  const getContractInstance = async (
    contractAddress: string,
    contractAbi: any
  ): Promise<Contract | undefined> => {
    try {
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      return contractInstance;
    } catch (error) {
      console.log("Error in deploying contract");
      return undefined;
    }
  };

  // const getTokenBalance = async () => {
  //   try {
  //   } catch (error) {}
  // };

  const createPool = async () => {
    const id = toast.loading("Creating pool...");
    try {
      if (!activeChain) {
        setLoading(false);
        toast.error("Please connect to a chain", { id });
        return;
      }

      const contractInstance = await getContractInstance(
        Addresses[activeChain]?.mainContractAddress,
        mainContractABI
      );
      if (!contractInstance) return;
      const tx = await contractInstance.createPool();
      await tx.wait();
      toast.success("Pool created successfully", { id });
    } catch (error) {
      setLoading(false);
      toast.error("Error in creating pool", { id });
    }
  };

  const joinPool = async (poolId: number, amount: number) => {
    const id = toast.loading("Joining pool...");
    try {
      const tokenContractInstance = await getContractInstance(
        Addresses[activeChain].tokenAddress,
        tokenAbi
      );
      if (!tokenContractInstance) return;
      const allowance = await tokenContractInstance.allowance(
        address,
        Addresses[activeChain].mainContractAddress
      );
      if (allowance.lt(BigNumber.from(amount))) {
        const tx = await tokenContractInstance.approve(
          Addresses[activeChain].mainContractAddress,
          BigNumber.from(amount * 10 ** 18)
        );
        await tx.wait();
      }
      const contractInstance = await getContractInstance(
        Addresses[activeChain].mainContractAddress,
        mainContractABI
      );
      if (!contractInstance) return;
      const tx = await contractInstance.joinPool(poolId, amount);

      await tx.wait();
      toast.success("Pool joined successfully", { id });
    } catch (error) {
      toast.error("You already Played", { id });
    }
  };

  const getLeaderboard = async (poolId: number) => {
    try {
      const contractInstance = await getContractInstance(
        Addresses[activeChain].mainContractAddress,
        mainContractABI
      );
      if (!contractInstance) return;
      const leaderboard = await contractInstance.getLeaderboard(poolId);
      const topPlayers = leaderboard[0].map((user:any, index:any) => ({
        user,
        score: +leaderboard[1][index].toString(),
      }));
      console.log(topPlayers, "topPlayers");
      setLeaderboard(topPlayers);
    } catch (error) {
      console.log(error, "Not fetching leaderboard");
    }
  };
  const updateScore = async (poolId: number, user: any, score: number) => {
    const id = toast.loading("Updating score...");
    try {
      const contractInstance = await getContractInstance(
        Addresses[activeChain].mainContractAddress,
        mainContractABI
      );
      if (!contractInstance) return;
      const tx = await contractInstance.updateScore(poolId, user, score);
      await tx.wait();
      toast.success("Score updated successfully", { id });
    } catch (error) {
      toast.error("Error in updating score", { id });
    }
  };

  const getPlayerInfo = async (poolId: number) => {
    try {
      const contractInstance = await getContractInstance(
        Addresses[activeChain].mainContractAddress,
        mainContractABI
      );
      console.log(contractInstance, "instance");
      if (!contractInstance) return;
      const userDetails = await contractInstance.getPlayerInfo(poolId, address);
      const userData = {
        depositAmount: userDetails[0].toNumber(),
        score: userDetails[1].toNumber(),
        lifes: userDetails[2].toNumber(),
      };
      
      setUserInfo(userData);
    } catch (error) {
      console.log(error, "Not fetching user details");
    }
  };

  useEffect(() => {
    if (!signer) return;
    getPlayerInfo(1);
    getLeaderboard(1);
  }, [signer]);

  return (
    <DataContext.Provider
      value={{
        createPool,
        getPlayerInfo,
        userInfo,
        joinPool,
        updateScore,
        getLeaderboard,
        leaderboard,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};

export default DataContextProvider;
