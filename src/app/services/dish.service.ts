import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { baseURL } from '../shared/baseurl';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from '../shared/restConfig';


@Injectable()
export class DishService {

  constructor(private restangular: Restangular) { }

  getDishes(): Observable<Dish[]> {
    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
    return this.restangular.one('dishes', id).get();
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes')
      .getList({ featured: true })
      .map(fDishes => fDishes[0]);
  }

  getDishIds(): Observable<number[]> {
    return this.restangular.all('dishes').getList()
      .map(dishes => {
        return dishes.map(dish => dish.id);
      })
      .catch(err => err);
  }
}
