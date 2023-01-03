import { useEffect } from "react"
import type { User } from "../types"
import { createFetcher, getLocalStorage, setLocalStorage } from "../utils"

const REFRESH_TIMER = 60 * 1000 * 30; // 30 minutes in ms

export const useAuth = () => {
	let user = getLocalStorage<User>("user")

    useEffect(() => {
        const timerId = setInterval(() => {
            if (user) {
                const fetcher = createFetcher(user, true);
                fetcher("https://bsp-auth-prod.atoma.cloud/queue/refresh").then((result) => {
                    setLocalStorage("user", result);
                });
            }
        }, REFRESH_TIMER);
        return () => {
            clearInterval(timerId)
        }
    }, []);
}
