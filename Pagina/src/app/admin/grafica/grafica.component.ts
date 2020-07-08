import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './../servicio/api.service';
import { FormControl } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css'],
})
export class GraficaComponent {
  mode = new FormControl('over');

  private intervalUpdate: any = null;

  public chart: any = null;

  constructor(private service: ApiService) {}

  private ngOnInit(): void {
    this.chart = new Chart('realtime', {
      /*   "type":"doughnut",
      "data":{
        "labels":["Red","Blue","Yellow"],
      "datasets":[
        {"label":"My First Dataset",
        "data":[300,50,100],
      "backgroundColor":["rgb(255, 99, 132)","rgb(54, 162, 235)","rgb(255, 205, 86)"]}]}}); */
      type: 'doughnut',
      data: {
        labels: ['Xbox One', ' PlayStation 4', ' Nintendo Switch'],
        datasets: [
          {
            label: 'Data',
            fill: false,
            data: [12,10,3],
            backgroundColor: [
              'rgb(23, 189, 84)',
              'rgb(54, 162, 235)',
              'rgb(194, 17, 67)',
            ],
            borderColor: '#168ede',
          },
        ],
      },
      options: {

        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: 'white',
          },
        },

      },
    });

    this.showData();

		/* this.intervalUpdate = setInterval(function(){
			this.showData();
		}.bind(this), 500);  */
  }

  /* private ngOnDestroy(): void {
		clearInterval(this.intervalUpdate);
	} */

   	private showData(): void {
		this.getFromAPI().subscribe(response => {
			if(response.error === false) {
				let chartTime: any = new Date();
				chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) + ':' + ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
				if(this.chart.data.labels.length > 15) {
						this.chart.data.labels.shift();
						this.chart.data.datasets[0].data.shift();
				}
				this.chart.data.labels.push(chartTime);
				this.chart.data.datasets[0].data.push(response.data);
				this.chart.update();
			} else {
				console.error("ERROR: The response had an error, retrying");
			}
		}, error => {
			console.error("ERROR: Unexpected response");
		});
	}

	private getFromAPI(): Observable<any>{
	  return this.service.consulta();
	} 
}
