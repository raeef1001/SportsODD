# Sports Match Betting Odds

This is a Next.js project that displays sports match betting odds data. It is a client-side component built with React and uses a UI component library (e.g., shadcn/ui) and Tailwind CSS for styling and responsive design.

## Features

### 1. Search Functionality
- **Search Input Field**: Users can search for matches by entering a match ID or team name.
- **Dynamic Suggestions**: Displays a dropdown list of matching results while typing in the search bar.
- **Selection Behavior**: Clicking on a suggestion updates the displayed match details.

### 2. Match Details Display
- Displays key match information including:
  - Match date (formatted as `DD MMM YYYY`).
  - Competing teams (e.g., "Team A vs Team B").

### 3. Betting Odds Tables
- **Grouped by Odd Types**: Odds are organized into tables based on their types (e.g., `3Way Result`, `Asian Handicap`, etc.).
- **Bookmaker Odds**: Each table lists bookmakers and their respective odds for the match.
- **Visual Indicators**:
  - Bookmakers with stopped betting are marked with a `Stopped` badge.
  - Odd values greater than `2.00` are highlighted with a distinct green color for better visibility.

## Demo

![Demo Video](task1.mp4)

## Utility Functions

### 1. `formatDate`
- **Description**: Converts date strings from `DD.MM.YYYY` format to a localized format (`e.g., Jan 01, 2024`).
- **Implementation**: Uses JavaScript's `Date` object and `toLocaleDateString()` method.

### 2. `formatOddValue`
- **Description**: Formats betting odds values to two decimal places.
- **Example**: `1.234` becomes `1.23`.

### 3. `getBookmakers`
- **Description**: Ensures bookmaker data is handled consistently whether it's an array or a single object.

## Technologies Used

- **Next.js**: Framework for server-rendered React applications.
- **React**: JavaScript library for building user interfaces.
- **shadcn/ui**: Component library for building accessible and customizable UI components.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Project Structure

```
project/
├── components/
│   ├── ui/
│   │   ├── table.js          # Table components for displaying bookmaker odds
│   │   ├── input.js          # Search input component
│   │   ├── card.js           # Card component for match details
│   │   ├── badge.js          # Badge component for stopped bookmakers
│   ├── utils.js              # Utility functions (e.g., formatting functions)
├── data/
│   ├── matches.json          # Sample match data in JSON format
├── pages/
│   ├── index.js              # Main page displaying the match data
└── public/
    ├── assets/               # Static assets
```

## How to Run

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/sports-betting-odds.git
   cd sports-betting-odds
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Deployment

To deploy the app, you can use any platform that supports Next.js (e.g., Vercel, Netlify).

1. **Build the Project**:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Start the Production Server**:
   ```bash
   npm start
   # or
   yarn start
   ```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- [shadcn/ui](https://shadcn.dev/) for the UI components.
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.

---

**Enjoy the project and happy coding!**

