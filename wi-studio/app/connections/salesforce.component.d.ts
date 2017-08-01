import { OnInit, SimpleChanges } from "@angular/core";
export declare class SalesforceComponent implements OnInit {
    activeConnection: any;
    name: string;
    description: string;
    connectionId: string;
    apiVersion: string;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
