import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Ronda della carità';
  isSidebarOpen: boolean;

  ngOnInit(): void {
    const mediaQueryList = window.matchMedia('(min-width: 64em)');
    this.isSidebarOpen = mediaQueryList.matches;
  }

  public toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
