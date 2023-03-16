import { db } from '../../firebase';
import { collection, query, getDocs } from '@firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Survey } from '@/types/surveys';

const surveysCollection = collection(db, 'surveys');

const useGetSurveys = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [surveys, setSurveys] = useState<Survey[]>([]);

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
      } catch (err) {
        setError('An error occurred while retrieving surveys');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return {
    loading,
    error,
    surveys,
  };
};

export default useGetSurveys;
