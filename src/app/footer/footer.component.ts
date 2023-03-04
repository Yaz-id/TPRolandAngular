import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../common/Service/preference.service';
import { SessionService } from '../common/Service/session.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  listeCouleurs : string[] = [ "lightyellow", "white",
     "lightgrey" , "lightgreen" , "lightpink" , "lightblue"] ; 

  constructor(public preferencesService: PreferencesService,
              public sessionService : SessionService) { }

  ngOnInit(): void {
  }
}