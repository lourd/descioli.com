import { EcosystemLightId, EcosystemVariables } from "../ecosystem-enums"
import { Light } from "../light"

export default function CanopyPage() {
  return (
    <Light
      path="/ecosystem/canopy"
      id={EcosystemLightId.Canopy}
      variable={EcosystemVariables.CanopyLight}
    />
  )
}
