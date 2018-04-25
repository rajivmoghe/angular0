import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import { ObserveContent } from '@angular/cdk';

@Injectable()
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    return Observable.of(LEADERS).delay(500);
  }

  getLeader(id: number): Observable<Leader> {
    return Observable.of(LEADERS.filter(leader => leader.id === id)[0]).delay(500);
  }

  getFeaturedLeader(): Observable<Leader> {
    return Observable.of(LEADERS.filter(leader => leader.featured)[0]).delay(250);
  }

}
