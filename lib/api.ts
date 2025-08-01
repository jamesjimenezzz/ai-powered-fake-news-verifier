

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