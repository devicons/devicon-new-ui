import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { IconDisplayComponent } from './icon-display/icon-display.component';
import { IconDetailComponent } from './icon-detail/icon-detail.component';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';

import { TextFilterPipe } from './pipes/text-filter.pipe';
import { TagFilterPipe } from './pipes/tag-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    IconDisplayComponent,
    IconDetailComponent,
    CodeSnippetComponent,
    TextFilterPipe,
    TagFilterPipe
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
