import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


export class Auth {
    static CreateProfile = async () => {
        const user = auth().currentUser
        if(user) {
          try {
        //     const currentUser = auth().currentUser
        // if (user.displayName) {
        //     await currentUser?.updateProfile({
        //         displayName : user.displayName
        //     });
        // }

        const data = {
            email : user.email ?? '',
            displayName : user.displayName ?? '',
            emailVerified : user.emailVerified,
            photoUrl : user.photoURL,
            creationTime : user.metadata.creationTime,
            lastSignInTime : user.metadata.lastSignInTime,
        };

        await firestore().collection('user').doc(user.uid).set(data);
        console.log('User Create')
        }catch (error) {
            console.log(error)
        }  
        }
        
        
    };
    static UpdateProfile = async (user : FirebaseAuthTypes.User) => {
        try {
        const data = {     
            emailVerified : user.emailVerified,
            lastSignInTime : user.metadata.lastSignInTime,
        };

        await firestore().collection('user').doc(user.uid).update(data);
        console.log('User Update')
        }catch (error) {
            console.log(error)
        }
        
    };
    
}