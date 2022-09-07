/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_PATH: string
  readonly VITE_APP_DATABASE_URL: string
  readonly VITE_APP_STATIC_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '@danielblagy/three-mmi';
declare module 'three/build/three.module.js';
declare module '*.vue' {
  import type {DefineComponent} from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
