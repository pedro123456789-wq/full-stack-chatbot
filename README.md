# Website Chatbot

A responsive chatbot designed to enhance user interaction on websites. The chatbot appears at the bottom right of the screen and can be expanded to provide a more interactive experience. This project uses React.js for the front-end and a Python Flask server for the back-end, incorporating the Llama 7B model from Hugging Face for natural language processing.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
- 🗨️ **Interactive Chatbot**: The chatbot appears at the bottom right and expands upon user interaction.
- ⚡ **React.js Front-End**: A dynamic and responsive front-end built with React.js.
- 🔥 **Python Flask Back-End**: A lightweight back-end server built with Flask to handle chatbot requests.
- 🤖 **Llama 7B Model Integration**: Utilizes Hugging Face's Llama 7B model for advanced natural language processing and conversation generation.
- 🚀 **Local NLP Model**: Runs the Llama 7B model locally for better control and privacy of user interactions.


## Installation

### Prerequisites
- **Node.js** (v14 or later)
- **Python** (v3.8 or later)
- **Flask** and other Python dependencies (listed in `requirements.txt`)
- [Hugging Face Transformers](https://huggingface.co/transformers/installation.html)

### Front-End Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/website-chatbot.git
    cd website-chatbot
    ```
2. Navigate to the front-end directory and install dependencies:
    ```bash
    cd frontend
    npm install
    ```
3. Start the React development server:
    ```bash
    npm start
    ```
   This will start the front-end server on `http://localhost:3000`.

### Back-End Setup
1. Navigate to the back-end directory and create a virtual environment:
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```
2. Install Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3. Run the Flask server:
    ```bash
    flask run
    ```
   The back-end server will start on `http://localhost:5000`.

### Hugging Face Model Setup
1. Download the Llama 7B model from Hugging Face:
   Follow the instructions on the [Llama 7B model page](https://huggingface.co/) to download the model locally.
2. Update the Flask server code to load the model from the local path.

## Usage
1. Start both the front-end and back-end servers as described above.
2. Open `http://localhost:3000` in your browser.
3. Interact with the chatbot located at the bottom right of the screen.

## Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

Please make sure to update tests as appropriate.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For any questions or support, please open an issue or contact me at [your-email@example.com].
