import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["./src/index.ts"], // Entry file
    bundle: true, // Bundle all imports into one file
    outfile: "./dist/bundle.js", // Output file
    platform: "node", // 'node' for Node.js, 'browser' for web
    target: "es2020", // Target JavaScript version
    sourcemap: true, // Generate source maps
    tsconfig: "./tsconfig.json", // Optional: Path to your tsconfig.json
  })
  .then(() => {
    console.log("Build completed successfully!");
  })
  .catch(() => process.exit(1));
