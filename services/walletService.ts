import { ResponseType, WalletType } from "@/type";
import { upLoadFileToCloudinary } from "./imageServices";
import { collection, deleteDoc, doc, setDoc } from "@firebase/firestore";
import { firestore } from "@/config/firebase";

export const createOrUpdateWallet = async (
  walletData: Partial<WalletType>
): Promise<ResponseType> => {
  try {
    let walletToSave = { ...walletData };
    if (walletData?.image) {
      const imageUploadRes = await upLoadFileToCloudinary(
        walletData.image,
        "wallets"
      );

      if (!imageUploadRes.success) {
        return {
          success: false,
          msg: imageUploadRes.msg || " Failed to upload the wallet icon",
        };
      }
      walletToSave.image = imageUploadRes.data;
    }
    if (!walletData?.id) {
      walletToSave.amount = 0;
      walletToSave.totalExpenses = 0;
      walletToSave.totalIncome = 0;
      walletToSave.created = new Date();
    }
    const walletRef = walletData?.id
      ? doc(firestore, "wallets", walletData?.id)
      : doc(collection(firestore, "wallets"));

    Object.keys(walletToSave).forEach((key) => {
      if (walletToSave[key] === undefined) {
        delete walletToSave[key];
      }
    });

    await setDoc(walletRef, walletToSave, { merge: true });

    return { success: true, data: { ...walletToSave, id: walletRef.id } };
  } catch (error: any) {
    console.error("Error updating wallet:", error);
    return { success: false, msg: error?.message };
  }
};

export const deleteWallet = async (walletId: string): Promise<ResponseType> => {
  try {
    const walletRef = doc(firestore, "wallets", walletId);
    await deleteDoc(walletRef);

    //Delete all transaction related to this wallet
    return { success: true, msg: "Wallet deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting wallet:", error);
    return { success: false, msg: error?.message };
  }
};
