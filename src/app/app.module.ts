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
import { environment } from 'src/environments/environment';
import { FilterGroupsComponent } from './components/filter-groups/filter-groups.component';
import { PageViewerComponent } from './components/page-viewer/page-viewer.component';
import { InfoModalComponent } from './components/info-modal/info-modal.component';
import { InputModalComponent } from './components/input-modal/input-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Form1Component } from './components/form1/form1.component';
import { AnalysisResultComponent } from './components/analysis-result/analysis-result.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FooterComponent } from './components/footer/footer.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import {SelectPaginationModule} from 'ngx-select-pagination';
import {MatSortModule} from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


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
    PageViewerComponent,
    InfoModalComponent,
    InputModalComponent,
    Form1Component,
    AnalysisResultComponent,
    FooterComponent,

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
      {path:'upload',component:UploadComponent},
      {path:'analysis results',component:AnalysisResultComponent}
    ]),
    FontAwesomeModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    NgxChartsModule,
    SelectPaginationModule,
    MatSortModule,
    MatSlideToggleModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
