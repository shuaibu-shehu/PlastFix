'use client'

import { useEffect } from "react"
import LogItemModal from "../modals/log-item-modal"
import React from "react"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = React.useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
           <LogItemModal/>
        </>
    )
}