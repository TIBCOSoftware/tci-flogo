/**
 * Created by pdhar on 7/31/17.
 */
import {strEnum, jsonToMap} from "./types";
import * as ProgressBar from "progress";
import {ModuleTemplate, TsConfigTemplate, TsLintTemplate, PkgJsonTemplate} from "wi-studio/app/cli";
import {ContribHandlerGenerator} from "./handler/handler-generator";
import {ContribProviderGenerator} from "./provider/provider-generator";
import * as fs from "fs-extra";
import * as path from "path";
import {CLIUtils} from "./utils/cli-utils";
import { IContribGenerator,
        IContribModuleMetaData,
        TEMPLATE_TYPE_SUFFIX,
        TEMPLATE_TYPE, 
        WI_SERVICE_CONTRIBUTION,
        IContribHandlerGenerator,
        IContribServiceMetaData,
        GENERATOR_TYPE,
        IContribProviderMetadata,
        IProviderMetaData,
        IContribInitMetaData,
        PACKAGE_JSON,
        TSCONFIG_JSON,
        TSLINT_JSON,
        IContribCategoryMetaData,
        WI_CLI_JSON,
        IContribServiceGenerator} from "wi-studio/app/cli/template";

export interface IContribServiceProgressGenerator<T> extends IContribServiceGenerator<T>{
    getProgressBar(): ProgressBar
}
export class ContribCodeGenerator implements IContribGenerator<IContribModuleMetaData> {

    constructor(private outputfolder: string, private progressBar: ProgressBar) {
    }

    getOutputFolder(): string {
        return this.outputfolder;
    }

    getProgressBar(): ProgressBar {
        return this.progressBar;
    }

    generate(metadata: IContribModuleMetaData): void {
        if (metadata) {
            let moduleTemplate: ModuleTemplate = new ModuleTemplate();

            moduleTemplate.name = `${metadata.name}${TEMPLATE_TYPE_SUFFIX.get(TEMPLATE_TYPE.Module)}`;
            moduleTemplate.imports = metadata.imports;
            moduleTemplate.services = this.getServices(metadata);

            let moduleClassPath = path.resolve(this.getOutputFolder(), `${metadata.name}${TEMPLATE_TYPE_SUFFIX.get(TEMPLATE_TYPE.ModuleFile)}.ts`);
            // if (!CLIUtils.isExist(moduleClassPath)) {
            fs.writeFileSync(moduleClassPath, moduleTemplate.generate(), {encoding: "utf8"});
            this.getProgressBar().tick(10);
            // }

            let found: boolean = false;
            let entry = metadata.services[0];
            if (entry && entry.hasOwnProperty(WI_SERVICE_CONTRIBUTION) && entry[WI_SERVICE_CONTRIBUTION] && !found) {
                found = true;
                let generator: IContribHandlerGenerator = null;
                let wiService: IContribServiceMetaData = entry[WI_SERVICE_CONTRIBUTION];
                if (wiService.type === GENERATOR_TYPE.handler) {
                    generator = new ContribHandlerGenerator(this.getOutputFolder(), this.getProgressBar());
                } else if (wiService.type === GENERATOR_TYPE.provider) {
                    generator = new ContribProviderGenerator(this.getOutputFolder(), this.getProgressBar());
                }
                generator.generate(wiService);
            }
        }
    }

