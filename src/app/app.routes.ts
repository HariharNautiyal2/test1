import { Routes } from '@angular/router';
import { MainPage } from './components/main';

export const routes: Routes = [
    {
        path:'',pathMatch:'full',redirectTo:'mainpage'
    },
    {
        path:'mainpage',component:MainPage
    }
];
