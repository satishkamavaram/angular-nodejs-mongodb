import { Directive,HostListener,HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class AppDropDownDirective {

@HostBinding('class.open') isOpen = false;

@HostListener('click') toggleOpen() {
  this.isOpen = !this.isOpen;
}

  constructor() { }

}
