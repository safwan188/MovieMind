# Movie Mind

**Movie Mind** is a React Native application that allows users to upload short movie clips or share links to clips from platforms like Facebook, Instagram, and TikTok. The app functions similarly to Shazam but for movies, predicting the movie from the uploaded or shared content.

### Key Features:
- **Movie Predictions**: Users can upload clips or share links, and the app predicts the movie.
- **Actor and Character Detection**: The app identifies actors in the provided clip and displays their character names, along with the frames where they appear.
- **Trending Movies**: Provides a list of trending movies.
- **Recent Predictions**: Displays a history of recent movie predictions.

### How It Works:
**Movie Mind** integrates advanced AI models and cloud services for accurate predictions:
- **OpenAI CLIP Model**: This model processes and interprets visual data from uploaded movie clips to identify the movie and match actors with their character names.
- **Google Cloud Vision + NLP**: Google Cloud Vision extracts text from shared links and the content of the linked webpages, such as movie descriptions or actor details. This information is then processed with Natural Language Processing (NLP) to match actors and movies, augmenting the prediction process and providing more accurate results.

The app integrates with **Firebase** for backend services, managing user data, storing clips, and enabling seamless interactions. This combination of AI-powered visual and text analysis makes **Movie Mind** a comprehensive solution for movie identification and actor recognition from short clips or shared links.

<p align="center">
    <img src="utils/Screenshot 2024-09-17 024838-1.png" alt="Screenshot 1" width="200"/>
    <img src="utils/Screenshot 2024-09-17 025600-1.png" alt="Screenshot 2" width="200"/>
    <img src="utils/Screenshot 2024-09-17 025924.png" alt="Screenshot 3" width="200"/>
    <img src="utils/Screenshot 2024-09-17 030055.png" alt="Screenshot 4" width="200"/>
    <img src="utils/Screenshot 2024-09-17 031233.png" alt="Screenshot 5" width="200"/>
    <img src="utils/Screenshot 2024-09-17 031353.png" alt="Screenshot 6" width="200"/>
    <img src="utils/Screenshot 2024-09-17 031612.png" alt="Screenshot 7" width="200"/>
</p>


<p align="center">
    <img src="utils/Screenshot 2024-09-17 032734.png" alt="Screenshot 1" width="200"/>
    <img src="utils/Screenshot 2024-09-17 032549.png" alt="Screenshot 2" width="200"/>
    <img src="utils/Screenshot 2024-09-17 032803.png" alt="Screenshot 3" width="200"/>
</p>


[Click here to watch the demo video](https://drive.google.com/file/d/1kFbbw-sXLgNsS47D-zWuFYFzidLLBccV/view?usp=sharing)


## Table of Contents


- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Screens](#screens)
- [Components](#components)
- [Firebase Setup](#firebase-setup)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Movie Search**: Enhanced search functionality for finding movies based on predictions.
- **Trending Movies**: View the latest trending movies.
- **User Predictions**: See recent and trending movie predictions.
- **Firebase Integration**: Firebase for authentication and database.
- **UI Components**: Clean, reusable components for an enhanced user experience.

## Project Structure

The project follows a modular structure with components organized under `/src`.

### `/src`

- **API.js**: Contains API requests and integration for movie data.
- **SignInScreen.js**: User authentication screen.
- **newScreen.js**: Main screen layout for movie-related content.
- **newStyle.js**: StyleSheet for customizing the UI components.
- **/new**: Folder for UI components and screens related to movie prediction features.
  - `ActorFrames.js`: Displays frames or profiles of actors in a movie.
  - `EnhancedMovieSearchSpinner.js`: Custom spinner for searching movies with an enhanced user experience.
  - `Header.js`: App header with profile and title.
  - `LinkScreen.js`: Predict Movie By Sharing Link From Social Media.
  - `NavBar.js`: Bottom navigation bar.
  - `RecentPredictions.js`: Section for displaying recent movie predictions.
  - `ResultScreen.js`: Displays search results for a movie.
  - `TrendingPredictions.js`: Section for displaying trending predictions.
  - `UploadModal.js`: Modal for uploading predictions.
  - `WelcomeSection.js`: The welcome section that introduces the app’s purpose and features.
  - `firebaseConfig.js`: Firebase configuration file for integrating the app with Firebase services.

## Installation

### Prerequisites

- **Node.js** and **npm** installed.
- **React Native CLI** or **Expo CLI** for running the project.
- **Firebase** project setup.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/Movie_Mind.git
   cd Movie_Mind
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup Firebase:

   - Create a Firebase project from the [Firebase Console](https://console.firebase.google.com/).
   - Add your Firebase configuration to the `firebaseConfig.js` file.

4. Run the project on your emulator or device:

   ```bash
   npx react-native run-android # for Android
   npx react-native run-ios     # for iOS
   ```

## Usage

1. After launching the app, users will be greeted by the **Welcome Section**.
2. Users can sign in or create an account using Firebase authentication.
3. Navigate through different sections:
   - **Movie Search**: Search for movies using the search bar and filters.
   - **Predictions**: View recent or trending predictions in the **PredictionSection**.
   - **Upload**: Add new predictions or content using the **UploadModal**.
4. View movie results and actor information within the **ResultScreen**.

## Screens

- **SignInScreen**: Handles user authentication.
- **newScreen**: Displays various movie details or predictions.
- **LinkScreen**: Navigation links to other screens.
- **ResultScreen**: Displays the result of a movie search.

## Components

- **ActorFrames**: Displays actor profiles or images.
- **EnhancedMovieSearchSpinner**: A custom spinner to enhance the movie search experience.
- **NavBar**: Navigation bar for moving between different sections of the app.

## Firebase Setup

To configure Firebase:

1. Set up a Firebase project in your Firebase Console.
2. Replace the dummy config in `firebaseConfig.js` with your Firebase credentials.
   
```js
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

3. Enable Firebase Authentication, Firestore, and any other services you need.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

