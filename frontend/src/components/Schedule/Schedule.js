import React from 'react';
import styles from '../../css/Schedule/Schedule.module.css';
import Footer from '../Entrypage/Footer';
import { OrganizerHeader } from './OrganizerHeader';

const scheduleItems = [
  { task: "Task", timeframe: "Timeframe", isHeader: true },
  { task: "Finalize conference theme", timeframe: "12 months out" },
  { task: "Secure keynote speakers", timeframe: "10 months out" },
  { task: "Book venue and accommodations", timeframe: "9 months out" },
  { task: "Open registration for attendees", timeframe: "6 months out" },
  { task: "Plan marketing and promotions", timeframe: "5 months out" },
  { task: "Confirm breakout session topics", timeframe: "4 months out" },
  { task: "Print conference materials", timeframe: "1 month out" },
  { task: "Conduct final walkthrough", timeframe: "1 week out" },
  { task: "Kick off the conference", timeframe: "Event Day" },
  { task: "Send post-conference surveys", timeframe: "1 week after" }
];

export const Schedule = () => {
  return (
    <div>
      <OrganizerHeader/>
      <div className={styles.scheduleContainer}>
      <div className={styles.scheduleWrapper}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/59b67e67c3874076a87cf06ee3b80a6b/89f2c8c34e6fba904e56b26225eb88ff38d340823b0fb2c94d6209fa8e55d298?apiKey=59b67e67c3874076a87cf06ee3b80a6b&"
          className={styles.backgroundImage}
          alt=""
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/59b67e67c3874076a87cf06ee3b80a6b/23713892560ccb560e5524c5ec7c8c9745d7fb08befc3f8ed1691b3b2f2a1515?apiKey=59b67e67c3874076a87cf06ee3b80a6b&"
          className={styles.logoImage}
          alt="Company Logo"
        />
        <h1 className={styles.scheduleTitle}>Schedule</h1>
        
        {/* Items being mapped according to function below. */}
        {scheduleItems.map((item, index) => (
          <ScheduleRow
            key={index}
            task={item.task}
            timeframe={item.timeframe}
            isHeader={item.isHeader}
          />
        ))}
        
        <button className={styles.viewButton}>
          View Current Conferences
        </button>
      </div>
    </div>
    <Footer/>
    </div>
    
  );
};

const ScheduleRow = ({ task, timeframe, isHeader }) => {
  // Checks if it is reegular or heading class puts accordingly in table.
  const rowClass = isHeader ? styles.headerRow : styles.scheduleRow;
  const bgClass = isHeader ? styles.whiteBackground : '';
  
  return (
    <div className={`${rowClass} ${bgClass}`}>
      <div className={styles.rowContent}>
        <div>{task}</div>
        <div>{timeframe}</div>
      </div>
    </div>
  );
};

export default Schedule;
