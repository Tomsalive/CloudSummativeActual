const firebaseConfig = {
    apiKey: "AIzaSyDyBmJWow3zBPVEENymrO5MZx-zJLv9zvM",
    authDomain: "wagglycloudsummative.firebaseapp.com",
    databaseURL: "https://wagglycloudsummative-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "wagglycloudsummative",
    storageBucket: "wagglycloudsummative.appspot.com",
    messagingSenderId: "112108223668",
    appId: "1:112108223668:web:0c848480f6c0a84009abe1",
    measurementId: "G-VLZV1Z2LEJ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", event =>{
    const app = firebase.app();

    const db = firebase.firestore();

    const dogwalkersSection = document.getElementById("dogwalkers");
    const dogownerSection = document.getElementById("dogowners");

    if (dogwalkersSection) {
        db.collection('dogwalkers')
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const dogwalkerData = doc.data();
        
                // Create a new div element to hold the dogwalker data
                const dogwalkerElement = document.createElement("div");
                dogwalkerElement.classList.add("dogwalker");
        
                // Create elements to display the dogwalker data
                const locationElement = document.createElement("h3");
                locationElement.textContent = `Location: ${dogwalkerData.location}`;

                const nameElement = document.createElement("p");
                nameElement.textContent = `Name: ${dogwalkerData.name}`;
        
                const emailElement = document.createElement("p");
                emailElement.textContent = `Email: ${dogwalkerData.email}`;
        
                // Append the elements to the dogwalker div
                dogwalkerElement.appendChild(locationElement);
                dogwalkerElement.appendChild(nameElement);
                dogwalkerElement.appendChild(emailElement);
        
                // Append the dogwalker div to the dogwalkers section
                dogwalkersSection.appendChild(dogwalkerElement);
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    } else {
        console.log("No dogwalkers section found");
    }


    if (dogownerSection) {
        db.collection('dogowners')
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const dogownerData = doc.data();
        
                // Create a new div element to hold the dogwalker data
                const dogownerElement = document.createElement("div");
                dogownerElement.classList.add("dogwalker");
        
                // Create elements to display the dogwalker data
                const locationElement = document.createElement("h3");
                locationElement.textContent = `Location: ${dogownerData.location}`;

                const nameElement = document.createElement("p");
                nameElement.textContent = `Name: ${dogownerData.name}`;
        
                const emailElement = document.createElement("p");
                emailElement.textContent = `Email: ${dogownerData.email}`;
        
                // Append the elements to the dogwalker div
                dogownerElement.appendChild(locationElement);
                dogownerElement.appendChild(nameElement);
                dogownerElement.appendChild(emailElement);
        
                // Append the dogwalker div to the dogwalkers section
                dogownerSection.appendChild(dogownerElement);
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    } else {
            console.log("No dogowners section found");
    }});


    const walkerForm = document.getElementById('walkerForm');

  
    walkerForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const accountCreationDate = new Date();

        db.collection('dogwalkers').add({
            name: formData.get('name'),
            email: formData.get('email'),
            location: formData.get('location'),
            accountCreationDate: accountCreationDate,
        })
        .then(() => {
            console.log('Document successfully written!');
            alert('Form submitted successfully!');
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error writing document: ', error);
        });
    });


    // Get a reference to the form element
    const ownerForm = document.getElementById('ownerForm');

    // Add an event listener for the form submission
    ownerForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Get the form data
        const formData = new FormData(event.target);

        // Get the current timestamp
        const accountCreationDate = new Date();

        // Create a new document in the 'dogowners' collection
        db.collection('dogowners').add({
            name: formData.get('name'),
            email: formData.get('email'),
            location: formData.get('location'),
            accountCreationDate: accountCreationDate,
            // Add any other form fields you want to store
        })
        .then(() => {
            console.log('Document successfully written!');
            // Display the success alert
            alert('Form submitted successfully!');

            // Refresh the page
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error writing document: ', error);
        });
    });

