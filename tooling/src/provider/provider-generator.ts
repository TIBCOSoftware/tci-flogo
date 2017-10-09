import {
    IContribProviderGenerator, IContribProviderMetadata, IProviderMetaData, Template,
    TEMPLATE_TYPE, TEMPLATE_TYPE_SUFFIX
} from "wi-studio/app/cli/template";
import * as fs from "fs";
import * as path from "path";
import * as ProgressBar from "progress";
import {ServiceTemplate, ValueTemplate, ValidationTemplate, ActionTemplate} from "wi-studio/app/cli"
import {CLIUtils} from "../utils/cli-utils";

export class ContribProviderGenerator implements IContribProviderGenerator {

    providersList: any;
    constructor(private outputFolder: string, private progressBar: ProgressBar) {
        this.providersList = {};
    }

    getProgressBar(): ProgressBar {
        return this.progressBar;
    }
    getOutputFolder(): string {
        return this.outputFolder;
    }

    private getValueProviders(contribProvider: IContribProviderMetadata): { string: string }[] {

        let services: { string: string }[] = <{ string: string }[]>[];
        let values: { string: IProviderMetaData }[] = contribProvider.values;
        values.forEach(fieldentry => {
            for (let field in fieldentry) {
                if (fieldentry.hasOwnProperty(field)) {
                    let pmdata: IProviderMetaData = fieldentry[field];
                    let fobj = <{ string: string }>{};
                    let psvc = pmdata.name;
                    fobj[psvc] = psvc;
                    services.push(fobj);
                }
            }
        });
        return services;
    }

    private getValidationProviders(contribProvider: IContribProviderMetadata): { string: string }[] {

        let services: { string: string }[] = <{ string: string }[]>[];
        let validations: { string: IProviderMetaData }[] = contribProvider.validation;
        validations.forEach(fieldentry => {
            for (let field in fieldentry) {
                if (fieldentry.hasOwnProperty(field)) {
                    let pmdata: IProviderMetaData = fieldentry[field];
                    let fobj = <{ string: string }>{};
                    let psvc = pmdata.name;
                    fobj[psvc] = psvc;
                    services.push(fobj);
                }
            }
        });

        return services;
    }

    private getActionProviders(contribProvider: IContribProviderMetadata): { string: string }[] {

        let services: { string: string }[] = <{ string: string }[]>[];
        let actions: { string: IProviderMetaData }[] = contribProvider.action;
        actions.forEach(fieldentry => {
            for (let field in fieldentry) {
                if (fieldentry.hasOwnProperty(field)) {
                    let pmdata: IProviderMetaData = fieldentry[field];
                    let fobj = <{ string: string }>{};
                    let psvc = pmdata.name;
                    fobj[psvc] = psvc;
                    services.push(fobj);
                }
            }
        });
        return services;
    }

    generate(metadata: IContribProviderMetadata): void {
        // do
        let serviceName = `${metadata.name}${TEMPLATE_TYPE_SUFFIX.get(TEMPLATE_TYPE.Service)}`;
        let serviceProviderPath = path.resolve(this.getOutputFolder(), `${serviceName}.ts`);
        let serviceContent = ``;
        let serviceImports: string[] = <string[]>[];
        let serviceTemplate: ServiceTemplate = new ServiceTemplate();

            serviceTemplate.name = serviceName;
            serviceTemplate.serviceImports = serviceImports;
            serviceTemplate.valueProviders = this.getValueProviders(metadata);
            serviceTemplate.validationProviders = this.getValidationProviders(metadata);
            serviceTemplate.actionProviders = this.getActionProviders(metadata);

        metadata.values.forEach(entry => {
            for (let key in entry) {
                if (entry.hasOwnProperty(key)) {
                    let valueTemplateName = `${key}${TEMPLATE_TYPE_SUFFIX.get(TEMPLATE_TYPE.Value)}`;
                    let valueTemplatePath = path.resolve(this.getOutputFolder(), `${valueTemplateName}.ts`);
                    let valueTemplate: ValueTemplate = new ValueTemplate();
                    valueTemplate.name = valueTemplateName;
                    serviceImports.push(`import {${valueTemplateName}} from \"./${valueTemplateName}\";`);
                    if (!CLIUtils.isExist(valueTemplatePath)) {
                        this.providersList.value = valueTemplateName;
                        fs.writeFileSync(valueTemplatePath, valueTemplate.generate());
                    }
                }
            }
        });
        metadata.validation.forEach(entry => {
            for (let key in entry) {
                if (entry.hasOwnProperty(key)) {
                    let validationTemplateName = `${key}${TEMPLATE_TYPE_SUFFIX.get(TEMPLATE_TYPE.Validation)}`;
                    let validationTemplatePath = path.resolve(this.getOutputFolder(), `${validationTemplateName}.ts`);
                    let validationTemplate: ValidationTemplate = new ValidationTemplate();
                    validationTemplate.name = `${key}${TEMPLATE_TYPE_SUFFIX.get(TEMPLATE_TYPE.Validation)}`;
                    serviceImports.push(`import {${validationTemplateName}} from \"./${validationTemplateName}\";`);
                    if (!CLIUtils.isExist(validationTemplatePath)) {
                        this.providersList.validation = validationTemplateName;
                        fs.writeFileSync(validationTemplatePath, validationTemplate.generate());
                    }
                }
            }
        });
        metadata.action.forEach(entry => {
            for (let key in entry) {
                if (entry.hasOwnProperty(key)) {
                    let actionTemplateName = `${key}${TEMPLATE_TYPE_SUFFIX.get(TEMPLATE_TYPE.Action)}`;
                    let actionTemplatePath = path.resolve(this.getOutputFolder(), `${actionTemplateName}.ts`);
                    let actionTemplate: ActionTemplate = new ActionTemplate();
                    actionTemplate.name = `${key}${TEMPLATE_TYPE_SUFFIX.get(TEMPLATE_TYPE.Action)}`;
                    serviceImports.push(`import {${actionTemplateName}} from \"./${actionTemplateName}\";`);
                    if (!CLIUtils.isExist(actionTemplatePath)) {
                        this.providersList.action = actionTemplateName;
                        fs.writeFileSync(actionTemplatePath, actionTemplate.generate());
                    }
                }
            }
        });
        serviceContent = `${serviceTemplate.generate()}`;
        if (!CLIUtils.isExist(serviceProviderPath)) {
            this.providersList.metadata = serviceName;
        }
        fs.writeFileSync(serviceProviderPath, serviceContent);

        // return this.makeChanges(metadata);
    }
}
