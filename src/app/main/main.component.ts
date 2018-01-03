import { Component, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations'

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('600ms')),
      transition('hidden => shown', animate('300ms')),
    ])
  ]
})
export class MainComponent {

  @ViewChild('resultLabel') label : ElementRef;
  
  //Success Callbacks
  visibilityError = 'hidden';
  visibilitySuccess = 'hidden';

  error: boolean = false;
  success: boolean = false;

  errorDescription: string  = '';

  update(entryNumber){
    let finalValue;

    if(entryNumber) 
    {
      //Clean the number with any possible not number chars
      let cleanedValue = entryNumber.replace(/[^0-9]/gi, '');
      
      finalValue =  this.formatNumber(cleanedValue);
      
      if(finalValue){
        this.label.nativeElement.value = finalValue;
        this.success = true;
        this.visibilitySuccess = 'shown'
      }
        
      else 
      {
        this.errorDescription = 'Number is too high to prettify.';
        this.toggleError();
      }
      
    }
    
  }
 
  formatNumber(number) {
    if(number.length > 9) return false;

    if (number >= 1000000)
      return (number / 1000000).toFixed(1).replace(/\.0$/, '') + ' M';
    else if(number > 1000)
      return (number / 1000).toFixed(1).replace(/\.0$/, '') + ' K';
  }

  toggleError() {
    this.error = !this.error;

    if (this.error)
      this.visibilityError = 'shown'
    else
      this.visibilityError = 'hidden'
      
    this.visibilitySuccess = 'hidden';
  }
}
