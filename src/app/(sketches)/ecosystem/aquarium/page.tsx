import { EcosystemLightId, EcosystemVariables } from "../ecosystem-enums"
import { Light } from "../light"

export default function AquariumPage() {
  return (
    <Light
      id={EcosystemLightId.Aquarium}
      variable={EcosystemVariables.AquariumLight}
    />
  )
}
