import { InitPostgresOptions, initPostgres } from "./postgresql"

export interface InitDataSourcesOptions {
    postgres?: InitPostgresOptions;
}   

let dbInstance: void;
export const initDataSources = async ({ postgres }: InitDataSourcesOptions) => {
    if(postgres){
        const db = await initPostgres(postgres);
        dbInstance = db;
    }
}


export default dbInstance;