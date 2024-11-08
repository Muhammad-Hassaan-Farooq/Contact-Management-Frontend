import React from 'react';

const ContactCard = ({ contact }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-medium">{contact.firstName} {contact.lastName}</h3>
        <p className="text-gray-500">{contact.title}</p>
      </div>
      <div className="border-t">
        <div className="p-4">
          <h4 className="text-sm font-medium mb-2">Email Addresses</h4>
          <div className="space-y-2">
            {contact.emailAddresses.map((email, index) => (
              <div key={index} className="flex items-center">
                <span className="text-gray-500 mr-2">{email.label}:</span>
                <span>{email.email}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t">
          <h4 className="text-sm font-medium mb-2">Phone Numbers</h4>
          <div className="space-y-2">
            {contact.phoneNumbers.map((phone, index) => (
              <div key={index} className="flex items-center">
                <span className="text-gray-500 mr-2">{phone.label}:</span>
                <span>{phone.number}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactList = ({ contacts }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};

export default ContactList;
