import { DndContext } from "@dnd-kit/core";
import Image from "next/image";
import { useState } from "react";
import ColorSelect from "./color-select";
import Draggable from "./draggable";
import Droppable from "./droppable";

export default function PoseList() {
  const [containers, setContainers] = useState([
    { name: "A", image: null },
    { name: "B", image: null },
    { name: "C", image: null },
    { name: "D", image: null },
    { name: "E", image: null },
    { name: "F", image: null },
    { name: "G", image: null },
    { name: "H", image: null },
    { name: "I", image: null },
    { name: "J", image: null },
    { name: "K", image: null },
    { name: "L", image: null },
    { name: "M", image: "/Pose/Pose1.JPG" },
    { name: "N", image: "/Pose/Pose2.JPG" },
    { name: "O", image: "/Pose/Pose3.JPG" },
    { name: "P", image: "/Pose/Pose4.JPG" },
    { name: "Q", image: "/Pose/Pose5.JPG" },
    { name: "R", image: "/Pose/Pose6.JPG" },
    { name: "S", image: "/Pose/Pose7.JPG" },
    { name: "T", image: "/Pose/Pose8.JPG" },
    { name: "U", image: "/Pose/Pose9.JPG" },
    { name: "V", image: "/Pose/Pose10.JPG" },
    { name: "W", image: "/Pose/Pose11.JPG" },
    { name: "X", image: "/Pose/Pose12.JPG" },
  ]);

  const [showColorSelect, setShowColorSelect] = useState(false);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log(active);
    console.log(over);
    if (over) {
      const firstLocation = containers.findIndex(
        (container) => container.name === active.id
      );
      const secondLocation = containers.findIndex(
        (container) => container.name === over.id
      );

      console.log("first location is ", firstLocation);
      console.log("second location is ", secondLocation);

      const updatedContainers = [...containers];

      [updatedContainers[firstLocation], updatedContainers[secondLocation]] = [
        updatedContainers[secondLocation],
        updatedContainers[firstLocation],
      ];

      setContainers(updatedContainers);
      console.log(containers);
    }
  };

  return (
    <div className="h-full w-full flex justify-around items-center flex-col">
      {showColorSelect ? (
        <ColorSelect></ColorSelect>
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <div className="h-1/2 w-full items-center flex justify-around">
            {containers.map((id, index) => {
              return index <= (containers.length - 1) / 2 ? (
                <Droppable key={id.name} id={id.name}>
                  <div className="h-40 w-28 border-2 border-black">
                    <Draggable id={id.name}>
                      {id.image ? (
                        <Image
                          alt={`${id.image}`}
                          src={`${id.image}`}
                          fill
                          sizes="90.406px"
                          style={{ objectFit: "cover" }}
                        />
                      ) : null}
                    </Draggable>
                  </div>
                </Droppable>
              ) : null;
            })}
          </div>

          <div className="h-1/2 w-full flex justify-around items-center">
            {containers.map((id, index) => {
              return index >= containers.length / 2 ? (
                <Droppable key={id.name} id={id.name}>
                  <div className="h-40 w-28 border-2 border-black">
                    <Draggable id={id.name}>
                      {id.image ? (
                        <Image
                          alt={`${id.image}`}
                          src={`${id.image}`}
                          fill
                          sizes="90.406px"
                          style={{ objectFit: "cover" }}
                        />
                      ) : null}
                      {/* <Image
                        alt={`Pose${imageArray[index]}.JPG`}
                        src={`/Pose/Pose${imageArray[index - 12]}.JPG`}
                        fill
                        sizes="90.406px"
                        style={{ objectFit: "cover" }}
                      /> */}
                    </Draggable>
                  </div>
                </Droppable>
              ) : null;
            })}
          </div>
        </DndContext>
      )}
    </div>
  );
}
