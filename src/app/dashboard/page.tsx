import DashboardPage from "@/components/dashboard/main-page";
import { auth } from "@/auth";
import { getPlasticItems } from "@/lib/actions/actions";


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