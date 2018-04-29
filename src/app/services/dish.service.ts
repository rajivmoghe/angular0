import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';



@Injectable()
export class DishService {

  constructor(private http: Http,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
      .map(res => {
        return this.processHTTPMsgService.extractData(res);
      })
      .catch(err => {
        return this.processHTTPMsgService.handleError(err);
      });
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get(baseURL + 'dishes/' + id)
      .map(res => {
        return this.processHTTPMsgService.extractData(res);
      })
      .catch(err => {
        return this.processHTTPMsgService.handleError(err);
      });
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true')
      .map(res => {
        return this.processHTTPMsgService.extractData(res)[0];
      })
      .catch(err => {
        return this.processHTTPMsgService.handleError(err);
      });
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => {
        return dishes.map(dish => dish.id);
      })
      .catch(err => {
        return this.processHTTPMsgService.handleError(err);
      });
  }
}
