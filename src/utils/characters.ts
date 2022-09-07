import {Character} from "@/types/Character";
import soldierImage from "@/assets/soldier.png"
import robotImage from "@/assets/robot.png"

export const characters: Character[] = [
  {
    name: "軍人",
    charPreview: soldierImage,
    charFilePath: "models/soldier.glb",
  },
  {
    name: "sample",
    charPreview: robotImage,
    charFilePath: "models/robot.glb",
  },
]
