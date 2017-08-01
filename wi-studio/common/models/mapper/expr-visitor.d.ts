export interface INode {
    accept(visitor: INodeVisitor): void;
}
export interface IPosition {
    offset: number;
    line: number;
    column: number;
}
export interface ILocation {
    start: Position;
    end: Position;
}
export interface INamedNode extends INode {
    getName(): string;
}
export interface IProgramNode extends INode {
    getBody(): any[];
}
export interface IExpressionStatementNode extends INode {
    getExpression(): any;
}
export interface IExpressionNode extends INamedNode {
    getExpression(): INode;
}
export interface IMemberExpressionNode extends IExpressionNode, ILocatable {
    getObject(): any;
    getProperty(): any;
    getMemberExpression(): string;
}
export interface ICallExpressionNode extends IExpressionNode {
    getCallee(): any;
    getArguments(): any;
}
export interface IIdentifierNode extends IExpressionNode {
}
export interface ILiteralNode extends IExpressionNode {
    getValue(): string;
}
export interface ILocatable {
    getLocation(): ILocation;
}
export declare abstract class BaseNode implements INode {
    private name;
    private location;
    constructor(name: string, location?: ILocation);
    getName(): string;
    getLocation(): ILocation;
    setName(name: string): void;
    abstract accept(visitor: INodeVisitor): void;
}
export declare abstract class BaseExpressionNode extends BaseNode implements IExpressionNode {
    abstract getExpression(): INode;
}
export declare class ProgramNode extends BaseNode implements IProgramNode {
    private body;
    constructor(body: any[]);
    getBody(): any[];
    accept(visitor: INodeVisitor): void;
}
export declare class ExpressionStatementNode extends BaseNode {
    private expression;
    constructor(expression: any);
    getExpression(): any;
    accept(visitor: INodeVisitor): void;
}
export declare type IArgumentNode = ICallExpressionNode | ILiteralNode | IIdentifierNode;
export declare class ArgumentNode implements INode {
    private node;
    constructor(node: IArgumentNode);
    accept(visitor: INodeVisitor): void;
}
export declare class CallExpressionNode extends BaseExpressionNode implements ICallExpressionNode {
    private callee;
    private args;
    expression: INode;
    constructor(callee: any, args: any);
    getCallee(): any;
    getArguments(): any;
    getExpression(): INode;
    getCallExpression(): string;
    accept(visitor: INodeVisitor): void;
}
export declare class MemberExpressionNode extends BaseExpressionNode implements IMemberExpressionNode {
    private object;
    private property;
    private computed;
    private mlocation;
    expression: INode;
    constructor(object: any, property: any, computed: boolean, mlocation: ILocation);
    getObject(): any;
    getProperty(): any;
    getExpression(): INode;
    getMemberExpression(): string;
    accept(visitor: INodeVisitor): void;
}
export declare class IdentifierNode extends BaseExpressionNode implements IIdentifierNode {
    private iname;
    private ilocation;
    constructor(iname: string, ilocation: ILocation);
    getName(): string;
    getExpression(): INode;
    accept(visitor: INodeVisitor): void;
}
export declare class LiteralNode extends BaseExpressionNode implements ILiteralNode {
    private value;
    private ilocation;
    constructor(value: string, ilocation: ILocation);
    getValue(): string;
    getExpression(): INode;
    accept(visitor: INodeVisitor): void;
}
export declare type NodeTypes = IProgramNode | IExpressionStatementNode | ICallExpressionNode | IMemberExpressionNode | ICallExpressionNode | ArgumentNode | IIdentifierNode | ILiteralNode;
export declare class NodeFactory {
    static createNode(obj: any): INode;
}
export interface INodeVisitor {
    visitEnterProgram(node: IProgramNode): any;
    visitEnterExpressionStatement(node: IExpressionStatementNode): any;
    visitEnterArgument(node: ArgumentNode): any;
    visitEnterCallExpression(node: ICallExpressionNode): any;
    visitEnterMemberExpression(node: IMemberExpressionNode): any;
    visitEnterIdentifier(node: IIdentifierNode): any;
    visitEnterLiteral(node: ILiteralNode): any;
    visitLeaveProgram(node: IProgramNode): any;
    visitLeaveExpressionStatement(node: IExpressionStatementNode): any;
    visitLeaveArgument(node: ArgumentNode): any;
    visitLeaveCallExpression(node: ICallExpressionNode): any;
    visitLeaveMemberExpression(node: IMemberExpressionNode): any;
    visitLeaveIdentifier(node: IIdentifierNode): any;
    visitLeaveLiteral(node: ILiteralNode): any;
}
export declare abstract class NodeVisitor implements INodeVisitor {
    abstract visitEnterProgram(node: ProgramNode): any;
    abstract visitEnterExpressionStatement(node: ExpressionStatementNode): any;
    abstract visitEnterCallExpression(node: CallExpressionNode): any;
    abstract visitEnterArgument(node: ArgumentNode): any;
    abstract visitEnterMemberExpression(node: MemberExpressionNode): any;
    abstract visitEnterIdentifier(node: IdentifierNode): any;
    abstract visitEnterLiteral(node: LiteralNode): any;
    abstract visitLeaveProgram(node: ProgramNode): any;
    abstract visitLeaveExpressionStatement(node: ExpressionStatementNode): any;
    abstract visitLeaveCallExpression(node: CallExpressionNode): any;
    abstract visitLeaveArgument(node: ArgumentNode): any;
    abstract visitLeaveMemberExpression(node: MemberExpressionNode): any;
    abstract visitLeaveIdentifier(node: IdentifierNode): any;
    abstract visitLeaveLiteral(node: LiteralNode): any;
}
export declare class CodeVisitor extends NodeVisitor {
    visitEnterProgram(node: ProgramNode): void;
    visitEnterExpressionStatement(node: ExpressionStatementNode): void;
    visitEnterCallExpression(node: CallExpressionNode): void;
    visitEnterArgument(node: ArgumentNode): void;
    visitEnterMemberExpression(node: MemberExpressionNode): void;
    visitEnterIdentifier(node: IdentifierNode): void;
    visitEnterLiteral(node: LiteralNode): void;
    visitLeaveProgram(node: ProgramNode): void;
    visitLeaveExpressionStatement(node: ExpressionStatementNode): void;
    visitLeaveCallExpression(node: CallExpressionNode): void;
    visitLeaveArgument(node: ArgumentNode): void;
    visitLeaveMemberExpression(node: MemberExpressionNode): void;
    visitLeaveIdentifier(node: IdentifierNode): void;
    visitLeaveLiteral(node: LiteralNode): void;
}
export declare class ValidatorReporter {
    errors: any[];
    report(type: string, position: any): void;
}
export interface PathPart {
    type: "property" | "accessor";
    name: string;
    location: ILocation;
}
export interface IReferenceCollector {
    addFunctionReference(func: PathPart[]): void;
    addMemberReference(member: PathPart[]): void;
    getFunctionReferences(): string[];
    getMemberReferences(): string[];
}
export interface PathPart {
    type: "property" | "accessor";
    name: string;
    location: ILocation;
}
export declare class ValidatorVisitor extends NodeVisitor {
    private symbolTable;
    private reporter;
    private collector;
    private types;
    private expressionCount;
    private contexts;
    constructor(symbolTable: any, reporter: ValidatorReporter, collector?: IReferenceCollector);
    visitEnterProgram(node: ProgramNode): void;
    visitLeaveProgram(node: ProgramNode): void;
    visitEnterExpressionStatement(node: ExpressionStatementNode): void;
    visitLeaveExpressionStatement(node: ExpressionStatementNode): void;
    visitEnterCallExpression(node: CallExpressionNode): void;
    visitLeaveCallExpression(node: CallExpressionNode): void;
    visitEnterArgument(node: ArgumentNode): void;
    visitLeaveArgument(node: ArgumentNode): void;
    visitEnterMemberExpression(node: MemberExpressionNode): void;
    visitLeaveMemberExpression(node: MemberExpressionNode): void;
    visitEnterIdentifier(node: IdentifierNode): void;
    visitLeaveIdentifier(node: IdentifierNode): void;
    visitEnterLiteral(node: LiteralNode): void;
    visitLeaveLiteral(node: LiteralNode): void;
    private collectFunctionReference(funcPath);
    private collectMemberReference(memberPath);
    private validatePath(parts);
    private findForPath(parts);
    private determineValueType(value);
    private canHaveSubProperties(node);
    private accumulateInPath(...parts);
    private getCurrentContext();
    private addContext(context);
    private removeContext();
}
