import { customAxios } from "./axios"

export const login = async () => {
    try {
        let response = await customAxios.post('/auth/sign-in', {
            email: 'timurbek@gmail.com',
            password: 'Timurbek123@'
        })
        localStorage.setItem('token', response.data['access_token'])
        return response.data
    } catch (error) {
        console.error('Login failed')
    }
}