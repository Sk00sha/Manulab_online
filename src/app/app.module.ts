import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';
import {MatListModule} from '@angular/material/list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp } from "firebase/app";
import {AngularFireModule} from '@angular/fire/compat'
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { FilterGroupsComponent } from './components/filter-groups/filter-groups.component';




@NgModule({
  declarations: [
    AppComponent,
    DragDropComponent,
    AnalysisComponent,
    HomeComponent,
    UploadComponent,
    NavigationComponent,
    PageLoaderComponent,
    FilterGroupsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    ScrollingModule,
    MatListModule,
    DragDropModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'',component:HomeComponent},
      {path:'analysis',component:AnalysisComponent},
      {path:'upload',component:UploadComponent}
    ]),
    FontAwesomeModule,
    SwiperModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
