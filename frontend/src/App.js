import './App.css';
import EventEase from './components/Entrypage/EventEase';
import { BrowserRouter as Router, Route, Routes, Link, Switch } from 'react-router-dom';
import LoginScreen from './components/LoginPage/LoginScreen';
import SignupScreen from './components/SignupPage/SignupScreen';
import ConferenceCreation from './components/ConferenceCreation/ConferenceCreation';
import ConferenceCreationForm from './components/ConferenceCreationForm/ConferenceCreation';
import ConferenceCreationAssignChairs from './components/ConferenceCreationAssignChairs/ConferenceCreationAssignChairs';
// Done.
import { OrganizerPage } from './components/AssignChair/OrganizerPage';
import {ReviewerPage} from './components/Assign Reviewer/ReviewerPage'
import {SessionChairPage} from './components/AssignSessionChair/SessionChairPage'

// Testing:
import { Schedule } from './components/Schedule/Schedule';
function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<EventEase/>}/>
          <Route path="/home" element={<EventEase/>}/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/organize" element={<ConferenceCreation />} />

          <Route path="/conference-form" element={<ConferenceCreationForm />} />
          <Route path="/see-program-chairs" element={<ConferenceCreationAssignChairs />} />
          <Route path="/add-program-chairs" element={< OrganizerPage/>} />
          <Route path="/see-reviewers" element={< ReviewerPage/>} />
          <Route path="/see-session-chair" element={< SessionChairPage/>} />
          <Route path="/schedule" element={< Schedule/>} />
        </Routes>
    </Router>
    </>
  );
}

export default App;
