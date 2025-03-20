import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appHighlightable]',
  standalone: true
})
export class HighlightableDirective {

  elementRef = inject(ElementRef);

  @HostListener('mouseenter') onEnter(){
    this.elementRef.nativeElement.style.transform = 'scale(1.05)';
    this.elementRef.nativeElement.style.boxShadow = 'var(--primary-color) 0 0 10px';
    this.elementRef.nativeElement.style.transition = 'transform 300ms, box-shadow 300ms';
  }

  @HostListener('mouseleave') onLeave(){
    this.elementRef.nativeElement.style.transform = 'scale(1)';
    this.elementRef.nativeElement.style.boxShadow = 'none';
  }

}
