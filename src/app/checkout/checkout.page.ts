import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.page.html',
    styleUrls: ['./checkout.page.scss']
})
export class CheckoutPage implements OnInit {
    title: String = 'Transaction detail';
    ORDERID;

    TxnDetails;
    constructor(private route: ActivatedRoute, private http: HttpClient) {
        this.route.params.subscribe(async data => {
            await (this.ORDERID = data.order_id);
            console.log(this.ORDERID);
        });
    }

    ngOnInit() {
        this.http
            .get(
                `https://php-paytm.herokuapp.com/TxnStatus.php?ORDER_ID=${this.ORDERID}`
            )
            .subscribe(data => {
                this.TxnDetails = data;
                // console.log(this.TxnDetails);
            });
    }
}
