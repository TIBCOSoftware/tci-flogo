import { ElementRef, EventEmitter, OnChanges, OnInit, SimpleChange } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
export declare class Contenteditable implements OnInit, OnChanges {
    private el;
    private sanitizer;
    private _el;
    private $el;
    private colorFlag;
    myContenteditable: string;
    placeholder: string;
    myContentApplyOnChangeAlways: boolean;
    myContenteditableChange: EventEmitter<{}>;
    constructor(el: ElementRef, sanitizer: DomSanitizer);
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    ngOnInit(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    onFocus(): void;
    onBlur(): void;
    private _initPlaceholder();
}
