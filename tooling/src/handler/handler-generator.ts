import * as ProgressBar from "progress";
import {HandlerTemplate } from "wi-studio/app/cli"
import {Template, IContribHandlerGenerator, IContribHandlerMetaData, TEMPLATE_TYPE, TEMPLATE_TYPE_SUFFIX } from "wi-studio/app/cli/template"
import * as path from "path";
import * as fs from "fs";
import {CLIUtils} from "../utils/cli-utils";

export class ContribHandlerGenerator implements IContribHandlerGenerator {
    constructor(private outputFolder: string, private progressBar: ProgressBar) {
    }

    getProgressBar(): ProgressBar {
        return this.progressBar;
    }

    generate(metadata: IContribHandlerMetaData): void {
        // do
        let serviceName = `${metadata.name}${TEMPLATE_TYPE_SUFFIX.get(TEMPLATE_TYPE.Handler)}`;
        let serviceHandlerPath = path.resolve(this.getOutputFolder(), `${serviceName}.ts`);
        let template: HandlerTemplate = new HandlerTemplate();
        template.name = serviceName;
        let serviceContent = `${template.generate()}`;
        if (!CLIUtils.isExist(serviceHandlerPath)) {
            fs.writeFileSync(serviceHandlerPath, serviceContent);
            let moduleClassPath = path.resolve(this.getOutputFolder(), `${metadata.name}${TEMPLATE_TYPE_SUFFIX.get(TEMPLATE_TYPE.ModuleFile)}.ts`);
            // return Observable.fromPromise(cli.addProviderToModule(moduleClassPath, serviceName, "./" + serviceName)
            //     .then(change => change.apply(cli.NodeHost)));
        }
        // return Observable.fromPromise(Promise.resolve());
    }

    private getOutputFolder() {
        return this.outputFolder;
    }
}
