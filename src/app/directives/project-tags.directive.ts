import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appProjectTags]'
})
export class ProjectTagsDirective {
  @Input() size: 'sm' | 'md' | 'lg';

  constructor(el: ElementRef) {
    const style = el.nativeElement.style;
    style.backgroundColor = 'blanchedalmond';
    style.color = '#3c4055';
    style.textDecoration = 'none';
    style.pointer = 'cursor';
    style.margin = '0 10px 7px 0';
    style.borderRadius = '25px';
    console.log(this.size);
    if (this.size === 'md') {
      style.padding = '30px';
    }
  }
}
