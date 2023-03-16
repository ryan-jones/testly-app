import { firestore } from '../../firebase';
import { collection, query, getDocs } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { Question } from '@/types/questions';

const questionsCollection = collection(firestore, 'questions');

const useGetQuestions = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const questionsQuery = query(questionsCollection);
        const querySnapshot = await getDocs(questionsQuery);
        const results: Question[] = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Question, 'id'>),
          id: doc.id,
        }));
        setQuestions(results);
      } catch (err) {
        setError('An error occurred while retrieving questions');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return { loading, error, questions };
};

export default useGetQuestions;
