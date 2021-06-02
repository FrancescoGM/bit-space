declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_FOOTBALL_KEY: string
      FAUNADB_KEY: string
    }
  }
}
export {}
