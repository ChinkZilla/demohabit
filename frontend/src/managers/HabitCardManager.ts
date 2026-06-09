
import type { Habit } from "../utils/DataBaseTypes";

/***
 * retrieves the data for a given habit based on its ID.
 * returns a habit object containing the icon, description, and name.
 */
async function getHabitDataByID(habitId: number) : Promise<Habit> {
    //Todo: implement actual data fetching logic based on habitId, for now we will return a placeholder habit object with the provided habitId and dummy data for the other fields.
    let response = await fetch(`http://localhost:8080/habits/${habitId}`);
    const habit: Habit = await response.json(); // Placeholder for actual data fetching logic based on habitId
    return habit;    
}
/***
 * retrieves all habits for current day based on user id and todays date
 * returns a Habit List containing all habit info
 */
async function getHabitDataByUserIDandDate(userID:string, date: string): Promise<Habit[]> {
    // Todo: implement actual data fetching logic based on userID, for now we will return a placeholder habit list with dummy data.
    const response = await fetch(`http://localhost:8080/users/${encodeURIComponent(userID)}/habits/date=${encodeURIComponent(date)}`);
    const habits: Habit[] = await response.json(); // Placeholder for actual data fetching logic based on userID
    return habits;
}

async function logHabit(habitID: number): Promise<void> {
  await fetch(
    `http://localhost:8080/habits/${habitID}/log`,
    {
      method: "POST",
    }
  );
}

 export {getHabitDataByID, getHabitDataByUserIDandDate, logHabit};