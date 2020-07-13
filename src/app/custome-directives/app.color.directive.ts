import {
  Directive,
  Input,
  HostListener,
  ElementRef,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[setColor]",
})
export class ColorDirective {
  @Input("setColor")
  color: string;
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  private applyColor(color: string) {
    this.renderer.setStyle(
      this.element.nativeElement,
      "backgroundColor",
      color
    );
  }

  @HostListener("mouseenter")
  onMouseEnter() {
    this.applyColor(this.color);
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.applyColor(null);
  }
}