    private getServices(metadata: IContribModuleMetaData): { string: string }[] {
        let services: { string: string }[] = <{ string: string }[]>[];
        metadata.services.forEach(entry => {
            if (entry.hasOwnProperty(WI_SERVICE_CONTRIBUTION)) {
                let contrib: IContribServiceMetaData = entry[WI_SERVICE_CONTRIBUTION];
                let obj = <{ string: string }>{};
                if (contrib.type === GENERATOR_TYPE.handler) {
                    obj[WI_SERVICE_CONTRIBUTION] = `${metadata.name}${TEMPLATE_TYPE_SUFFIX.get(TEMPLATE_TYPE.Handler)}`;
                } else if (contrib.type === GENERATOR_TYPE.provider) {
                    obj[WI_SERVICE_CONTRIBUTION] = `${metadata.name}${TEMPLATE_TYPE_SUFFIX.get(TEMPLATE_TYPE.Service)}`;
                }
                services.push(obj);
                if (contrib.type === GENERATOR_TYPE.provider) {
                    let contribProvider: IContribProviderMetadata = <IContribProviderMetadata> contrib;
                    let values: { string: IProviderMetaData }[] = contribProvider.values;
                    values.forEach(fieldentry => {
                        for (let field in fieldentry) {
                            if (fieldentry.hasOwnProperty(field)) {
                                let pmdata: IProviderMetaData = fieldentry[field];
                                let fobj = <{ string: string }>{};
                                let psvc = `${field}${TEMPLATE_TYPE_SUFFIX.get(TEMPLATE_TYPE.Value)}`;
                                fobj[psvc] = psvc;
                                services.push(fobj);
                            }
                        }
                    });
                    let validations: { string: IProviderMetaData }[] = contribProvider.validation;
                    validations.forEach(fieldentry => {
                        for (let field in fieldentry) {
                            if (fieldentry.hasOwnProperty(field)) {
                                let pmdata: IProviderMetaData = fieldentry[field];
                                let fobj = <{ string: string }>{};
                                let psvc = `${field}${TEMPLATE_TYPE_SUFFIX.get(TEMPLATE_TYPE.Validation)}`;
                                fobj[psvc] = psvc;
                                services.push(fobj);
                            }
                        }
                    });
                    let actions: { string: IProviderMetaData }[] = contribProvider.action;
                    actions.forEach(fieldentry => {
                        for (let field in fieldentry) {
                            if (fieldentry.hasOwnProperty(field)) {
                                let pmdata: IProviderMetaData = fieldentry[field];
                                let fobj = <{ string: string }>{};
                                let psvc = `${field}${TEMPLATE_TYPE_SUFFIX.get(TEMPLATE_TYPE.Action)}`;
                                fobj[psvc] = psvc;
                                services.push(fobj);
                            }
                        }
                    });
                }

            }
        });
        return services;
    }
}

export class ContribInitGenerator implements IContribGenerator<IContribInitMetaData> {
    constructor(private outputfolder: string, private progressBar: ProgressBar) {
    }

    getOutputFolder(): string {
        return this.outputfolder;
    }

    getProgressBar(): ProgressBar {
        return this.progressBar;
    }

    getPackageJSON(sdkPath: string): any {
        let pkgJSONPath = path.resolve(sdkPath, "package.json");
        let pkgjson = require(pkgJSONPath);
        delete pkgjson.dependencies["wi-mapper-parser"];
        return pkgjson;
    }

    getDependencies(sdkPath: string): any {
        let deps = {};
        let pkgjson = this.getPackageJSON(sdkPath);
        if (pkgjson.dependencies) {
            for (let key in pkgjson.dependencies) {
                if (key) {
                    deps[key] = pkgjson.dependencies[key];
                }
            }
        }
        return deps;
    }

    getDevDependencies(sdkPath: string): any {
        let deps = {};
        let pkgjson = this.getPackageJSON(sdkPath);
        if (pkgjson.devDependencies) {
            for (let key in pkgjson.devDependencies) {
                if (key) {
                    deps[key] = pkgjson.devDependencies[key];
                }
            }
        }
        return deps;
    }


    generate(metadata: IContribInitMetaData): void {
        let pkgTemplate: PkgJsonTemplate = new PkgJsonTemplate();
        pkgTemplate.name = metadata.name;
        pkgTemplate.sdkPath = metadata.sdkpath;
        pkgTemplate.dependencies = this.getDependencies(metadata.sdkpath);
        pkgTemplate.devDependencies = this.getDevDependencies(metadata.sdkpath)
        let pkgjsonPath = path.resolve(this.getOutputFolder(), PACKAGE_JSON);
        if (fs.existsSync(pkgjsonPath)) {
            fs.truncateSync(pkgjsonPath);
        }
        fs.writeJsonSync(pkgjsonPath, JSON.parse(pkgTemplate.generate()), {spaces: 4});

        var exec = require('child_process').exec;
        exec('npm install', {
            cwd: process.cwd()
        }, function(error, stdout, stderr) {
            console.log(stdout);
            console.error(stderr);
        });
        this.getProgressBar().tick(10);
        let tsconfigTemplate = new TsConfigTemplate();
        let tsconfigJsonPath = path.resolve(this.getOutputFolder(), TSCONFIG_JSON);
        fs.writeFileSync(tsconfigJsonPath, tsconfigTemplate.generate());
        this.getProgressBar().tick(10);
        let tslintTemplate = new TsLintTemplate();
        let tslintJsonPath = path.resolve(this.getOutputFolder(), TSLINT_JSON);
        fs.writeFileSync(tslintJsonPath, tslintTemplate.generate());
        this.getProgressBar().tick(10);
        let wis: IContribCategoryMetaData = {
            name: metadata.name,
            contributions: <{string: IContribModuleMetaData}>{}
        };

        let wicliJsonPath = path.resolve(this.getOutputFolder(), WI_CLI_JSON);
        fs.writeJsonSync(wicliJsonPath, wis, {spaces: 4});
        
    }
}

