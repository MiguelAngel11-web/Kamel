import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './../servicio/api.service';
import { FormControl } from '@angular/forms';
import { Chart } from 'chart.js';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css'],
})
export class GraficaComponent {
  mode = new FormControl('over');


  private intervalUpdate: any = null;

  public chart: any = null;

  constructor(private api: ApiService) {}

  private ngOnInit(): void {
    this.chart = new Chart('realtime', {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Data',
            fill: false,
            data: [],
            backgroundColor: [],
            borderColor: '#eeeeee',
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

    this.Xbox(); this.Play(); this.Nintendo()
  }

  Xbox(): void {

    this.api.consulta(`https://api-grafica.herokuapp.com/xbox`).subscribe(
      (res: any) => {
        console.log("Xbox-->" + Object.keys(res).length);
        this.chart.data.labels.push("Xbox One");
        this.chart.data.datasets[0].data.push(Object.keys(res).length);
        this.chart.data.datasets[0].backgroundColor.push('rgb(23, 189, 84)');
				this.chart.update();
        console.log(res);
      })
  }

  Play(): void {
    this.api.consulta(`https://api-grafica.herokuapp.com/play`).subscribe(
      (res: any) => {
        console.log("Play-->" +Object.keys(res).length);
        this.chart.data.labels.push("PlayStation 4");
        this.chart.data.datasets[0].data.push(Object.keys(res).length);
        this.chart.data.datasets[0].backgroundColor.push('rgb(54, 162, 235)');
				this.chart.update();
        console.log(res);
      })
  }

  Nintendo(): void {
    this.api.consulta(`https://api-grafica.herokuapp.com/nintendo`)
    .subscribe(
      (res: any) => {
        console.log("Nintendo-->" +Object.keys(res).length);
        this.chart.data.labels.push("Nintendo Switch");
        this.chart.data.datasets[0].data.push(Object.keys(res).length);
        this.chart.data.datasets[0].backgroundColor.push('rgb(255, 99, 132)');
				this.chart.update();
        console.log(res);
      })

  }


  /* private ngOnDestroy(): void {
		clearInterval(this.intervalUpdate);
	} */

  /*  	private showData(): void {
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
  }  */
  ngOnit(){}
}
