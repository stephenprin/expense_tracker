import { firestore } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/type";
import { doc, updateDoc } from "@firebase/firestore";

export const updateUser = async (uid: string, updatedData: UserDataType):Promise<ResponseType> => { 
    try {
        //image update uplaod later
        const userRef = doc(firestore, "users", uid);
        await updateDoc(userRef, updatedData);
   ;
        return { success: true, msg:"updated successfully" };
    } catch (error:any) {
        console.error("Error updating user:", error);
        return { success: false, msg: error?.message };
    }
}