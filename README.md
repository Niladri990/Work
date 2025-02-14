import pyttsx3
import speech_recognition as sr
import keyboard
import os
import subprocess as sp
import imdb
import wolframalpha
import pyautogui
import webbrowser
import time
from datetime import datetime
from random import choice

# Initialize text-to-speech engine
engine = pyttsx3.init('sapi5')
engine.setProperty('volume', 1.0)
engine.setProperty('rate', 220)
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[0].id)

def speak(text):
    """Convert text to speech."""
    engine.say(text)
    engine.runAndWait()

def greet_me():
    """Greet the user based on the time of day."""
    hour = datetime.now().hour
    if 6 <= hour < 12:
        speak("Good morning, sir")
    elif 12 <= hour < 16:
        speak("Good afternoon, sir")
    elif 16 <= hour < 19:
        speak("Good evening, sir")
    speak("I am Bruce Wayne. How may I assist you, sir?")

# Listening state
listening = True

def start_listening():
    """Start listening for commands."""
    global listening
    listening = True
    print("Started listening")

# Hotkeys to start and pause listening
keyboard.add_hotkey('ctrl+alt+k', start_listening)

def take_command():
    """Listen for a voice command and return it as text."""
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        r.pause_threshold = 1
        audio = r.listen(source)

    try:
        print("Recognizing...")
        query = r.recognize_google(audio, language='en-in')
        print(query)
        if 'stop' in query or 'exit' in query:
            hour = datetime.now().hour
            if 21 <= hour < 6:
                speak("Good night, sir. Take care!")
            else:
                speak("Have a good day, sir!")
            exit()
        return query.lower()
    except sr.RequestError:
        speak("Could not request results; check your network connection!")
        return 'none'
    except sr.UnknownValueError:
        speak("Sorry, I couldn't understand. Can you please repeat that?")
        return 'none'

def schedule():
    day = datetime.now().strftime("%A").lower()
    speak("Boss, today's schedule is ")
    week = {
        "monday": "Boss, from 9:00 to 9:50 you have Algorithms class, from 10:00 to 11:50 you have System Design class, from 12:00 to 2:00 you have a break, and today you have Programming Lab from 2:00 onwards.",
        "tuesday": "Boss, from 9:00 to 9:50 you have Web Development class, from 10:00 to 10:50 you have a break, from 11:00 to 12:50 you have Database Systems class, from 1:00 to 2:00 you have a break, and today you have Open Source Projects lab from 2:00 onwards.",
        "wednesday": "Boss, today you have a full day of classes. From 9:00 to 10:50 you have Machine Learning class, from 11:00 to 11:50 you have Operating Systems class, from 12:00 to 12:50 you have Ethics in Technology class, from 1:00 to 2:00 you have a break, and today you have Software Engineering workshop from 2:00 onwards.",
        "thursday": "Boss, today you have a full day of classes. From 9:00 to 10:50 you have Computer Networks class, from 11:00 to 12:50 you have Cloud Computing class, from 1:00 to 2:00 you have a break, and today you have Cybersecurity lab from 2:00 onwards.",
        "friday": "Boss, today you have a full day of classes. From 9:00 to 9:50 you have Artificial Intelligence class, from 10:00 to 10:50 you have Advanced Programming class, from 11:00 to 12:50 you have UI/UX Design class, from 1:00 to 2:00 you have a break, and today you have Capstone Project work from 2:00 onwards.",
        "saturday": "Boss, today you have a more relaxed day. From 9:00 to 11:50 you have team meetings for your Capstone Project, from 12:00 to 12:50 you have Innovation and Entrepreneurship class, from 1:00 to 2:00 you have a break, and today you have extra time to work on personal development and coding practice from 2:00 onwards.",
        "sunday": "Boss, today is a holiday, but keep an eye on upcoming deadlines and use this time to catch up on any reading or project work."
    }
    if day in week.keys():
        speak(week[day])

