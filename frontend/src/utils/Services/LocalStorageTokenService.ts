import { Token } from "../types/Token.type"

const getAccessToken = () => localStorage.getItem('access') || null
const getRefreshToken = () => localStorage.getItem('refresh') || null

const logout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
}

const setAccessToken = (access: string) => localStorage.setItem('access', access);
const setRefreshToken = (refresh: string) => localStorage.setItem('refresh', refresh);

const setTokens = ({ access, refresh }: Token) => {
    setAccessToken(access)
    setRefreshToken(refresh)
}

export { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, setTokens, logout }