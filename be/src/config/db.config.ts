import { SqlServerConnectionOptions } from "typeorm/driver/sqlserver/SqlServerConnectionOptions";

export const ssmsconfig: SqlServerConnectionOptions = {
    url: process.env.URL,
    type: 'mssql'
    // port: +(process.env.PORT || 5432)
}