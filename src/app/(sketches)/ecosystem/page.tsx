import { EcosystemLightId, EcosystemVariables } from "./ecosystem-enums"
import { Light } from "./light"

export default function EcoPage() {
  return (
    <Light
      path="/ecosystem"
      id={EcosystemLightId.Canopy}
      variable={EcosystemVariables.CanopyLight}
    />
  )
}
