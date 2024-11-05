"use client";
import React, { useEffect, useRef, useState } from "react";
import { Coins } from "lucide-react";
import { IonIcon } from "@ionic/react";
import { logoDiscord, logoGithub, logoTwitter } from "ionicons/icons";
import { Calendar, CalendarHeart, Rocket } from "@phosphor-icons/react";

const IndexPage = () => {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const vantaEffect = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [tokenInfo, setTokenInfo] = useState({
    name: "",
    symbol: "",
    initialSupply: "",
    totalSupply: "",
    decimal: "",
  });

  const [presaleInfo, setPresaleInfo] = useState({
    softCap: "",
    hardCap: "",
    minBuy: "",
    maxBuy: "",
    presaleRate: "",
    listingRate: "",
    startTime: "",
    endTime: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsClient(true); // Ensures IonIcon and other client-side elements render correctly

    const loadVanta = async () => {
      if (!vantaEffect.current) {
        const THREE = await import("three");
        const VANTA = (await import("vanta/dist/vanta.net.min")).default;
        vantaEffect.current = VANTA({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x231ec8,
          backgroundColor: 0x0d0d20,
          points: 15.0,
          maxDistance: 27.0,
        });
      }
    };
    loadVanta();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  const handleTokenInfoChange = (e) => {
    const { name, value } = e.target;
    setTokenInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePresaleInfoChange = (e) => {
    const { name, value } = e.target;
    setPresaleInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateToken = (e) => {
    e.preventDefault();
    if (
      !tokenInfo.name ||
      !tokenInfo.symbol ||
      Number(tokenInfo.initialSupply) <= 0 ||
      Number(tokenInfo.totalSupply) <= 0 ||
      Number(tokenInfo.decimal) <= 0 ||
      Number(presaleInfo.hardCap) <= 0 ||
      Number(presaleInfo.minBuy) <= 0 ||
      Number(presaleInfo.maxBuy) <= 0 ||
      Number(presaleInfo.presaleRate) <= 0 ||
      Number(presaleInfo.listingRate) <= 0 ||
      !presaleInfo.startTime ||
      !presaleInfo.endTime
    ) {
      setErrorMessage("Please fill in all fields correctly.");
      return;
    }
    setErrorMessage("");
    console.log("Token Info: ", tokenInfo);
    console.log("Presale Info: ", presaleInfo);
    setSuccessMessage("Token created successfully!");
    resetForm();
  };

  const resetForm = () => {
    setTokenInfo({
      name: "",
      symbol: "",
      initialSupply: "",
      totalSupply: "",
      decimal: "",
    });
    setPresaleInfo({
      softCap: "",
      hardCap: "",
      minBuy: "",
      maxBuy: "",
      presaleRate: "",
      listingRate: "",
      startTime: "",
      endTime: "",
    });
    setSuccessMessage("");
    setErrorMessage("");
  };

  if (!isClient) return null; // Render nothing until on client

  return (
   <div
  ref={vantaRef}
  className="flex flex-col items-center w-screen h-full text-3xl text-white font-bold"
>
  <h1 className="mt-10">Token-Manager-App</h1>
  <div className="flex justify-center w-full p-5 mt-8">
    <div className="flex flex-col items-center w-full max-w-md mx-2">
      <form
        className="bg-blue-950 p-6 rounded-lg shadow-lg w-full"
        onSubmit={handleCreateToken}
      >
        <h2 className="text-2xl mb-4">
          <Coins className="inline mr-2" />
          Token Information
        </h2>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={tokenInfo.name}
            onChange={handleTokenInfoChange}
            placeholder="Token Name"
            className="w-full p-2 rounded bg-indigo-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="symbol"
            value={tokenInfo.symbol}
            onChange={handleTokenInfoChange}
            placeholder="Token Symbol"
            className="w-full p-2 rounded bg-indigo-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="initialSupply"
            value={tokenInfo.initialSupply}
            onChange={handleTokenInfoChange}
            placeholder="Initial Supply"
            className="w-full p-2 rounded bg-indigo-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="totalSupply"
            value={tokenInfo.totalSupply}
            onChange={handleTokenInfoChange}
            placeholder="Total Supply"
            className="w-full p-2 rounded bg-indigo-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="decimal"
            value={tokenInfo.decimal}
            onChange={handleTokenInfoChange}
            placeholder="Decimals"
            className="w-full p-2 rounded bg-indigo-500 focus:outline-none"
            required
          />
        </div>
      </form>
    </div>

    <div className="flex flex-col items-center w-full max-w-md mx-2">
      <form
        className="bg-blue-950 p-6 rounded-lg shadow-lg w-full"
        onSubmit={handleCreateToken}
      >
        <h2 className="text-2xl mb-4">
          <Rocket className="inline mr-2" />
          Presale Information
        </h2>
        <div className="mb-4">
          <input
            type="number"
            name="hardCap"
            value={presaleInfo.hardCap}
            onChange={handlePresaleInfoChange}
            placeholder="Hard Cap"
            className="w-full p-2 rounded bg-indigo-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="minBuy"
            value={presaleInfo.minBuy}
            onChange={handlePresaleInfoChange}
            placeholder="Minimum Buy"
            className="w-full p-2 rounded bg-indigo-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="maxBuy"
            value={presaleInfo.maxBuy}
            onChange={handlePresaleInfoChange}
            placeholder="Maximum Buy"
            className="w-full p-2 rounded bg-indigo-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="presaleRate"
            value={presaleInfo.presaleRate}
            onChange={handlePresaleInfoChange}
            placeholder="Presale Rate"
            className="w-full p-2 rounded bg-indigo-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="listingRate"
            value={presaleInfo.listingRate}
            onChange={handlePresaleInfoChange}
            placeholder="Listing Rate"
            className="w-full p-2 rounded bg-indigo-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <h2 className="text-2xl mb-4">
            <Calendar className="inline mr-2" />
            Start Date
          </h2>
          <input
            type="datetime-local"
            name="startTime"
            value={presaleInfo.startTime}
            onChange={handlePresaleInfoChange}
            className="w-full p-2 rounded bg-indigo-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <h2 className="text-2xl mb-4">
            <Calendar className="inline mr-2" />
            End Date
          </h2>
          <input
            type="datetime-local"
            name="endTime"
            value={presaleInfo.endTime}
            onChange={handlePresaleInfoChange}
            className="w-full p-2 rounded bg-indigo-500 focus:outline-none"
            required
          />
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="w-full p-2 bg-lime-700 rounded hover:bg-green-500 transition"
          >
            Create Token
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="ml-2 w-full p-2 bg-rose-700 rounded hover:bg-red-500 transition"
          >
            Reset
          </button>
        </div>
      </form>
      </div>
      </div>
      <div className="flex flex-col items-center mt-16 text-center w-full">
        <h2 className="text-3xl mb-4">Join Our Community</h2>
        <div className="flex space-x-8 mt-4">
          <a
            href="https://discord.gg/QagJFfcq"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IonIcon icon={logoDiscord} className="text-6xl text-white" />
          </a>
          <a
            href="https://x.com/web3developerID?t=5xsBInh6isdqAaBv8scWTQ&s=08"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IonIcon icon={logoTwitter} className="text-6xl text-white" />
          </a>
          <a
            href="https://github.com/orgs/IndiveWeb3Community/repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IonIcon icon={logoGithub} className="text-6xl text-white" />
          </a>
        </div>
        <p className="mt-4">Follow Us</p>
      </div>
    </div>
  );
};

export default IndexPage;
