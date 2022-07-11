import { Component, OnDestroy, OnInit, VERSION } from '@angular/core';
import { Observable } from 'rxjs';
import { CarService } from './car.service';
import { Page } from './models/page.model';
import { PoolingFacade } from './pooling.facade';
import { CarPoolingType, CarType, status } from './types/car.types';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  name = 'Angular ' + VERSION.major;
  poolingFacade: PoolingFacade<CarPoolingType>;
  poolingStatus: status[] = ['processing'];

  cars: CarType[];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.poolingFacade = new PoolingFacade(
      this.handleSwitchMap,
      this.handleTakeWhile,
      this.getCars
    );
    this.getCars();
  }

  ngOnDestroy(): void {
    this.poolingFacade.setComplete();
  }

  getColor(status: status): string {
    const color = {
      processing: 'red',
      completed: 'green',
    };

    return color[status];
  }

  private handleSwitchMap(object: CarType): Observable<CarPoolingType> {
    return this.carService.getCarStatusById(object.id);
  }
  private handleTakeWhile(pooling: CarPoolingType): boolean {
    return this.poolingStatus.includes(pooling.status);
  }
  private getCars(): void {
    this.carService.getCars().subscribe((response: Page<CarType>) => {
      this.startPooling(response.content);
    });
  }
  private startPooling(cars: CarType[]): void {
    cars.forEach((car) => {
      this.poolingFacade.operation(car);
    });
  }
}
