import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router.js'
import store from './store/store.js'


createApp( App ).use( store ).use( router ).mounted( "#app" );