import { useEffect } from 'react'

export function useScrollEvent(onScroll: () => void) {
    useEffect(() => {
        window.addEventListener(`scroll`, onScroll, { passive: false })
        return () => {
            window.removeEventListener(`scroll`, onScroll)
        }
    }, [])
}
