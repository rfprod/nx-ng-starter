import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit, OnChanges {

  @Input('text') public text: string = 'custom-button works!';

  ngOnInit() {
    // console.log('custom button initialized');
  }

  ngOnChanges(event: SimpleChanges): void {
    console.log('custom button, changes', event);
  }

}
