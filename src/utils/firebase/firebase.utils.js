import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import {
   getFirestore,
   doc,
   getDoc, 
   setDoc,
} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBow7l19AsVlJLmbzA06jP19wxX4ReiDqM",
    authDomain: "crwn-clothing-db-c83ba.firebaseapp.com",
    projectId: "crwn-clothing-db-c83ba",
    storageBucket: "crwn-clothing-db-c83ba.appspot.com",
    messagingSenderId: "718093024810",
    appId: "1:718093024810:web:6af1968c43618245628d53",
    measurementId: "G-E7VCJD8BL1"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    console.log(userAuth);
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef)
    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot)
    console.log(userSnapshot.exists())

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email,  createdAt
            })
        } catch (err) {
            console.log('error creating the user', err.message);
        }
    }

    return userDocRef;
}