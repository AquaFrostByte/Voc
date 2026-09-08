# Vocabulary Digitizer

A lightweight, fully client-side web application designed to make digitizing vocabulary and terminology fast and painless. 

I originally built this because uploading images of vocabulary to NotebookLLM often results in missing or incorrect words, and typing them directly into Excel by hand is incredibly inefficient. This tool provides a streamlined interface to rapidly digitize terms—whether you are studying complex concepts for sociology, philosophy, and science coursework, or just learning a new language—and export them into AI tools or other learning programs.

## Features

*   **Rapid Data Entry:** Streamlined keyboard navigation allows you to jump between input fields using `Tab` and instantly save entries to the table by pressing `Enter`.
*   **CSV Export:** Click "Download Excel File" to instantly generate and download a standard `.csv` file of your vocabulary list.
*   **Copy for Google Sheets:** Automatically formats your table as Tab-Separated Values (TSV) and copies it to your clipboard. You can paste it directly into an empty Google Sheet with perfect column alignment.
*   **Smart CSV Import:** Import existing `.csv` files. The app includes a prompt to automatically split large lists into manageable, numbered chapters (e.g., 20 words per chapter).
*   **Theme Toggle:** Switch between a sleek Dark Mode and Light Mode for comfortable data entry in any lighting environment.
*   **Visual Feedback:** A dynamic table instantly renders your added vocabulary, indicating missing chapters or translations with subtle placeholders.

## How to Use

1.  Open `index.html` in your browser.
2.  Type your Chapter, Word, and Translation.
3.  Press `Enter` to log the word into the table below.
4.  When finished, either click **Download Excel File** to get your `.csv` or **Copy for Sheets** to paste your work directly into Google Drive.

## Privacy

Nothing is saved externally. The website is completely static and fully client-sided, meaning no user data is collected, tracked, or sent to any server. :P
