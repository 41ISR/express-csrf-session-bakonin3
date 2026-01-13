import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import useAppStore from "../store/useAppStore"
import Leaderboard from "../components/Leaderboard"

const Index = () => {
    const navigate = useNavigate()
    const formRef = useRef(null)
    const { user, getCsrfToken, csrfToken } = useAuthStore()
    const { currentClicks, setCurrentClicks } = useAppStore()
    // const [clicks, setClicks] = useState(0)
    // const clickRef = useRef(null)
    useEffect(() => {
        getCsrfToken()
        const interval = setInterval(() => {
            formRef.current && handleSubmit()
        }, 500)
        return () => { clearInterval(interval) }
    }, [])


    useEffect(() => {
        setCurrentClicks(user.user.clicks)
    }, [user])
    const handleClick = () => {
        setCurrentClicks(currentClicks + 1)
    }

    const handleLogout = () => {
        navigate("/logout")
    }

    const handleSubmit = async () => {
        try {
            const res = await fetch("https://improved-train-g7jjg65vw5rfvwgg-3000.app.github.dev/click",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "X-CSRF-Token": useAuthStore.getState().csrfToken,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ clicks: useAppStore.getState().currentClicks })
                }
            )
            const data = await res.json()
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="container">

            <div className="header">
                <h1>🎮 Кликер Игра</h1>
                <div className="user-info">
                    <span><strong>{user.user.email}</strong></span>
                    <button onClick={handleLogout} className="logout-btn">Выйти</button>
                </div>
            </div>
            <div className="game-area">

                <div className="click-counter">
                    <h2>Твои клики</h2>
                    <div className="clicks-display">{currentClicks}</div>
                    <form onSubmit={(e) => e.preventDefault()} ref={formRef}>
                        <button className="click-button" onClick={handleClick}>👆 КЛИКНИ!</button>
                    </form>
                </div>

                <Leaderboard />

            </div>
        </div>
    )
}

export default Index