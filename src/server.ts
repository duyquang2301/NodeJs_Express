import { port } from "./config";
import { app } from "./app";

app.listen(port, () => {}).on("error", (e) => {});
