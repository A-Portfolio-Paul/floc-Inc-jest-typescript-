import { writable } from "svelte/store";
import supabase from '$lib/db';
import { getObjById } from './functions/utilities/arrayFn'

// mock data
import {users_mock} from './mockupData/users'
import {documents_mock} from './mockupData/documents'
import {views_mock} from './mockupData/views'
// stores
import { curDoc,curViews,curView} from './functions/stores/initializeStores'

export const user = writable(supabase.auth.user() //Authenticated user from Superbase
     ||false)
export const sess = writable('')                  //session data
export const alerts = writable({})                //alerts

//Documents
export const documents = writable({})        // all docs for user
export const views = writable({})            // all views for user
export const users = writable({})            // all users that conrributed to users docs

export const currentDocument = writable({})  // current selected dcoument
export const currentViews = writable({})     // Views for current document
export const currentView = writable({})      // authenticated users view of current document


export const InitUserDocuments = () =>{
     documents.update((val) => {
          val = documents_mock;
          return val;
     });
     views.update((val) => {
          val = views_mock;
          return val;
     });
     users.update((val) => {
          val = users_mock;
          return val;
     });
}
export const initCurrentDocument=(docId)=>{
     // curDoc,curViews,curView
     currentDocument.update((val) => {
          //its an array - use filter
          val = getObjById(curDoc, docId, 'docId');
          return val;
     });
     currentViews.update((val) => {
          val = getObjById(views,docId, 'viewId');
          return val;
     });
     currentView.update((val) => {
          // user.id does not exist until fetched from database - hence lint err
          val = getObjById(currentViews, user.id, 'userId');
          return val;
     });
}
export const clearStores = () =>{
     documents.update((val) => {
          val =false
          return val;
     });
     views.update((val) => {
          val = false
          return val;
     });
     users.update((val) => {
          val = false
          return val;
     });
     currentDocument.update((val) => {
          val =false
          return val;
     });
     currentViews.update((val) => {
          val =false
          return val;
     });
     currentView.update((val) => {
          val =false
          return val;
     });
}