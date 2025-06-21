# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Running Locally

To run this application on your local machine, follow these steps:

1.  **Install Dependencies:**
    Open your terminal and run the following command to install the necessary packages:
    ```bash
    npm install
    ```

2.  **Set Up Environment Variables:**
    This project uses Genkit with Google AI. You'll need an API key.
    *   Create a file named `.env.local` in the root of the project.
    *   Add the following line to the file, replacing `<YOUR_API_KEY>` with your actual key from [Google AI Studio](https://aistudio.google.com/app/apikey):
    ```
    GOOGLE_API_KEY=<YOUR_API_KEY>
    ```

3.  **Run the Genkit Development Server:**
    In a new terminal window, start the Genkit development server:
    ```bash
    npm run genkit:dev
    ```
    This will start the Genkit Inspector on `http://localhost:4000`.

4.  **Run the Next.js Application:**
    In another terminal window, start the Next.js development server:
    ```bash
    npm run dev
    ```
    Your application will be available at `http://localhost:9002`.
