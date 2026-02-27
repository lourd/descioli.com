const API_URL = "https://api.particle.io"

type HttpStatusCode = 200 | 400 | 500

export type GetVariableResponse =
  | {
      body: {
        cmd: string
        name: string
        result: string
        device: string
        body: {
          device: string
          msg: Msg
        }
        coreInfo: CoreInfo
      }
      statusCode: 200
    }
  | {
      body: {
        error: string
        error_description: string
      }
      statusCode: Exclude<HttpStatusCode, 200>
    }

export type CallFunctionResponse = {
  body: {
    cmd: string
    name: string
    return_value: number
    device: string
    body: {
      device: string
      msg: Msg
    }
    coreInfo: CoreInfo
  }
  statusCode: number
}

export type Msg = {
  cmd: string
  name: string
}

export type CoreInfo = {
  name: string
  last_heard: Date
  connected: boolean
  last_handshake_at: Date
  deviceID: string
  product_id: number
}

export async function getVariable(params: {
  auth: string
  deviceId: string
  name: string
}): Promise<GetVariableResponse> {
  const response = await fetch(
    API_URL + `/v1/devices/${params.deviceId}/${params.name}`,
    { headers: { Authorization: `Bearer ${params.auth}` }, cache: "no-cache" }
  )
  return {
    body: await response.json(),
    statusCode: response.status as HttpStatusCode,
  }
}

export async function callFunction(params: {
  auth: string
  deviceId: string
  name: string
  argument: string
}): Promise<CallFunctionResponse> {
  const response = await fetch(
    API_URL + `/v1/devices/${params.deviceId}/${params.name}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${params.auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        arg: params.argument,
      }),
      cache: "no-cache",
    }
  )
  return {
    body: await response.json(),
    statusCode: response.status,
  }
}
