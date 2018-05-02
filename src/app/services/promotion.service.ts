import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';

import { Observable } from 'rxjs/Observable';

import { baseURL } from '../shared/baseurl';


import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from '../shared/restConfig';
import { PROMOTIONS } from '../shared/promotions';


@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular) { }

  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.restangular.one('promotions', id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions')
      .getList({ featured: true })
      .map(fPromo => fPromo[0]);
  }

}
