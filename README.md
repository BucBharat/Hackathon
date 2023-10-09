# 🌼 AgelessAid: Medication Reminders for Elders

An application designed with love and care for our grandparents and elderly, ensuring they never miss their medications.

## 📚 Table of Contents

- [🎉 Why AgelessAid?](#🎉-why-agelessaid)
- [🔍 A Closer Look](#🔍-a-closer-look)
  - [🏗 Structure](#🏗-structure)
  - [💊 Medication Details](#💊-medication-details)
- [🚀 Getting Started](#🚀-getting-started)
- [👩‍💻 How to Use](#👩‍💻-how-to-use)
- [🔐 Stay Secure](#🔐-stay-secure)
- [💡 What&#39;s Next?](#💡-whats-next)
- [🌟 Acknowledgements](#🌟-acknowledgements)
- [💭 Final Thoughts](#💭-final-thoughts)

## 🎉 Why AgelessAid?

AgelessAid is a web application that aims to provide timely medication reminders for the elderly. It's essential, especially as our beloved elders sometimes forget to take their medications on time. With a friendly user interface, AgelessAid helps bridge the gap between technology and care.

## 🔍 A Closer Look

### 🏗 Structure

## 🧱 AgelessAid Application Structure

Harnessing the power and flexibility of the MERN stack, AgelessAid presents a well-organized file structure ensuring maintainability and scalability. Here's a breakdown of its architecture:

### Root Directory

- **public**: A directory holding static files that don't change during the application's runtime.
- **src**: The heart of the application. This is where all the React components, styles, and logic reside. A deep dive into this directory reveals:

  - **App.css**: Global styles for the main App component.
  - **App.js**: The main React component that serves as the entry point for the application.
  - **index.css**: Global styles applied to the entire application.
  - **index.js**: The JavaScript entry point, where the main App component gets rendered to the DOM.
  - **LoginScreen.js**: React component for the user login screen.
  - **loginScreenStyles.scss**: SCSS styles specific to the login screen.
  - **MedicationContext.js**: Provides context for managing and accessing medication data across components.
  - **MedicationInput.js**: Component to input new medication details.
  - **Notifs.js**: Handles notifications within the application.
  - **RegisterScreen.js**: React component for user registration.
  - **reportWebVitals.js**: Utility to measure and report on web vitals.
  - **UserDashboard.js**: Dashboard component showcasing user-specific data.
  - **ViewMedications.js**: Component that lists all the medications entered by the user.

- **.gitignore**: Lists files and directories that should be ignored by Git (version control).
- **package-lock.json** & **package.json**: Provide metadata about the application, like its dependencies and scripts.
- **README.md** & **README-I.md**: Documentation files explaining the application, its features, and how to use it.
- **reminder.js**: Script responsible for sending medication reminders.
- **server.js**: The main server script that interfaces with the database and serves the backend API.
- **upload.js**: Script for handling file uploads, especially for medication-related documents.

### 💊 Medication Details

AgelessAid keeps track of:

- Contact Details of the Receiver
- Medication Name
- Medication Description
- Reminder Timing
- Frequency of Reminders
- Option to Upload Files or Prescriptions

## 🚀 Getting Started

```bash
git clone https://github.com/BucBharat/Hackathon.git   # Clone the repository
cd Hackathon                                          # Move to the project directory
npm install                                           # Install all necessary dependencies
npm run start                                         # Kickstart the application
node upload.js                                         # Manage media uploads
node reminder.js                                       # Handle SMS reminders
node server.js                                         # Fire up the database server
```

## 👩‍💻 How to Use

### Setting Medication Reminders

1. Access AgelessAid and log in or register.
2. Under "Add Medications", enter all medication details.
3. Attach any relevant documents if needed.
4. Save the medication.

### Reviewing Medications

1. Click on the "View Medications" option.
2. A list showcases all added medications for easy reference.

## AgelessAid App Functionality

### 1. User Registration (`Register` component):

- Allows new users to create an account by providing their name, email, and password.
- Sends user data to a backend server for registration.
- Upon successful registration, users are navigated to a dashboard.

### 2. User Login (`LoginScreen` component ):

- Existing users can log into their account by entering their email and password.
- Validates user credentials against the backend server.
- If login is successful, users access their dashboard or a personalized space in the app.

### 3. User Dashboard (`UserDashboard` component):

- Acts as a central hub or homepage for logged-in users.
- Likely displays user-specific information, potentially including an overview of medications, notifications, or other pertinent data.
- Provides navigation or access points to other functionalities, such as adding medications or viewing notifications.

### 4. Add Medications (`MedicationInput` component):

- Users can input and save details about their medications.
- This could include medication names, dosages, timings, and other relevant information.
- Helps users keep track of their medications and ensures they take the right dosage at the right time.

### 5. View Medications (`ViewMedications` component):

- Displays a list or overview of all medications a user has added.
- Users can review details, modify entries, or perhaps even set reminders for when to take each medication.

### 6. Medication Context (`MedicationContext` component):

- Suggests the app might be using the React Context API.
- Provides a way to share medication-related data across multiple components without passing props down manually at every level.

## 🔐 Stay Secure

Security is non-negotiable. AgelessAid uses bcrypt for encrypting passwords, ensuring that user information remains confidential and uncompromised.

## 💡 What's Next?

- **Voice-Driven Reminders**: For those who prefer auditory reminders, this feature is on the horizon.
- **Medication Adherence Tracking**: A feature for users to monitor their medication intake closely.

## 🌟 Acknowledgements

Deep gratitude to the Plivo API, especially their media and messaging solutions. Their contribution to AgelessAid's journey is invaluable!

## 💭 Final Thoughts

AgelessAid strives to make the daily lives of our elders a tad bit easier. Every feedback, every suggestion pushes us to do better. Looking forward to your insights!
