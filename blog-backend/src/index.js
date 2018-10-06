require("dotenv").config();

const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const session = require("koa-session");
const cors = require("./lib/cors");

const serve = require("koa-static");
const mount = require("koa-mount");

const path = require("path");
const uploadDirPath = "/uploads";

const staticPath = path.join(__dirname, "../../blog-frontend/build");

const api = require("./api");
const ssr = require("./ssr");

const mongoose = require("mongoose");

const {
  PORT: port = 4000,
  MONGO_URI: mongoURI,
  COOKIE_SIGN_KEY: signKey
} = process.env;

mongoose.Promise = global.Promise;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("connected to mongo db");
  })
  .catch(e => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

router.use("/api", api.routes());
router.get("/", ssr);

app.use(cors);
app.use(bodyParser());
app.use(mount("/seo", serve(path.join(__dirname + uploadDirPath))));

const sessionConfig = {
  maxAge: 1000 * 60 * 60 * 24
};

app.use(session(sessionConfig, app));
app.keys = [signKey];

app.use(router.routes()).use(router.allowedMethods());

app.use(serve(staticPath));
app.use(ssr);

app.listen(port, () => {
  console.log("app is listening port", port);
});
