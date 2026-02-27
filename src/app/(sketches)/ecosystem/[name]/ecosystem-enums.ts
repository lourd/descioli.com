export const enum EcosystemFunctions {
  MuxFunction = "muxFunction",
  SetLight = "setLight",
  SetPump = "setPump",
  SetFan = "setFan",
}

export const enum EcosystemVariables {
  GroveSystem = "groveSystem",
  Sensors = "sensors",
  Energy = "energy",
  CanopyLight = "light0",
  SeedlingTrayLight = "light1",
  AquariumLight = "light2",
  Pump = "pump0",
  Fan = "fan0",
}

export enum EcosystemLightId {
  Canopy = 0,
  SeedlingTray = 1,
  Aquarium = 2,
  All = "a",
}

export type LightVariable =
  | EcosystemVariables.CanopyLight
  | EcosystemVariables.AquariumLight
  | EcosystemVariables.SeedlingTrayLight

export type EcosystemLamp = {
  variable: LightVariable
  id: EcosystemLightId
}

export const CanopyLamp: EcosystemLamp = {
  variable: EcosystemVariables.CanopyLight,
  id: EcosystemLightId.Canopy,
}

export const AquariumLamp: EcosystemLamp = {
  variable: EcosystemVariables.AquariumLight,
  id: EcosystemLightId.Aquarium,
}

export const SeedlingTrayLamp: EcosystemLamp = {
  variable: EcosystemVariables.SeedlingTrayLight,
  id: EcosystemLightId.SeedlingTray,
}

export enum FadeType {
  /** Efficient but ugly at bottom */
  LINEAR = 0,
  /** DEFAULT - Clean and fairly linear to eye */
  CUBIC_EASE_IN_OUT = 1,
  /** Very slow at beginning and end. */
  QUINTIC_EASE_IN_OUT = 2,
}
