import "@/styles/globals.css";
import { UserContextProvider } from "@/Component/Context/User";
import { TasksContextProvider } from "@/Component/Context/Tasks";

export default function App({ Component, pageProps }) {
  return (
    <>
      <UserContextProvider>
        <TasksContextProvider>
          <Component {...pageProps} />
        </TasksContextProvider>
      </UserContextProvider>
    </>
  );
}
