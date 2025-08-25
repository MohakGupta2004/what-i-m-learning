import ProtectedRoutes from "@/components/ProtectedRoutes";

export default function Dashboard(){
    return <>
    <ProtectedRoutes>
        Dashboard
    </ProtectedRoutes>
        
    </>
}