import NeutralinoApp from "node-neutralino"

async function main() {
  const app = new NeutralinoApp({
    url: "/",
    windowOptions: {
      enableInspector: false,
      frontendLibrary: {
        patchFile: "/react-src/index.html",
        devUrl: "http://localhost:3000",
        devCommand: "npm run dev",
        projectPath: "/react-src/",
        resourcesPath: "/react-src/build/",
        documentRoot: "/react-src/build/",
      }
    }
  })

  app.init();
}

main();