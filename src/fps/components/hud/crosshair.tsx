import Image from "next/image";

export function Crosshair() {

  // TODO: add some alternative crosshairs
  return (
    <Image
      src="/ui/crosshair.png"
      alt="crosshair"
      width="20"
      height="20"
      priority
    />
  );
}
