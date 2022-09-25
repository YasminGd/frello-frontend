import React, { useEffect } from "react"

export const useClickOutside = (ref, callback) => {
    const handleClick = e => {
        console.log('e.target: ', e.target)
        if (ref.current && !ref.current.contains(e.target)) {
            callback()
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    })
}