import { useLoader } from "@react-three/fiber"
import { useMemo } from "react"
import { Object3D } from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js"

const DEFAULT_HAND_PROFILE_PATH =
  "https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles/generic-hand/"

/**
 * Loads the 3D hand model from the webxr-input-profiles assets.
 * Suspends rendering until the models have been loaded.
 */
export function useHandModel(handedness: XRHandedness) {
  const gltf = useLoader(GLTFLoader, `${handedness}.glb`, (loader) => {
    loader.setPath(DEFAULT_HAND_PROFILE_PATH)
  })
  // Adjust the models as needed when they're first loaded
  const object = useMemo(() => {
    // Clone it here so when its added to the scene it's not implicitly
    // removed from the gltf scene.
    const object = SkeletonUtils.clone(gltf.scene.children[0])
    const mesh = object.getObjectByProperty("type", "SkinnedMesh")!
    mesh.frustumCulled = false
    mesh.castShadow = true
    mesh.receiveShadow = true
    return object
  }, [gltf])

  // Do a lookup once here at initialization making a data structure to go from
  // joint name to its corresponding Object3D
  const bones = useMemo(() => {
    const boneObjects = new Map<XRHandJoint, Object3D | undefined>()
    for (const name of joints) {
      const bone = object.getObjectByName(name)
      if (!bone) {
        console.warn(`Couldn't find bone '${name}' in ${handedness} hand mesh`)
      }
      boneObjects.set(name, bone)
    }
    return boneObjects
  }, [handedness, object])
  return { object, bones }
}

const joints = [
  "wrist",
  "thumb-metacarpal",
  "thumb-phalanx-proximal",
  "thumb-phalanx-distal",
  "thumb-tip",
  "index-finger-metacarpal",
  "index-finger-phalanx-proximal",
  "index-finger-phalanx-intermediate",
  "index-finger-phalanx-distal",
  "index-finger-tip",
  "middle-finger-metacarpal",
  "middle-finger-phalanx-proximal",
  "middle-finger-phalanx-intermediate",
  "middle-finger-phalanx-distal",
  "middle-finger-tip",
  "ring-finger-metacarpal",
  "ring-finger-phalanx-proximal",
  "ring-finger-phalanx-intermediate",
  "ring-finger-phalanx-distal",
  "ring-finger-tip",
  "pinky-finger-metacarpal",
  "pinky-finger-phalanx-proximal",
  "pinky-finger-phalanx-intermediate",
  "pinky-finger-phalanx-distal",
  "pinky-finger-tip",
] as XRHandJoint[]
