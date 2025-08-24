import { db } from "@/lib/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp, setDoc } from "firebase/firestore";



export async function POST(request: Request){
    try {
        const body = await request.json();
        if(!body){
            return new Response(JSON.stringify({
                message: "Body not found"
            }),{
                status: 403,
                headers: {
                    'content-type':'application/json'
                },
            })
        }

        const auth = getAuth()
        const userDetails = await createUserWithEmailAndPassword(auth, body.email, body.password)
        if(!userDetails){
            return new Response(JSON.stringify({
                message: "Internal server error"
            }),{
                status: 501,
                headers: {
                    'content-type':'application/json'
                },
            })
        }
        const userRef = await addDoc(collection(db, "users"), {
            uid: userDetails.user.uid,
            email: userDetails.user.email,
            displayName: userDetails.user.displayName,
            photoUrl: userDetails.user.photoURL,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        if(!userRef.id){
            throw new Error("Failed to create the document")
        }
        return new Response(JSON.stringify({
            success: true,
            userId: userDetails.user.uid,
            email: userDetails.user.email
        }),{
            status: 200,
            headers: {
                'content-type':'application/json'
            },
        })
        
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "An error occurred" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}