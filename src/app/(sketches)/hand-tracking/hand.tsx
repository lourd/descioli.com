import { useFrame } from "@react-three/fiber"
import { XRHandSpace } from "three"

import { useHandModel } from "./use-hand-model"

interface HandProps {
  hand: XRHand
  space: XRHandSpace
  handedness: XRHandedness
}

export function Hand({ hand, space, handedness }: HandProps) {
  const { object, bones } = useHandModel(handedness)

  useFrame(() => {
    for (const [jointName] of hand) {
      const bone = bones.get(jointName)
      const joint = space.joints[jointName]
      if (bone && joint) {
        bone.position.copy(joint.position)
        bone.quaternion.copy(joint.quaternion)
      }
    }
  })

  return <primitive object={object} />
}
