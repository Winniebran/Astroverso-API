import { app } from "./app";
import dataSourceConfig from "./data-source";

(async () => {
  await dataSourceConfig.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`App is running on https://localhost:${PORT}`);
  });
})();
