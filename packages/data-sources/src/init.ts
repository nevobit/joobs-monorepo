import { InitPgsqlOptions, initPostgresql } from "./postgresql"

export interface InitDataSourcesOptions {
    postgres?: InitPgsqlOptions;
}   

let dbInstance: void;

export const initDataSources = async ({ postgres }: InitDataSourcesOptions) => {
    if(postgres){
        const db = await initPostgresql(postgres);
        dbInstance = db;
    }
}

export default dbInstance;