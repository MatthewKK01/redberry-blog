import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private el: ElementRef) {
    console.log(this.el.nativeElement);
  }
  private currentIndex = 0;
  @HostListener('click')
  nextFunc() {
    const element = this.el.nativeElement.parentElement.parentElement.parentElement.children[1].children[0].children[0].children[0];
    const items = element.getElementsByClassName('item');

    // Check if there are items
    if (items.length === 0) {
      return;
    }

    // Move the first item to the end
    const firstItem = items[0].cloneNode(true);
    element.append(firstItem);
    element.removeChild(items[0]);

    // Update currentIndex if needed
    if (this.currentIndex >= items.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }

    this.updateButtonState();
  }

  private updateButtonState() {
    const element = this.el.nativeElement.parentElement.parentElement.parentElement.children[1].children[0].children[0].children[0];
    const items = element.getElementsByClassName('item');
    const button = this.el.nativeElement;

    // Disable the button if there is only one item (the last item)
    button.disabled = this.currentIndex >= items.length - 1;
  }

}
