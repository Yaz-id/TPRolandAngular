import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoueurComponent } from './joueur/joueur.component';
import { StudentComponent } from './student/student.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent }, 
  { path: '', redirectTo: '/welcome', pathMatch: 'full'},
  { path: 'student', component: StudentComponent } ,
  { path: 'joueur', component: JoueurComponent } ,
  { path: '**', redirectTo: '/welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
