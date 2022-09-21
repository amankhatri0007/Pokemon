import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  
  @Input('list') list:any;
  @Output('navigate') navigate = new EventEmitter();
  @Output('loadMore') loadMore = new EventEmitter();
  default = '../assets/default_image.png';
  today = Date.now();

  constructor(private logger:NGXLogger) { }

  ngOnInit() {
    this.logger.info(this.list)
  }

  scroll(event:InfiniteScrollCustomEvent){
    this.loadMore.emit(event);
  }

  navigateHandler(item){
    this.navigate.emit(item);
  }

}
