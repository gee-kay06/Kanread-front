export function generateCalendarSchedule(text: string, prefs: { timePerDayMins: number; deadlineDays: number }) {
  const pages = Math.ceil(text.length / 1000);
  const sessions = Math.ceil(pages * 10 / prefs.timePerDayMins);
  const schedule = [];

  const today = new Date();

  for (let i = 0; i < sessions; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() + i);
    schedule.push({
      date: day.toLocaleDateString(),
      day: day.toLocaleDateString("en-US", { weekday: "long" }),
      task: `Read section ${i + 1} of ${pages}`,
    });
  }

  return { schedule };
}
