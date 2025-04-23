/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_REALTIME_DATABASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
