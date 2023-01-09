// @ts-ignore
import React, { useContext, useEffect } from "react"

export const ContextDumper = ({context, callback}: {context: any, callback: any}) => {
    const contextValue = useContext(context)
    useEffect(() => {
        callback(contextValue)
    }, [contextValue])
    
    return <div></div>
}