import {
  buttonAudioAtom,
  nameArrayAtom,
  playerIconAtom,
  playerNameAtom,
  selectAudioAtom,
  userIdAtom,
} from "@/app/atoms/globalState";
import { colorBorderChoices, colorChoices, colorNames } from "@/app/pose-mirror/const";
import { useAtom } from "jotai";

export default function ColorSelectHooks() {
  const [nameArray, setNameArray] = useAtom(nameArrayAtom);
  const [buttonAudio] = useAtom(buttonAudioAtom);
  const [selectAudio] = useAtom(selectAudioAtom);
  const [playerIcon, setPlayerIcon] = useAtom(playerIconAtom);
  const [playerName, setPlayerName] = useAtom(playerNameAtom);
  const [userId, setUserId] = useAtom(userIdAtom);

  function handleColorChoice(i: number) {
    setNameArray((prevArray) => {
      let newArray = [...prevArray];
      console.log(newArray);

      const playerNameExistingIndex = newArray.findIndex(
        (obj) => obj.name === playerName,
      );

      const targetElement = {
        colorName: colorNames[i],
        color: colorChoices[i],
        colorBorder: colorBorderChoices[i],
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

      if (newArray.indexOf("") === -1) {
        buttonAudio.play();
      } else {
        selectAudio.play();
      }
      console.log(newArray);
      return newArray;
    });
  }

  return { handleColorChoice };
}
