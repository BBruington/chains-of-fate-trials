import Image from "next/image";

interface Props {
  i: string;
}

export default function PoseImage(props: Props) {
  const { i } = props;
  return (
    <Image
      src={`/Pose${i}.JPG`}
      alt={`Pose ${i}`}
      width={90.406}
      height={116}
    />
  );
}
