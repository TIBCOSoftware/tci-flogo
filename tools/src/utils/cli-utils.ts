import * as fs from "fs-extra";
/**
 * Created by sayinala on 10/02/17.
 */
export class CLIUtils {
    static isExist(path: string): boolean {
        return fs.existsSync(path);
    }
}
