
# YTPlayer App

This is a React Native application built with Expo, featuring video fetching, theme management (dark and light modes), and the ability to add videos to favorites. The app integrates the YouTube API to fetch and display videos. It also features a clean and modern UI powered by Gluestack.

## Features

- **Video List**: Fetch videos from a specific channel or search query.
- **Favorites Management**: Add videos to favorites and persist data using AsyncStorage.
- **Theme Support**: Toggle between light and dark modes.
- **Clean UI**: Styled using Gluestack components for a modern look.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/idobe2/YTPlayer.git
   ```
2. Navigate to the project directory:
   ```bash
   cd YTPlayer
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npx expo start
   ```

## Usage

- Search for videos using the search bar.
- Tap on a video to view its details.
- Add or remove videos from your favorites.
- Change the theme from the drawer menu.

## Dependencies

- **Expo**
- **React Native**
- **@react-native-async-storage/async-storage**
- **react-native-youtube-iframe**
- **Gluestack UI**

## Additional Features

- **Responsive Design**: Ensures the UI works well on both small and large screen devices.
- **Pull-to-Refresh:** Reload the video list by swiping down on the home screen.
- **Custom Toast Notifications:** Displays feedback messagesusing a clean toast notification system.

## Future Improvements

- **Search History**: Add functionality to track and manage previous searches.
- **Playlists**: Allow users to create and manage custom playlists.
- **Custom player**: Employ a custom video player for enhanced flexibility.


