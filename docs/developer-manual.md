# To&From is a translate application designed to reduce communication barriers in classrooms, workplaces, healthcare settings, and multilingual communities.

## Developer: Jessica Ononye
### Vercel Deployment Link: https://vercel.com/jessica2077s-projects/inst-377-final-project/5zH8YktFi2Jo12D6UcnfVmZyCuqW
### GitHub Repository: git@github.com:jessica2077/INST377-Final-Project.git

This application uses:

- React
- HTML
- CSS
- Javascript
- Node.js
- Express.js
- Supabase
- LibreTranslate API
- MyMemory Translation API
- Argos Open Tech APi

### Basic Requirements:
1. To Install application please clone this repository onto your own device.

2. Ensure that you have Node.js installed on your device of choosing.

3. Create a file named `.env` with the following formation
--SUPABASE_URL=[your project url]
--SUPABASE_KEY=[your project key]

Run the server and then run the frontend(public) portion.
--Make sure your server runs with the following:`PORT=5001 node -r dotenv/config server/server.js`

To run tests do the following:
- npm test

To configure API do the following: 

## Frontend API

GET /languages -> Connects to translation provider to retrieve a list of language names
GET /translate -> Formats a call to MyMemory Translation api mirror, and returns it
POST /saveTranslation -> Creates a history row

## Future Development
- Auto Language Detection
- Speech-to-Text Translation
- Text-to-speech output

## Additional Improvements 
- Further language support
- Testing out different language APis.
- How to better use LibreTranslate API to populate languages without any crashed.
