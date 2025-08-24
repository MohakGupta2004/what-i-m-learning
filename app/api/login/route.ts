import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { headers } from "next/headers"
import { success } from "zod"

export async function POST(request: Request){
    try {
        const body = await request.json()

        const result = await signInWithEmailAndPassword(auth, body.email, body.password)
        if(!result){
            return new Response(JSON.stringify({
                message: "Couldn't able to login"
            }),{
                status: 403,
                headers: {
                    'content-type':'application/json'
                },
            })
        }
        return new Response(JSON.stringify({
            success:true,
            uid: result.user.uid
        }), {
            status: 200,
            headers:{
                'content-type':'application/json'
            }
        })
    } catch (error: any) {
        throw new Error(error)
    }
}