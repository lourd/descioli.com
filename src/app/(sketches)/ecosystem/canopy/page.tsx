import { EcosystemLightId, EcosystemVariables } from "../ecosystem-enums"
import { Light } from "../light"

export default function AquariumPage() {
  return (
    <Light
      id={EcosystemLightId.Canopy}
      variable={EcosystemVariables.CanopyLight}
    />
  )
}
