import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

import { HomeComponent } from './componentes/home/home.component';
import { UploadComponent } from './componentes/upload/upload.component';
import { FotosComponent } from './componentes/fotos/fotos.component';
import { VideosComponent } from './componentes/videos/videos.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';

const routes: Routes = [
  { path: "home", component: HomeComponent     },
  { path: "upload", component: UploadComponent },
  { path: "fotos", component: FotosComponent   },
  { path: "videos", component: VideosComponent },
  { path: "perfil", component: PerfilComponent, canActivate: [ AuthGuard] }
];

export const APP_ROUTING = RouterModule.forRoot(routes);
