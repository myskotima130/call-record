import React from "react";

export const ContactsContainer = ({ contacts }) => {
  return (
    <div>
      {contacts.map(contact => (
        <div key={contact.tel}>
          <p>{contact.name}</p>
          <p>{contact.tel}</p>
          <button onClick={() => console.log("call")}>call</button>
        </div>
      ))}
    </div>
  );
};
