import { MongoClient } from "mongodb";
import { Application } from "./declarations";

export default function (app: Application) {
  const settings = app.get("mongodb");
  const x = "doing some logging";
  console.log(x,settings.host, settings.port, settings.db, settings.user, settings.password);
  const connection = 'mongodb://${settings.user}:${settings.password}@${settings.host}:${settings.port}/${settings.db}';
  const database = connection.substr(connection.lastIndexOf("/") + 1);
   console.log("this is the db " , database);
   console.log("this is the connection " , connection);
  const mongoClient = MongoClient.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((client) => client.db(database)).catch(err => {
     console.log('DB Connection Error: ' + err);
});

  app.set("mongoClient", mongoClient);
   console.log("Mongo client is set");
}