if __name__ == '__main__':
    greet_me()
    while True:
        if listening:
            query = take_command()

            if "how are you" in query:
                speak("I am absolutely fine sir. What about you?")

            elif "open command prompt" in query:
                speak("Opening command prompt.")
                os.system('start cmd')

            elif "open camera" in query:
                speak("Opening camera.")
                sp.run('start microsoft.windows.camera:', shell=True)

            elif "open notepad" in query:
                speak("Opening Notepad for you.")
                notepad_path = "C:\\Windows\\System32\\notepad.exe"  # Update with actual path
                os.startfile(notepad_path)

            elif "open discord" in query:
                speak("Opening Discord for you.")
                discord_path = "https://discord.com/"  # Update with actual path
                os.startfile(discord_path)

            elif "open google" in query:
                speak("Opening Google for you.")
                google_path = "https://www.google.co.in/"  # Update with actual path
                os.startfile(google_path)

            elif "youtube" in query:
                speak("Opening YouTube for you.")
                youtube_path = "https://www.youtube.com/"  # Update with actual path
                os.startfile(youtube_path)

            elif "co pilot" in query:
                speak("Opening copilot for you.")
                copilot_path = "https://copilot.microsoft.com/chats/2e3VDZvPwV91RWR4xVS1a"  # Update with actual path
                os.startfile(copilot_path)

            elif "chat gpt" in query:
                speak("Opening chat gpt for you.")
                chatgpt_path = "https://chatgpt.com/"  # Update with actual path
                os.startfile(chatgpt_path)

            elif "republic" in query:
                speak("Opening republic for you.")
                republic_path = "https://www.republicworld.com/livetv"  # Update with actual path
                os.startfile(republic_path)

            elif "amazon" in query:
                speak("Opening amazon for you.")
                amazon_path = "https://www.amazon.in/"  # Update with actual path
                os.startfile(amazon_path)

            elif "onedrive" in query:
                speak("Opening onedrive for you.")
                onedrive_path = "https://1drv.ms/f/c/0d98ebdf1ac837e4/EuQ3yBrf65gggA1xAAAAAAABTjP_iEYFBBnTKt1srh7UgQ?e=ea7eoo"  # Update with actual path
                os.startfile(onedrive_path)

            elif "github" in query:
                speak("Opening github for you.")
                git_path = "C:\\Users\\Aditya Biswas\\OneDrive\\Desktop\\GitHub Desktop.lnk"  # Update with actual path
                os.startfile(git_path)

            elif "excel" in query:
                speak("Opening ms excel for you.")
                excel_path = "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Excel.lnk"  # Update with actual path
                os.startfile(excel_path)

            elif "signal" in query:
                speak("Opening signal for you.")
                pdf_path = "C:\\Users\\Aditya Biswas\\Downloads\\Signal and System by Ayan Sir..pdf"  # Update with actual path
                os.startfile(pdf_path)

            elif "download" in query:
                speak("Opening downloads for you.")
                dl_path = "C:\\Users\\Aditya Biswas\\Downloads"  # Update with actual path
                os.startfile(dl_path)

            elif "keyboard" in query:
                speak("Opening screen keyboard for you.")
                kb_path = "C:\\Users\\Aditya Biswas\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Accessibility\\On-Screen Keyboard.lnk"  # Update with actual path
                os.startfile(kb_path)

            elif "lab" in query: 
                speak("Opening scilab for you.")
                lab_path = "C:\\Users\\Public\\Desktop\\scilab-2024.1.0 (64-bit) Desktop.lnk"  # Update with actual path
                os.startfile(lab_path)
                
            elif "system" in query:
                speak("Opening system configuration for you.")
                config_path = "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Administrative Tools\\System Configuration.lnk"  # Update with actual path
                os.startfile(config_path)

            elif "micro" in query:
                speak("Opening edge for you.")
                edge_path = "C:\\Users\\Public\\Desktop\\Microsoft Edge.lnk" # Update with actual path
                os.startfile(edge_path)

            elif "code" in query:
                speak("Opening leetcode for you.")
                code_path = "https://leetcode.com/" # Update with actual path
                os.startfile(code_path)
            
            elif "wikipedia" in query:
                speak("Opening wikipedia for you.")
                wiki_path = "https://www.wikipedia.org/" # Update with actual path
                os.startfile(wiki_path)

            elif "schedule" in query:
                ()

            
            elif "calculate" in query:
                app_id = "AIzaSyC8Y0Kh0vGYyDYofz_TP7JbLFoL-0KDYOU"  # Replace with your Wolfram Alpha app ID
                client = wolframalpha.Client(app_id)
                ind = query.lower().split().index("calculate")
                text = query.split()[ind + 1:]
                result = client.query(" ".join(text))
                try:
                    ans = next(result.results).text
                    speak("The answer is " + ans)
                    print("The answer is " + ans)
                except StopIteration:
                    speak("I couldn't find that. Please try again.")

            elif 'what is' in query or 'who is' in query or 'which is' in query:
                app_id = "YOUR_WOLFRAM_APP_ID"  # Replace with your Wolfram Alpha app ID
                client = wolframalpha.Client(app_id)
                try:
                    ind = query.lower().index('what is') if 'what is' in query.lower() else \
                        query.lower().index('who is') if 'who is' in query.lower() else \
                        query.lower().index('which is') if 'which is' in query.lower() else None
                except ValueError:
                    speak("I couldn't find that. Please try again.")
