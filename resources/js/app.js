/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

window.toastr = require('toastr');

toastr.options = {
    "closeButton": true,
    "timeOut": "99999"
};

/**
 * Custom added 
 */
const loggedInUserId = document.head.querySelector('meta[name="userId"]').getAttribute('content');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('notification', require('./components/Notification.vue'));
Vue.component('chat-messages', require('./components/ChatMessages.vue'));
Vue.component('chat-form', require('./components/ChatForm.vue'));

import {shortTextMixin} from "./mixins/shortText";

window.ChatBus = new Vue();

const app = new Vue({
    el: '#app',
    mixins: [shortTextMixin],
    data: {
        notifications: []
    },
    created() {
        if(loggedInUserId) {
            this.fetchNotifications();
            
            Echo.private('notifications_'+loggedInUserId).notification((notification) => {
                toastr.info('', notification.data.userName + " commented on : " + this.notificationShortText(notification), { 
                    onclick: function() {
                        axios.post('/notification/read', { id: notification.id }).then(() => {
                            window.location.href = "/post/" + notification.data.post.id;
                        });
                    }
                });
                this.notifications.push(notification);
            });
        }
    },
    methods: {
        fetchNotifications() {
            const $this = this;
            axios.post('/notification/get').then(({data}) => {
                $this.notifications = data;
            });
        }
    }
});
