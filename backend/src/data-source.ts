import { DataSource } from "typeorm"


export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database/contact.sqlite",
    synchronize: true,
    logging: false,
    entities: ["src/entities/*{.js,.ts}"],
    migrations: [],
    subscribers: [],
})
