import { Component, Input } from '@angular/core';
import { PreferencesService } from '../common/Service/preference.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  @Input()
  titre ="titreParDefaut"
  constructor(public preferencesService : PreferencesService) { }
  
  
}

