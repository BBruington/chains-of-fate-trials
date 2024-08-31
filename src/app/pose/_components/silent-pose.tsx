"use client";
import { useAtom } from "jotai";
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { coordinatesAtom } from "../../atoms/globalState";
import { changeHeadCoordiantes } from "../actions";
import BodyPartConnectors from "./body-part-connectors";
import BodyPartDisplay from "./body-parts-display";
import PoseOrder from "./pose-order";

export default function SilentPose({ user, prismaCoordinates }) {
  const isFirstRender = useRef(true);

  const [imageArray, setImageArray] = useState([
    { letter: "M", image: "/Pose/Pose1.JPG", active: false, completed: false },
    { letter: "N", image: "/Pose/Pose2.JPG", active: false, completed: false },
    { letter: "O", image: "/Pose/Pose3.JPG", active: false, completed: false },
    { letter: "P", image: "/Pose/Pose4.JPG", active: false, completed: false },
    { letter: "Q", image: "/Pose/Pose5.JPG", active: false, completed: false },
    { letter: "R", image: "/Pose/Pose6.JPG", active: false, completed: false },
    { letter: "S", image: "/Pose/Pose7.JPG", active: false, completed: false },
    { letter: "T", image: "/Pose/Pose8.JPG", active: false, completed: false },
    { letter: "U", image: "/Pose/Pose9.JPG", active: false, completed: false },
    { letter: "V", image: "/Pose/Pose10.JPG", active: false, completed: false },
    { letter: "W", image: "/Pose/Pose11.JPG", active: false, completed: false },
    { letter: "X", image: "/Pose/Pose12.JPG", active: false, completed: false },
  ]);

  const [coordinates, setCoordinates] = useAtom(coordinatesAtom);
  const poseContainerRef = useRef(null);

  const handleChangeHeadCoordinates = async (testCoordinates) => {
    await changeHeadCoordiantes(testCoordinates);
  };

  useEffect(() => {
    console.log(user);
    console.log(prismaCoordinates);
    if (poseContainerRef.current) {
      const { width, height } =
        poseContainerRef.current.getBoundingClientRect();

      setCoordinates(() => {
        const newCoordinates = {
          head: { x: width / 2, y: height / 8 },
          torso: { x: width / 2, y: height / 2.75 },
          waist: { x: width / 2, y: height / 1.75 },

          leftForearm: { x: width / 4, y: height / 4 },
          leftHand: { x: width / 6, y: height / 9 },

          rightForearm: { x: width / 1.35, y: height / 4 },
          rightHand: { x: width / 1.25, y: height / 9 },

          leftKnee: { x: width / 4, y: height / 1.35 },
          leftFoot: { x: width / 6, y: height / 1.05 },

          rightKnee: { x: width / 1.35, y: height / 1.35 },
          rightFoot: { x: width / 1.25, y: height / 1.05 },
        };
        return newCoordinates;
      });
    }
  }, []);

  function gameStart(solutionOrder) {
    const solutionMap = solutionOrder.reduce((acc, letter, index) => {
      acc[letter] = index;
      return acc;
    }, {});

    console.log(solutionMap);

    setImageArray((prevImageArray) => {
      const sortedImageArray = [...prevImageArray].sort((a, b) => {
        return solutionMap[a.letter] - solutionMap[b.letter];
      });

      return sortedImageArray.map((pose, i) => {
        return i !== 0 ? { ...pose, active: false } : { ...pose, active: true };
      });
    });
  }

  function advanceGame() {
    console.log("advanceGame running");
    setImageArray((order) => {
      let activeLocation = order.findIndex((obj) => obj.active);
      return order.map((pose, i) => {
        if (i === activeLocation) {
          return { ...pose, active: false, completed: true };
        } else if (i === activeLocation + 1) {
          return { ...pose, active: true };
        } else {
          return { ...pose };
        }
      });
    });
  }

  useEffect(() => {
    const pusher = new Pusher("13e9bf6d55ba50bff774", {
      cluster: "us3",
    });

    const channel = pusher.subscribe("pose-mirror");

    // Named handler functions
    const handleCorrectPose = () => {
      console.log("channel bind works");
      advanceGame();
    };

    const handleGameStart = (solutionOrder) => {
      console.log("newSolutionOrder", solutionOrder.solutionOrder);
      gameStart(solutionOrder.solutionOrder);
    };

    // Bind events
    channel.bind("correct-pose", handleCorrectPose);
    channel.bind("game-start", handleGameStart);

    // Cleanup function
    return () => {
      channel.unbind("correct-pose", handleCorrectPose);
      channel.unbind("game-start", handleGameStart);
      pusher.unsubscribe("pose-mirror");
    };
  }, []); // Empty dependency array ensures this effect runs only once

  function testChange() {
    console.log("testChange");
    handleChangeHeadCoordinates({ head: { x: 6969, y: 420 } });
  }

  return (
    <div className="flex h-[calc(100%-48px)] flex-col items-center justify-evenly lg:flex-row">
      <PoseOrder imageArray={imageArray} />
      <button onClick={() => testChange()}>test</button>
      <div className="flex h-full w-[48%] items-center justify-center lg:h-[calc(100vh-60px)]">
        <div
          ref={poseContainerRef}
          className="relative mb-5 flex h-[calc(156px*4)] w-[95%] flex-col border-2 border-neutral-800 lg:mb-0 lg:w-[calc(108px*4)]"
        >
          <BodyPartConnectors />
          <BodyPartDisplay />
        </div>
      </div>
    </div>
  );
}
