import { ElementRef, OnInit } from "@angular/core";
export declare class InlineHrefDirective implements OnInit {
    private element;
    inlineHref: string;
    private static readonly HREF_ATTR;
    private static readonly SVG_USE_TAG;
    private static readonly XLINK_NS;
    constructor(element: ElementRef);
    ngOnInit(): void;
}
