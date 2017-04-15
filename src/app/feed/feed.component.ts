import { Component, OnInit } from '@angular/core';

import {FriendService} from './friend.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

data:Object;
dada:Object;
  constructor(private feed:FriendService) { }

  ngOnInit() {
    this.feed.apiFetch().subscribe(res=>this.data=res);
    this.feed.apFetch().subscribe(res=>this.dada=res);
    
  }


}
