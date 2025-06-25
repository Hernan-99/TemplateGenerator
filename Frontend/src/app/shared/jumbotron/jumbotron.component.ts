import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import ScrollReveal from 'scrollreveal';
@Component({
  selector: 'app-jumbotron',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './jumbotron.component.html',
  styleUrl: './jumbotron.component.css',
})
export class JumbotronComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    ScrollReveal().reveal('.from-left', {
      origin: 'left',
      distance: '100px',
      duration: 1200,
    });
  }
}
