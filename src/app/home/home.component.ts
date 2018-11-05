import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'gam-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('.parallax').parallax();
      $('.scrollspy').scrollSpy();
      $('.collapsible').collapsible();
    });
  }

}
