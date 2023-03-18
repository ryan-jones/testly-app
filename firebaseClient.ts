import { SurveyFormValues } from '@/pages/dashboard/surveys';
import { Survey } from '@/types/surveys';
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

const getSurveySnapshot = async (
  uid?: string
): Promise<QuerySnapshot<DocumentData>> => {
  const surveysCollection = collection(db, 'surveys');
  const surveysQuery = uid
    ? query(surveysCollection, where('createdBy', '==', uid))
    : query(surveysCollection);
  const surveySnapshot = await getDocs(surveysQuery);
  return surveySnapshot;
};

export const getAllSurveysById = async (uid: string): Promise<Survey[]> => {
  const surveySnapshot = await getSurveySnapshot(uid);
  return surveySnapshot.docs.map((doc) => ({
    ...(doc.data() as Omit<Survey, 'id'>),
    id: doc.id,
  }));
};

export const getAllSurveys = async (): Promise<Survey[]> => {
  const surveySnapshot = await getSurveySnapshot();
  return surveySnapshot.docs.map((doc) => ({
    ...(doc.data() as Omit<Survey, 'id'>),
    id: doc.id,
  }));
};
export const getAllSurveyIds = async (): Promise<string[]> => {
  const surveySnapshot = await getSurveySnapshot();
  return surveySnapshot.docs.map((doc) => doc.id);
};

export const getSurvey = async (id: string): Promise<Survey> => {
  const surveyRef = doc(db, 'surveys', id);
  const querySnapshot = await getDoc(surveyRef);
  return {
    ...(querySnapshot.data() as Omit<Survey, 'id'>),
    id: querySnapshot.id,
  };
};

export const updateSurvey = async (formData: SurveyFormValues) => {
  const selectedSurveyRef = doc(db, 'surveys', formData.id);
  await setDoc(selectedSurveyRef, formData as Record<string, any>);
};

export const createSurvey = async (formData: SurveyFormValues) => {
  const collectionRef = collection(db, 'surveys');
  const { id, ...rest } = formData;
  await addDoc(collectionRef, rest);
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
