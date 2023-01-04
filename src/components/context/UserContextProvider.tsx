import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { User } from "../../types";
import { getLocalStorage, setLocalStorage } from "../../utils"

let ext = chrome || browser

const UserContext = createContext<User | null>(null);

export const useUser = (): User | null => {
    return useContext(UserContext);
}

/**
 * Provider for user auth information
 * @param children The children to display under this provider
 * @returns Children wrapped with user auth provider
 */
export const UserContextProvider = ({ children }: { children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
		let storedUser = getLocalStorage<User>("user")
		if (storedUser) {
			// Send initial auth data to background
			ext.runtime.sendMessage({ type: 'user-auth', user: storedUser });
		}
		setUser(storedUser || null);

		ext.runtime.onMessage.addListener((message, sender, sendResponse) => {
			if (message && message.type == "user-auth-update") {
				// Update the user info we have, and set it in local storage
				const getExpirationTimeInMs = ((message.user.ExpiresIn ?? 1800) - 300) * 1000; // Taken from account dashboard code
                const newUser = { ...message.user, RefreshAt: new Date(new Date().getTime() + getExpirationTimeInMs).getTime()};
                setUser(newUser);
				setLocalStorage("user", newUser);
			}
			sendResponse();
		});
	}, []);

    return <UserContext.Provider value={user}>
        {children}
    </UserContext.Provider>
};
