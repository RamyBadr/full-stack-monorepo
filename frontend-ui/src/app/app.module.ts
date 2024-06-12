import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes'; // Ensure this path is correct

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes) // Setup routes
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {
}
