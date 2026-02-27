import { EcosystemLightId, EcosystemVariables } from "../ecosystem-enums"
import { Light } from "../light"

export default async function AquariumPage(
  props: PageProps<"/ecosystem/[name]/aquarium">
) {
  const params = await props.params
  return (
    <Light
      path={`/ecosystem/${params.name}/aquarium`}
      name={params.name}
      id={EcosystemLightId.Aquarium}
      variable={EcosystemVariables.AquariumLight}
    />
  )
}
