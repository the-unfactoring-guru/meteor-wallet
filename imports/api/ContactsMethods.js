import { ContactsCollection } from "./ContactsCollection";
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

Meteor.methods({
    'contacts.insert'({name, email, imageURL}) {
        if(!name && !email && !imageURL){
            throw new Meteor.Error(400,'There were empty fields in the contact form');
        }
        return ContactsCollection.insert({ name, email, imageURL, createdAt: new Date() });
    },
    'contacts.remove'({contactId}){
        return ContactsCollection.remove(contactId);
    }
})