import { ReactElement, ReactNode } from "react"
import { SWRConfig } from "../node_modules/swr/core/dist/index"
import { FetchProvider } from "./FetchProvider"
import { Layout } from "./Layout"
import { Loading } from "./Loading"
import { Title } from "./Title"
import { useUser } from "./useUser"

export function App(): ReactElement {
  let user = useUser()

  if (!user) {
    return (
      <>
        <Title>Armoury Exchange</Title>
        <Loading />
      </>
    )
  }

  return (
    <FetchProvider user={user}>
      <SWRConfig>
        <Layout />
      </SWRConfig>
    </FetchProvider>
  )
}

//
// function Countdown({ until }: { until: number }): ReactElement {
//   let [mins, setMins] = useState(Math.ceil((until - Date.now()) / 1000 / 60));
//
//   useEffect(() => {
//     let intervalId = setInterval(() => {
//       setMins(Math.ceil((until - Date.now()) / 1000 / 60));
//     }, 1000);
//     return () => clearInterval(intervalId);
//   });
//
//   return <>{`${mins} minutes`}</>;
// }
//
// function Divider() {
//   return <hr className="MuiDivider-root MuiDivider-fullWidth css-pj146d" />;
// }
//
// function Title({ children }: { children: ReactNode }) {
//   return (
//     <div className="MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label css-z9o674">
//       {children}
//     </div>
//   );
// }
//
