import DashboardPage from "@/components/dashboard/main-page";
import { auth } from "@/auth";
import { getPlasticItems } from "@/lib/actions/actions";

// const getPreviousMonthDate = () => {
//   const now = new Date(); // Current date
//   const currentYear = now.getFullYear();
//   const currentMonth = now.getMonth(); // 0 for January, 11 for December

//   // Calculate the previous month
//   const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // If January, set to December
//   const year = currentMonth === 0 ? currentYear - 1 : currentYear; // If January, decrement the year

//   // Create a date for the first day of the previous month
//   const firstDayOfPreviousMonth = new Date(year, previousMonth, 1);

//   return firstDayOfPreviousMonth.toISOString(); // Returns the date in ISO format
// };

export default async function Home() {
  const user = await auth().then((session) => { 
    return session?.user;
  });

  if (!user?.email) {
    return <div>Loading...</div>;
  }

  const items = await getPlasticItems({ email: user?.email });
  
  return (
        <div>
      <DashboardPage user={user} items={items} />
        </div>
    )
 }