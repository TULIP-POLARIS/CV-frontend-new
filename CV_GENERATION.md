# CV Generation and PDF Export Logic

This document explains the technical implementation of the CV generation, preview, and PDF export features in the `cv-checker` project.

## 1. CV Template and Theme System

### Architecture
The CV preview is built using a modular React Native component architecture. The main entry point for displaying the CV is the `CVTemplate` component, which orchestrates several sub-components to create the layout:
- `HeaderSection`: Displays the user's name, professional title, and profile image.
- `LeftSidebar`: Displays lists such as skills, languages, and contact information.
- `RightContent`: Displays the professional summary, education timeline, and work experience.

### Theming
The visual appearance of the CV is strictly controlled by a `CVTheme` object. This allows users to customize colors dynamically from the `CustomizeCVScreen` before generating the PDF.
A theme consists of the following color properties:
- `headerColor`: Background color of the top header.
- `sidebarColor`: Background color of the left sidebar.
- `accentColor`: Color used for section titles, dividers, and timeline markers.
- `sidebarText`: Text color for items in the sidebar to ensure contrast against the sidebar background.
- `mainBg`: Background color of the main content area.
- `sectionColor`: Text color for main section headings.

These theme values are passed as props down to the individual React Native components, which apply them to styling.

## 2. CV Preview Logic

The `CVPreviewScreen` is responsible for displaying the final look of the CV and providing the download/share functionality.
- It receives the user's input `data`, selected `theme`, and `language` via navigation route parameters (`route.params`).
- It renders the `CVTemplate` wrapped in a screen layout that includes a top navigation bar (with a back button) and a sticky footer with a "Download CV" button.

## 3. PDF Generation Logic

Because React Native renders to native OS views rather than the DOM, we cannot print React Native components directly to a PDF. We must translate the visual representation into HTML.

### Libraries Used
- **`expo-print`**: Used to convert HTML content into a PDF file natively on the mobile device.
- **`expo-sharing`**: Used to invoke the native sharing OS dialogue (iOS Share Sheet or Android Intent), allowing the user to save the generated PDF to their local files, send it via email, or share it through other apps.

### How It Works (The `handleDownload` function)

When the user presses the "Download CV" button, the following sequence occurs:

1. **HTML Construction**: 
   The function builds a comprehensive HTML template string. It uses JavaScript template literals (`${}`) to inject the CV `data` (names, lists, descriptions) and the selected `theme` color values directly into the HTML tags and inline CSS.
   
2. **Styling and CSS Layout**:
   The HTML includes a `<style>` block that mimics the layout of the React Native components using standard web CSS (Flexbox, margins, padding). It maps the React Native layout pixel-for-pixel to ensure the PDF looks identical to the app preview.

3. **Retaining Background Colors (Crucial Detail)**:
   By default, browser printing engines (which power `expo-print` under the hood) strip out background colors and background images to save printer ink. To force the PDF generator to include the user's selected theme colors, the global CSS includes:
   ```css
   * {
     -webkit-print-color-adjust: exact; 
     print-color-adjust: exact;
   }
   ```
   This specific rule commands the rendering engine to exactly preserve the `headerColor`, `sidebarColor`, and `mainBg` backgrounds in the final exported PDF.

4. **Generating the File**:
   `Print.printToFileAsync({ html })` is called with the constructed HTML string. This function invisibly renders the HTML in a background webview, captures the rendered output as a paginated PDF, and returns a temporary local file `uri` where the PDF is stored.

5. **Sharing/Saving**:
   Finally, `Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: '...' })` is called. This opens the native share/save dialog, letting the user choose where to store their newly generated PDF.