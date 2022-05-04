import React, {memo} from "react";
import {ContactsCollection} from "../api/ContactsCollection";
import {useSubscribe, useFind} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

export const ContactList = () => {
  const isLoading = useSubscribe('allContacts');
  const contacts = useFind(() => {
    return ContactsCollection.find({}, { sort: {createdAt: -1}});
  });

  // const contacts = useTracker(() => {
  //   return ContactsCollection.find({}, { sort: {createdAt: -1}}).fetch();
  // });

  const removeContact = (e, _id) => {
    e.preventDefault();
    Meteor.call('contacts.remove', {contactId: _id})
  }

  if(isLoading()){
    return (
      <div>
        <div className="mt-10">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Loading...
          </h3>
        </div>
      </div>
    );
  }

  const ContactItem = memo(({person}) => {
    return(
      <li className="py-4 flex items-center justify-between space-x-3">
              <div className="min-w-0 flex-1 flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{person.name}</p>
                  <p className="text-sm font-medium text-gray-500 truncate">{person.email}</p>
                </div>
                <div>
                  <a
                    href="#"
                    onClick={(e) => removeContact(e, person._id)}
                    className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-red-300 text-sm leading-5 font-medium rounded-full text-red-700 bg-white hover:bg-red-50"
                  >
                    Delete
                  </a>
                </div>
              </div>
            </li>
    )
  });

  return (
    <div>
      <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Contact List
        </h3>
        <ul role="list" className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
          {contacts.map((person) => (
            <ContactItem key={person._id} person={person}/> 
          ))}
        </ul>
      </div>
    </div>
  )
}
