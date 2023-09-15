import { BaseModel } from "../../gencore/core/BaseModel";
import { BaseTemplate } from "../../gencore/core/BaseTemplate";
type GenerateOptions = 'search' | 'upsert' | 'export' | 'import'
export class JavaController extends BaseTemplate {
    constructor(model: BaseModel, options: GenerateOptions[]) {
        super(model);
    }
    
    doGenerate(): string {
        return ``;
    }
 }