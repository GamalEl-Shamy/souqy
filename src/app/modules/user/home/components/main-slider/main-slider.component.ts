import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.scss'
})
export class MainSliderComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 1500,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      }
      // ,
      // 400: {
      //   items: 2
      // },
      // 740: {
      //   items: 3
      // },
      // 940: {
      //   items: 4
      // }
    },
    nav: false
  }
}

