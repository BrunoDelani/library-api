import { CONNECTION_DB, CONNECTION_HOST, CONNECTION_PASSWORD, CONNECTION_PORT, CONNECTION_USERNAME } from "src/config/environment.config";
import { DataSource } from "typeorm";

const dataSource = new DataSource({
    type: "mysql",
    host: CONNECTION_HOST,
    port: CONNECTION_PORT,
    username: CONNECTION_USERNAME,
    password: CONNECTION_PASSWORD,
    database: CONNECTION_DB,
    entities: ['./dist/core/typeorm/entities/*.entity.{js,ts}'],
    synchronize: true,
    migrationsRun: true,
    migrations: ['./dist/core/typeorm/migrations/*.{js,ts}'],
})

dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

export default dataSource;