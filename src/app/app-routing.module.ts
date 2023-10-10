import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatriculaComponent } from './components/matricula/matricula.component';
import { AppComponent } from './app.component';



const routes: Routes = [
  { path: 'matricula', component: MatriculaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
