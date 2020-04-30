import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { ReportObsoleteProduct } from '@shared/forms/reportObsoleteProduct';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportsObsoleteProductsService } from '@shared/services/reports-obsolete-products.service';
import { AuthenticationService } from '@shared/services/authentication.service';
@Component({
  selector: 'app-reports-obsolete-products',
  templateUrl: './reports-obsolete-products.component.html',
  styleUrls: ['./reports-obsolete-products.component.scss']
})
export class ReportsObsoleteProductsComponent implements OnInit {

  reportForm: FormGroup;
  data;

  constructor(
    private formBuilder: FormBuilder,
    private service: ReportsObsoleteProductsService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    M.updateTextFields();
    M.Datepicker.init(document.querySelectorAll('.datepicker'), {});

    this.reportForm = this.formBuilder.group(new ReportObsoleteProduct(this.authService?.currentUserValue?.id));
  }

  onSubmit() {
    this.service.post(this.reportForm?.value)
      .subscribe(
        data => this.data = data,
        error => M.toast({ html:error, classes:'error' })
      )
  }

  showGraph = () => {
    var ctx = document?.getElementById('myChart')?.getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
  }
}
