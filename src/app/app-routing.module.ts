import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './componentes/home/home.component';
import { UploadComponent } from './componentes/upload/upload.component';
import { FotosComponent } from './componentes/fotos/fotos.component';
import { VideosComponent } from './componentes/videos/videos.component';

const routes: Routes = [
  { path: "home", component: HomeComponent     },
  { path: "upload", component: UploadComponent },
  { path: "fotos", component: FotosComponent   },
  { path: "videos", component: VideosComponent }
];

export const APP_ROUTING = RouterModule.forRoot(routes);
