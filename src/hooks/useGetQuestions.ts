import { db } from '../../firebase';
import { collection, query, getDocs } from '@firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Survey } from '@/types/surveys';

const surveysCollection = collection(db, 'surveys');

const useGetQuestions = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [currentSurvey, setCurrentSurvey] = useState<Survey | null>(null);
  const surveyNumber = useRef(0);

  useEffect(() => {
    const init = async () => {
      try {
        const surveysQuery = query(surveysCollection);
        const querySnapshot = await getDocs(surveysQuery);
        const results: Survey[] = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Survey, 'id'>),
          id: doc.id,
        }));
        setSurveys(results);
        setCurrentSurvey(results[surveyNumber.current]);
      } catch (err) {
        setError('An error occurred while retrieving surveys');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const getNextSurvey = useCallback(() => {
    surveyNumber.current += 1;
    setCurrentSurvey(surveys[surveyNumber.current]);
  }, [surveys]);

  return {
    loading,
    error,
    currentSurvey,
    getNextSurvey,
    surveyNumber,
    totalNumberOfQuestons: surveys.length,
  };
};

export default useGetQuestions;
