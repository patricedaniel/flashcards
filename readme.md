# Flashcard Website

This is a simple flashcard website built with HTML, CSS, and JavaScript. The website displays random flashcards which flip to reveal the answer when clicked.

## Prerequisites

- Python 3.x

## Running the Website Locally

1. Navigate to the directory of your website (flashcards/www) in the terminal/command prompt.

2. Start the local server with the following command:

```bash
python3 -m http.server
```

3. Open a web browser and go to `http://localhost:8000`. You should see your website running locally.

## Troubleshooting

If Python is not recognized, it might not be installed or added to your system's PATH. Here's how you can install Python and add it to your PATH:

### For Windows:

1. Download the Python installer from the official website: https://www.python.org/downloads/
2. Run the installer. In the first screen of the installation wizard, there's an option at the bottom that says "Add Python to PATH". Make sure this option is checked.
3. Continue with the installation process.

### For Mac:

1. You can use Homebrew, a package manager for Mac. First, install Homebrew by entering the following command in Terminal: 

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Once Homebrew is installed, you can install Python with the following command:

```bash
brew install python
```

### For Linux:

Most Linux distributions come with Python pre-installed. You can check if Python is installed by opening a terminal and typing:

```bash
python3 --version
```

If Python is not installed, you can install it using your distribution's package manager. For Ubuntu, you can use the following commands:

```bash
sudo apt update
sudo apt install python3
```
```

Please note that this is a simple server for development purposes and shouldn't be used in a production environment. For deploying a production website, consider using a dedicated web server like Apache, Nginx, or a hosting platform like Azure, AWS, etc.

Enjoy coding! 😊
```