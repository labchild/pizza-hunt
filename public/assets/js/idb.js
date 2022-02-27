let db;
const request = indexedDB.open('pizza-hunt', 1);

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function (e) {
    // save a reference to the db
    const db = e.target.result;
    // create an obj store (table) called `new_pizza`, set it to auto_increment PK of sorts
    db.createObjectStore('new_pizza', { autoIncrement: true });
};

// upon a successful request
request.onsuccess = function(e) {
    // when db is successfully created w/ its obj store (from onupgradeneeded event)
    // or simply established connection
    // save reference to db in global variable
    db = e.target.result;

    // check if app is online
    // if yes, run uploadPizza() to send all local db to api
    if (navigator.online) {
        // we haven't created this yet, but we will soon, so let's comment it out for now
        // uploadPizza();
    }
};

request.onerror = function(e) {
    // log error here
    console.log(e.target.errorCode);
};

// if we attempt to submit a new pizza w no connection
function saveRecord(record) {
    // open a new transaction w db w/ read and write permissions
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    // access the obj store for 'new_pizza'
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    // add record to your store wih add method
    pizzaObjectStore.add(record);
}