import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[sidebarcollapsed]',
  host: {
    '(mouseenter)': 'mouseEvent()',
    '(mouseleave)': 'mouseEvent()',
    '[class.collapsed]':'mouseDown'
  }
})
export class CollapsedDirective {

  private mouseDown : boolean = true;
  private el: HTMLElement;

  constructor(el: ElementRef) { this.el = el.nativeElement; }

  mouseEvent() {
    this.mouseDown = !this.mouseDown;
  }

}