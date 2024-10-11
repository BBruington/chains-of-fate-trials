import {
  nameArrayAtom,
  numOfPlayersAtom,
  playerIconAtom,
  playerNameAtom,
} from "@/app/atoms/globalState";
import { PageContext } from "@/app/pose-mirror/page-context";
import { pusherClient } from "@/lib/pusher";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { Cinzel, Luxurious_Roman } from "next/font/google";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

const fontHeader = Cinzel({
  // use cn when implementing it
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const fontList = Luxurious_Roman({
  // use cn when implementing it
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function StartScreen() {
  // Context
  const { colorSelectMusicRef, setShowStart } = useContext(PageContext);

  // Player States
  const [playerName, setPlayerName] = useAtom(playerNameAtom);
  const [playerIcon, setPlayerIcon] = useAtom(playerIconAtom);
  const [nameArray, setNameArray] = useAtom(nameArrayAtom);
  const [numOfPlayers, setNumOfPlayers] = useAtom(numOfPlayersAtom);

  // State for Flash Inputs
  const [flashInputName, setFlashInputName] = useState(false);
  const [flashInputIcon, setFlashInputIcon] = useState(false);

  // State for Reveal Elements
  const [removeRevealElement, setRemoveRevealElement] = useState(false);
  const [isSetNameArrayFinished, setIsSetNameArrayFinished] = useState(false);

  // Unique Titles State
  const [uniqueTitles, setUniqueTitles] = useState({
    Aelarion: { title: "Veil of the Demon Within" },
    Artemis: { title: "The Hidden Circuit" },
    Elendiel: { title: "The Elven Dissapointment" },
    Gannandolf: { title: "Norebo's Pet" },
  });

  // Refs
  const inputNameFlashRef = useRef<HTMLInputElement | null>(null);
  const inputIconFlashRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const inputNameElement = inputNameFlashRef.current;
    const inputIconElement = inputIconFlashRef.current;

    inputNameElement.addEventListener("animationend", () => {
      setFlashInputName(false);
    });

    inputIconElement.addEventListener("animationend", () => {
      setFlashInputIcon(false);
    });

    return () => {
      inputNameElement.removeEventListener("animationend", () => {});
      inputIconElement.removeEventListener("animationend", () => {});
    };
  }, []);

  function handleStartButton() {
    if (!playerName || !playerIcon) {
      setFlashInputName(!playerName);
      setFlashInputIcon(!playerIcon);
    } else {
      poseMirrorStart();

      setShowStart(false);
      colorSelectMusicRef.current.play();
      colorSelectMusicRef.current.loop = true;
    }
  }

  function handleInputNameChange(e) {
    const { value } = e.target;
    if (flashInputName === true) {
      setFlashInputName(false);
    }

    if (uniqueTitles[value]) {
      setTimeout(() => {
        setRemoveRevealElement(true);
      }, 1800);
    } else {
      setRemoveRevealElement(false);
    }

    if (value.length <= 14) {
      setPlayerName(value);
    }
  }

  function handleInputIconChange(e) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageURL = URL.createObjectURL(file);
      setPlayerIcon(imageURL);
    }
  }

  async function poseMirrorStart() {
    console.log("poseMirrorStart");
    await fetch("/api/pose-mirror-start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: "pose-mirror",
        event: "pose-start",
        data: {},
      }),
    });
  }

  useEffect(() => {
    pusherClient.subscribe("pose-mirror");

    const handleStartClick = (data) => {
      console.log("handleStartClick");
      setNumOfPlayers((prevNumOfPlayers) => {
        const newNumOfPlayers = prevNumOfPlayers + 1;
        let newNameArray = [];
        console.log(newNumOfPlayers);

        setNameArray(() => {
          let initalNameArray = [];

          for (let i = 0; i < newNumOfPlayers; i++) {
            initalNameArray.push({
              color: "",
              colorBorder: "",
              icon: "",
              name: "",
              state: false,
              number: null,
              userId: "",
            });
          }
          newNameArray = initalNameArray;

          return initalNameArray;
        });
        console.log(newNameArray);
        return newNameArray.length;
      });
    };

    pusherClient.bind("pose-start", handleStartClick);

    return () => {
      pusherClient.unsubscribe("pose-mirror");
      pusherClient.unbind("pose-start", handleStartClick);
    };
  }, []);

  return (
    <div className="absolute z-40 flex h-full w-full flex-col items-center justify-center bg-neutral-200">
      <div className="mb-12 flex w-11/12 max-w-[1000px] items-center justify-evenly">
        {playerIcon !== null ? (
          <div className="h-full max-h-44 w-2/5 max-w-44 rounded-md md:max-h-56 md:max-w-56 lg:max-h-64 lg:max-w-64">
            <Image
              className="rounded-md"
              alt="Player Icon"
              width={125}
              height={125}
              layout="responsive"
              src={playerIcon}
            />
          </div>
        ) : (
          <div className="h-44 w-44 rounded-md bg-white md:h-56 md:w-56 lg:h-64 lg:w-64"></div>
        )}

        <div className="flex w-2/5 flex-col lg:w-1/2">
          <h1
            className={cn(
              fontHeader.className,
              "lg: max-h-[180px] overflow-hidden break-all text-3xl font-bold md:text-5xl lg:text-6xl",
            )}
          >
            {playerName}
          </h1>

          <div className="h-20 w-full overflow-hidden">
            {uniqueTitles[playerName] && (
              <div className="relative">
                {!removeRevealElement && (
                  <div className="absolute z-10 h-full w-full animate-reveal bg-neutral-200"></div>
                )}

                <div className="relative h-1 w-full">
                  <div className="absolute h-full w-full rounded-lg bg-gradient-to-r from-neutral-800 to-transparent"></div>
                </div>

                <h2
                  className={cn(
                    fontList.className,
                    "text-xl md:text-2xl lg:text-4xl",
                  )}
                >
                  {uniqueTitles[playerName].title}
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-12 flex w-11/12 items-center justify-center md:w-2/3">
        <div className="mr-4 flex w-5/12 max-w-[260px] items-center justify-center">
          <label
            ref={inputIconFlashRef}
            htmlFor="file-upload"
            className={`${flashInputIcon ? "animate-inputPulse" : "animate-none"} m-auto flex h-full w-full items-center justify-center rounded-md bg-white p-4 text-xl hover:cursor-pointer`}
          >
            Insert Icon Here
          </label>
          <input
            id="file-upload"
            onChange={handleInputIconChange}
            className={`hidden h-full w-5/12`}
            type="file"
            accept="image/*"
          />
        </div>

        <input
          onChange={handleInputNameChange}
          ref={inputNameFlashRef}
          className={`${flashInputName ? "animate-inputPulse" : "animate-none"} ml-4 w-5/12 max-w-[260px] rounded-md p-4 text-xl transition`}
          value={playerName}
          placeholder="Insert Name Here..."
        />
      </div>

      <button
        onClick={() => {
          handleStartButton();
          setIsSetNameArrayFinished(true);
        }}
        className="h-1/3 max-h-64 w-3/4 max-w-[600px] rounded-3xl bg-neutral-800 text-6xl text-neutral-200 duration-150 ease-in-out hover:scale-110 focus:scale-110 active:scale-95"
      >
        START
      </button>
    </div>
  );
}
