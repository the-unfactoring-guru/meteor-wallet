import { ContactsCollection } from "./ContactsCollection";
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

Meteor.methods({
    'contacts.insert'({name, email, imageURL}) {
        //THE BUG STARTS HERE WITH THE CHECKS, I DON'T KNOW WHAT I'M MISSING (Node 16.15.0 (Gallium))
        check(name, String);
        check(email, String);
        check(imageURL, String);
        if(!name && !email && !imageURL){
            throw new Meteor.Error(400,'There were empty fields in the contact form');
        }
        return ContactsCollection.insert({ name, email, imageURL, createdAt: new Date() });
    },
    'contacts.remove'({contactId}){
        check(contactId, String)
        return ContactsCollection.remove(contactId);
    }
})