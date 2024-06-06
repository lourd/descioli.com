import { EcosystemLightId, EcosystemVariables } from "../ecosystem-enums"
import { Light } from "../light"

export default function AquariumPage() {
  return (
    <Light
      path="/ecosystem/aquarium"
      id={EcosystemLightId.Aquarium}
      variable={EcosystemVariables.AquariumLight}
    />
  )
}
