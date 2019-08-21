import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

declare var paytm: any;

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage {
    amount: Number;
    email: String;
    number: Number;
    constructor(
        private platform: Platform,
        private http: HttpClient,
        private iab: InAppBrowser
    ) {}

    pay() {
        let orderid = Date.now().toString();
        console.log(orderid);
        let txnRequest = {
            ENVIRONMENT: 'staging', // environment details. staging for test environment & production for live environment
            REQUEST_TYPE: 'DEFAULT', // You would get this details from paytm after opening an account with them
            MID: 'endlnS53471586868878', // You would get this details from paytm after opening an account with them
            ORDER_ID: `ORDER00${orderid}`, // Unique ID for each transaction. This info is for you to track the transaction details
            CUST_ID: '07', // Unique ID for your customer
            INDUSTRY_TYPE_ID: 'Retail', // You would get this details from paytm after opening an account with them
            CHANNEL_ID: 'WAP', // You would get this details from paytm after opening an account with them
            TXN_AMOUNT: '1', // Transaction amount that has to be collected
            WEBSITE: 'APPSTAGING' // You would get this details from paytm after opening an account with them
        };

        this.platform.ready().then(() => {
            this.http
                .get(
                    `https://php-paytm.herokuapp.com/pgRedirect.php?ORDER_ID=${
                        txnRequest.ORDER_ID
                    }&CUST_ID=${txnRequest.CUST_ID}&INDUSTRY_TYPE_ID=${
                        txnRequest.INDUSTRY_TYPE_ID
                    }&CHANNEL_ID=${txnRequest.CHANNEL_ID}&TXN_AMOUNT=${
                        txnRequest.TXN_AMOUNT
                    }&WEBSITE=${txnRequest.WEBSITE}`,
                    {
                        responseType: 'text'
                    }
                )
                .subscribe(data => {
                    console.log(data);

                    txnRequest['CHECKSUMHASH'] = data;
                    // data = data['checksum'];
                    // const browser = this.iab.create(
                    //     `https://securegw-stage.paytm.in/theia/processTransaction?ORDER_ID=${
                    //         txnRequest.ORDER_ID
                    //     }&MID=${txnRequest.MID}&CUST_ID=${
                    //         txnRequest.CUST_ID
                    //     }&INDUSTRY_TYPE_ID=${
                    //         txnRequest.INDUSTRY_TYPE_ID
                    //     }&CHANNEL_ID=${txnRequest.CHANNEL_ID}&TXN_AMOUNT=${
                    //         txnRequest.TXN_AMOUNT
                    //     }&CHECKSUMHASH=${data}&WEBSITE=APPSTAGING&CALLBACK_URL=https://php-paytm.herokuapp.com/TxnStatus.php?ORDER_ID=${
                    //         txnRequest.ORDER_ID
                    //     }`
                    // );

                    paytm.startPayment(
                        txnRequest,
                        this.successCallback,
                        this.failureCallback
                    );
                });
        });
    }

    successCallback(response) {
        if (response.STATUS == 'TXN_SUCCESS') {
            var txn_id = response.TXNID;
            var paymentmode = response.PAYMENTMODE;
            // other details and function after payment transaction
        } else {
            // error code will be available in RESPCODE
            // error list page https://docs.google.com/spreadsheets/d/1h63fSrAmEml3CYV-vBdHNErxjJjg8-YBSpNyZby6kkQ/edit#gid=2058248999
            console.log(response);
        }
    }

    failureCallback(error) {
        // error code will be available in RESCODE
        // error list page https://docs.google.com/spreadsheets/d/1h63fSrAmEml3CYV-vBdHNErxjJjg8-YBSpNyZby6kkQ/edit#gid=2058248999
        console.log(error);
    }
}
