import {
  buttonAudioAtom,
  nameArrayAtom,
  selectAudioAtom,
} from "@/app/atoms/globalState";
import { useAtom } from "jotai";

export default function ColorSelectHooks() {
  const [nameArray, setNameArray] = useAtom(nameArrayAtom);
  const [buttonAudio] = useAtom(buttonAudioAtom);
  const [selectAudio] = useAtom(selectAudioAtom);

  function handleMouseClick(i: number, nameOfPlayer: string) {
    setNameArray((prevArray: string[]) => {
      let newArray = [...prevArray];

      if (newArray.includes(nameOfPlayer)) {
        let oldIndex = newArray.indexOf(nameOfPlayer);
        let oldName = newArray[i];
        newArray[i] = nameOfPlayer;
        newArray[oldIndex] = oldName;
      } else {
        newArray[i] = nameOfPlayer;
      }

      if (newArray.indexOf("") === -1) {
        buttonAudio.play();
      } else {
        selectAudio.play();
      }

      return newArray;
    });
  }

  return { handleMouseClick };
}
