import { Test, TestFormValues } from '@/types/tests';
import { UserProfile } from '@/types/user';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  query,
  QuerySnapshot,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore';

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});

export const auth = getAuth();

const db = getFirestore(app);

const getTestSnapshot = async (
  uid?: string
): Promise<QuerySnapshot<DocumentData>> => {
  const testsCollection = collection(db, 'tests');
  const testsQuery = uid
    ? query(testsCollection, where('createdBy', '==', uid))
    : query(testsCollection);
  const testSnapshot = await getDocs(testsQuery);
  return testSnapshot;
};

export const getAllTestsById = async (uid: string): Promise<Test[]> => {
  const testSnapshot = await getTestSnapshot(uid);
  return testSnapshot.docs.map((doc) => ({
    ...(doc.data() as Omit<Test, 'id'>),
    id: doc.id,
  }));
};

export const getAllTests = async (): Promise<Test[]> => {
  const testSnapshot = await getTestSnapshot();
  return testSnapshot.docs.map((doc) => ({
    ...(doc.data() as Omit<Test, 'id'>),
    id: doc.id,
  }));
};

export const getAllTestIds = async (): Promise<string[]> => {
  const testSnapshot = await getTestSnapshot();
  return testSnapshot.docs.map((doc) => doc.id);
};

export const getTest = async (id: string): Promise<Test> => {
  const testRef = doc(db, 'tests', id);
  const querySnapshot = await getDoc(testRef);
  return {
    ...(querySnapshot.data() as Omit<Test, 'id'>),
    id: querySnapshot.id,
  };
};

export const updateTest = async (formData: TestFormValues) => {
  const selectedTestRef = doc(db, 'tests', formData.id);
  await setDoc(selectedTestRef, formData as Record<string, any>);
};

export const createTest = async (formData: TestFormValues) => {
  const collectionRef = collection(db, 'tests');
  const { id, ...rest } = formData;
  await addDoc(collectionRef, rest);
};

export const createNewUser = async (userProfile: UserProfile) => {
  const newUserRef = doc(db, 'users', userProfile.id);
  await setDoc(newUserRef, userProfile);
};

export const getUserProfileById = async (uid: string): Promise<UserProfile> => {
  const userRef = doc(db, 'users', uid);
  const querySnapshot = await getDoc(userRef);
  return {
    ...(querySnapshot.data() as Omit<UserProfile, 'id'>),
    id: querySnapshot.id,
  };
};

export const updateUserProfile = async (userProfile: UserProfile) => {
  const selectedUserRef = doc(db, 'users', userProfile.id);
  await setDoc(selectedUserRef, userProfile);
};
