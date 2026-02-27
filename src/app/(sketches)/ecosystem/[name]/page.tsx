import { EcosystemLightId, EcosystemVariables } from "./ecosystem-enums"
import { Light } from "./light"

export default async function EcoPage(props: PageProps<"/ecosystem/[name]">) {
  const params = await props.params
  return (
    <Light
      path={`/ecosystem/${params.name}`}
      name={params.name}
      id={EcosystemLightId.Canopy}
      variable={EcosystemVariables.CanopyLight}
    />
  )
}
