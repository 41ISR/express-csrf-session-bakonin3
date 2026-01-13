import { useEffect } from "react"
import useAppStore from "../store/useAppStore"
const Leaderboard = () => {
    const { leaderboard, setLeaderboard } = useAppStore()

    const updateLeaderboard = async () => {
        try {
            const res = await fetch("https://improved-train-g7jjg65vw5rfvwgg-3000.app.github.dev/leaderboard")

            if (!res.ok) throw new Error(res.error)

            const data = await res.json()

            if (!data) return

            setLeaderboard(data)          
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        updateLeaderboard()
        const interval = setInterval(() => {
            updateLeaderboard()
        }, 500)
        return () => {clearInterval(interval)}
    }, [])
    
    return (
        <div className="leaderboard">
            <h2>🏆 Топ-10 игроков</h2>
            <ol>
                {leaderboard.sort((a, b) => b.clicks - a.clicks).map((el, i) => (
                    <li key={el.id}>
                        <span className="rank">#{i + 1}</span>
                        <span className="username">{el.email}</span>
                        <span className="score">{el.clicks} кликов</span>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default Leaderboard