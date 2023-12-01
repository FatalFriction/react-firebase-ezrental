import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition from 'react-speech-recognition';

const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(process.env.SPEECHLY_ID);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);
