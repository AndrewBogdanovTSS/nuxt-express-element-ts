declare module "*.vue" {
  import Vue from "vue"
  const _default: Vue
  export default _default
}

declare namespace NodeJS {
  export interface Process {
    client: boolean
    server: boolean
  }
}
