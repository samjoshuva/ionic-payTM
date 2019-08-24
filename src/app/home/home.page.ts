import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {
    ThemeableBrowser,
    ThemeableBrowserOptions,
    ThemeableBrowserObject
} from '@ionic-native/themeable-browser/ngx';
import { Router } from '@angular/router';

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
        private router: Router,
        private themeableBrowser: ThemeableBrowser
    ) {}

    pay() {
        if (this.amount == undefined) {
            alert('Amount cannot be empty');
            return;
        }
        let orderid = Date.now().toString();
        console.log(orderid);
        let txnRequest = {
            ENVIRONMENT: 'staging', // environment details. staging for test environment & production for live environment
            REQUEST_TYPE: 'DEFAULT', // You would get this details from paytm after opening an account with them
            MID: 'endlnS53471586868878', // You would get this details from paytm after opening an account with them
            ORDER_ID: `ORDS${orderid}`, // Unique ID for each transaction. This info is for you to track the transaction details
            CUST_ID: '07', // Unique ID for your customer
            INDUSTRY_TYPE_ID: 'Retail', // You would get this details from paytm after opening an account with them
            CHANNEL_ID: 'WEB', // You would get this details from paytm after opening an account with them
            TXN_AMOUNT: this.amount, // Transaction amount that has to be collected
            WEBSITE: 'APPSTAGING' // You would get this details from paytm after opening an account with them
        };

        const options: ThemeableBrowserOptions = {
            statusbar: {
                color: '#f0f0f0'
            },
            toolbar: {
                height: 44,
                color: '#f0f0f0'
            },
            title: {
                color: '#003264ff',

                showPageTitle: true
            },

            closeButton: {
                wwwImage: 'assets/imgs/close.png',
                imagePressed: 'close_pressed',
                align: 'left',
                event: 'closePressed'
            },

            backButtonCanClose: true
        };
        const browser: ThemeableBrowserObject = this.themeableBrowser.create(
            `https://php-paytm.herokuapp.com/pgRedirect.php?ORDER_ID=${txnRequest.ORDER_ID}&CUST_ID=${txnRequest.CUST_ID}&INDUSTRY_TYPE_ID=${txnRequest.INDUSTRY_TYPE_ID}&CHANNEL_ID=${txnRequest.CHANNEL_ID}&TXN_AMOUNT=${txnRequest.TXN_AMOUNT}&WEBSITE=${txnRequest.WEBSITE}&CALLBACK_URL=https://php-paytm.herokuapp.com/transactionMessage.php`,
            '_blank',
            options
        );

        browser.on('closePressed').subscribe(res => {
            console.log('browser closed');
            this.router.navigate(['/checkout', txnRequest.ORDER_ID]);
        });
    }
}
