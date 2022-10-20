
import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit,
  NgZone,
  EventEmitter,
  Output
} from "@angular/core";
import { GestureController } from "@ionic/angular";
@Directive({
  selector: '[appLongpress]'
})
export class LongpressDirective implements AfterViewInit {

  @Output() press = new EventEmitter();
  @Input("delay") delay = 1500;
  action: any; //not stacking actions

  private longPressActive = false;

  constructor(
    private el: ElementRef,
    private gestureCtrl: GestureController,
    private zone: NgZone
  ) {
    console.log("calling");
  }

  ngAfterViewInit() {
    console.log("calling");
    this.loadLongPressOnElement();
  }

  loadLongPressOnElement() {
    console.log("calling");

    const gesture = this.gestureCtrl.create({
      el: this.el.nativeElement,
      threshold: 0,
      gestureName: 'long-press',
      onStart: ev => {
        this.longPressActive = true;
        this.longPressAction();
      },
      onEnd: ev => {
        this.longPressActive = false;
      }
    });
    gesture.enable(true);
  }

  private longPressAction() {
    if (this.action) {
      clearInterval(this.action);
    }
    this.action = setTimeout(() => {
      this.zone.run(() => {
        if (this.longPressActive === true) {
          this.longPressActive = false;
          this.press.emit();
        }
      });
    }, this.delay);
  }
}