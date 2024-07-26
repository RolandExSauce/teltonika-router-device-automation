// src/custom-types/vite-plugin-svgr.d.ts
declare module 'vite-plugin-svgr/client' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content: any; // Use a more specific type if known
    export default content;
  }
  