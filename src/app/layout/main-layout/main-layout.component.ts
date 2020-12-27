import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
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
