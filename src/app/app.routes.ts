import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrayerWindowComponent } from './prayer-window/prayer-window.component';

export const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "start-prayer", component: PrayerWindowComponent}
];
