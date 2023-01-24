import { NgIf, NgIfContext } from '@angular/common'
import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core'

@Directive({
  selector: '[keepAliveIf]'
})
/**
 * After the condition becomes true, keeps it true
 */

export class KeepAliveIf<T = unknown> extends NgIf {


  conditionWasTrue = false;
  templateRef: TemplateRef<NgIfContext<unknown>>

  @Input()
  set keepAliveIf (condition: T) {
    if (condition)
      this.conditionWasTrue = true

    this.ngIf = condition || this.conditionWasTrue
  }

  constructor(private el: ElementRef, _viewContainer: ViewContainerRef, templateRef: TemplateRef<NgIfContext<unknown>>) {
    super(_viewContainer, templateRef)
    this.templateRef = templateRef
  }

}
