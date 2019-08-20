import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

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
    constructor(private platform: Platform) {}

    pay() {
        let options = {
            ENVIRONMENT: 'staging', // environment details. staging for test environment & production for live environment
            REQUEST_TYPE: 'DEFAULT', // You would get this details from paytm after opening an account with them
            MID: 'endlnS53471586868878', // You would get this details from paytm after opening an account with them
            ORDER_ID: 'ORDER0000000001', // Unique ID for each transaction. This info is for you to track the transaction details
            CUST_ID: '10000988111', // Unique ID for your customer
            INDUSTRY_TYPE_ID: 'Retail', // You would get this details from paytm after opening an account with them
            CHANNEL_ID: 'WAP', // You would get this details from paytm after opening an account with them
            TXN_AMOUNT: '1', // Transaction amount that has to be collected
            WEBSITE: 'APPSTAGING', // You would get this details from paytm after opening an account with them
            CALLBACK_URL:
                'https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=ORDER0000000001', // Callback url
            EMAIL: 'sam613263@gmail.com', // Email of customer
            MOBILE_NO: 8838558147, // Mobile no of customer
            CHECKSUMHASH:
                'w2QDRMgp1/BNdEnJEAPCIOmNgQvsi+BhpqijfM9KvFfRiPmGSt3Ddzw+oTaGCLneJwxFFq5mqTMwJXdQE2EzK4px2xruDqKZjHupz9yXev4='
        };

        this.platform.ready().then(() => {
            console.log(navigator);
            paytm.startPayment(
                options,
                this.successCallback,
                this.failureCallback
            );
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
