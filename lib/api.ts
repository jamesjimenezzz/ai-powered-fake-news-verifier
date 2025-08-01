
const BASE_URL="http://127.0.0.1:8000"

export async function HelloWorld() {
    try {
        const res = await fetch("http://127.0.0.1:8000/api/hello")
        if(!res.ok) {
            throw new Error("Error fetching")
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}


export async function ClaimData(data: string) {
    try {
        const res = await fetch(`${BASE_URL}/verify`, {
            method: "POST",
            body: data
        })

        if (!res.ok) {
            const error = await res.json()
            return error.detail
        }

        const result = await res.json()
        return result
    } catch (error){
        console.log(error)
        return null
    }
}