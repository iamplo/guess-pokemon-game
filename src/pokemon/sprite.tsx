import { useEffect, useState } from "react";
import { Status } from "./types";

type Props = { appState: Status; sprite: string };

function Sprite({ appState, sprite }: Props) {
  const [style, setStyle] = useState("");

  useEffect(() => {
    if (appState === "END") {
      setStyle("true");
    }
  }, [appState]);

  return (
    <div className="sprite">
      <img data-visible={style} className={`sprite__image`} src={sprite} />
    </div>
  );
}
export default Sprite;
