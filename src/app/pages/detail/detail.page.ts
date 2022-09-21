import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Util } from 'src/app/service/util.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailComponent implements OnInit {

  constructor(
    private util:Util,
    private logger:NGXLogger
    ) { }
  details:any;
  today = Date.now();
  
  ngOnInit() {
    this.details = this.util.get();
    this.logger.info(JSON.stringify(this.details));
  }

}
