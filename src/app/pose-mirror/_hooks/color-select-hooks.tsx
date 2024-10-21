import {
  buttonAudioAtom,
  nameArrayAtom,
  playerIconAtom,
  playerNameAtom,
  selectAudioAtom,
  userIdAtom,
} from "@/app/atoms/globalState";
import {
  colorBorderChoices,
  colorChoices,
  colorNames,
} from "@/app/pose-mirror/const";
import { pusherClient } from "@/lib/pusher";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function ColorSelectHooks() {
  const [nameArray, setNameArray] = useAtom(nameArrayAtom);
  const [buttonAudio] = useAtom(buttonAudioAtom);
  const [selectAudio] = useAtom(selectAudioAtom);
  const [playerIcon, setPlayerIcon] = useAtom(playerIconAtom);
  const [playerName, setPlayerName] = useAtom(playerNameAtom);
  const [userId, setUserId] = useAtom(userIdAtom);

  useEffect(() => {
    pusherClient.subscribe("pose-mirror");

    const playButtonAudio = () => {
      console.log("playButtonAudio");
      buttonAudio.play();
    };

    const playSelectAudio = () => {
      console.log("playSelectAudio");
      selectAudio.play();
    };

    pusherClient.bind("button-audio", playButtonAudio);
    pusherClient.bind("select-audio", playSelectAudio);

    return () => {
      pusherClient.unbind("button-audio", playButtonAudio);
      pusherClient.unbind("select-audio", playSelectAudio);
      pusherClient.unsubscribe("pose-mirror");
    };
  }, []);

  async function poseMirrorButtonAudio() {
    await fetch("/api/pose-mirror-color-select-button-audio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: "pose-mirror",
        event: "button-audio",
        data: {},
      }),
    });
  }

  async function poseMirrorSelectAudio() {
    await fetch("/api/pose-mirror-color-select-audio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: "pose-mirror",
        event: "select-audio",
        data: {},
      }),
    });
  }

  function handleColorChoice(i: number) {
    setNameArray((prevArray) => {
      let newArray = [...prevArray];
      console.log(newArray);

      const playerNameExistingIndex = newArray.findIndex(
        (obj) => obj.name === playerName,
      );

      const targetElement = {
        color: colorChoices[i],
        colorBorder: colorBorderChoices[i],
        colorName: colorNames[i],
        icon: playerIcon,
        name: playerName,
        number: i,
        state: false,
        userId: userId,
      };

      console.log(targetElement.name);

      if (playerNameExistingIndex !== -1) {
        // When a player wants to swap color whether its an empty spot or with another player
        let oldIndex = playerNameExistingIndex;
        let oldInfo = nameArray[i];
        newArray[i] = { ...targetElement };
        newArray[oldIndex] = oldInfo;
      } else {
        // When a player chooses an empty spot
        console.log("empty spot");
        newArray[i] = { ...targetElement };
      }

      if (newArray.findIndex((player) => player.userId === "") === -1) {
        poseMirrorButtonAudio();
        console.log("buttonAudio");
      } else {
        poseMirrorSelectAudio();
        console.log("selectAudio");
      }
      console.log(newArray);
      return newArray;
    });
  }

  return { handleColorChoice };
}
