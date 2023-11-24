interface IConfig {
  apiEndpoint: string
}
export const CONFIG: IConfig = {
  apiEndpoint: process.env.apiEndpoint || '',
}
