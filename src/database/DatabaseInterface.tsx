export interface ResolveFunc {
  (value: unknown): void;
}

export interface RejectFunc {
  (value?: any): void;
}

export interface ExecutorFunction {
  (resolve: ResolveFunc, reject: RejectFunc): void; 
}

export abstract class Database {
  // The executor for downloading the database. Same interface as a Promise executor.
  abstract dbDownloadExecutor(resolve: ResolveFunc, reject: RejectFunc): void; 

  // The main method: used to get the data from the database, always as a promise
  getData(): Promise<unknown> {
    if (this.data_cache && (this.cache_birthday + this.cache_duration) > Date.now()) {
      return new Promise(this.data_cache);
    } else {
      return new Promise(this.dbCacheDownloader(this.dbDownloadExecutor));
    }
  }

  protected data_cache: any; // The data that's been downloaded, should be an object array
  protected cache_birthday: number = 0; // The time that the data cache was downloaded
  protected cache_duration: number = 60_000; // How long the data cache should last before being downloaded again.

  // A wrapper for the child class's download executor that handle cache info
  private dbCacheDownloader(exec: ExecutorFunction): ExecutorFunction {
    return (resolve: ResolveFunc, reject: RejectFunc) => {
      // If the download succeeds, overwrite the download time (birthday)
      let new_resolve = (value: unknown) => {
        this.cache_birthday = Date.now();
        resolve(value);
      }
      exec(new_resolve, reject);
    }
  }

}