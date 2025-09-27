import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerService, NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fresh-cart';

  // constructor(private spinner: NgxSpinnerService) { }

  // ngOnInit() {
  //   /** spinner starts on init */
  //   this.spinner.show('spinner1');

  //   setTimeout(() => {
  //     /** spinner ends after 5 seconds */
  //     this.spinner.hide('spinner1');
  //   }, 5000);
  // }
}
