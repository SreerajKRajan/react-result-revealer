import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { UserInfoForm, UserInfo } from '@/components/questionnaire/UserInfoForm';
import { WelcomeScreen } from '@/components/questionnaire/WelcomeScreen';
import { QuestionRenderer } from '@/components/questionnaire/QuestionRenderer';
import { ProgressBar } from '@/components/questionnaire/ProgressBar';
import { ResultsScreen } from '@/components/questionnaire/ResultsScreen';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Answers } from '@/types/questionnaire';
import { questionnaireData } from '@/data/questionnaireData';
import { evaluateResults } from '@/utils/resultEvaluator';

type Screen = 'userInfo' | 'welcome' | 'questionnaire' | 'results';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('userInfo');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const currentSection = questionnaireData.sections[currentSectionIndex];
  const totalSections = questionnaireData.sections.length;

  const handleAnswer = (questionId: string, value: string | number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentSectionIndex < totalSections - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Move to results
      setScreen('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleUserInfoSubmit = (data: UserInfo) => {
    setUserInfo(data);
    setScreen('welcome');
  };

  const handleStart = () => {
    setScreen('questionnaire');
  };

  const handleReview = () => {
    setScreen('questionnaire');
    setCurrentSectionIndex(0);
  };

  // Get visible questions (those that meet conditional criteria)
  const getVisibleQuestions = () => {
    return currentSection.questions.filter((question) => {
      if (!question.conditionalOn) return true;

      const dependentAnswer = answers[question.conditionalOn.questionId];
      const requiredValue = question.conditionalOn.value;

      if (Array.isArray(requiredValue)) {
        return requiredValue.includes(String(dependentAnswer));
      }
      return dependentAnswer === requiredValue;
    });
  };

  // Check if current section has any answers
  const hasAnswersInSection = () => {
    const visibleQuestions = getVisibleQuestions();
    return visibleQuestions.some((q) => answers[q.id] !== undefined);
  };

  if (screen === 'userInfo') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <UserInfoForm onSubmit={handleUserInfoSubmit} />
        <Footer />
      </div>
    );
  }

  if (screen === 'welcome') {
    return (
      <div className="min-h-screen flex flex-col">
      <Header />

      <WelcomeScreen
        onStart={handleStart}
        data={questionnaireData.welcome}
      />
      <Footer />
      </div>

    );
  }

  if (screen === 'results') {
    const results = evaluateResults(answers, questionnaireData.results);
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <ResultsScreen
            results={results}
            thankYouData={questionnaireData.thankYou}
            onReview={handleReview}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background via-background to-secondary/20 p-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Card className="p-6 md:p-10 animate-fade-in">
            <ProgressBar
              current={currentSectionIndex + 1}
              total={totalSections}
              sectionTitle={currentSection.title}
            />

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {currentSection.title}
                </h2>
                {currentSection.description && (
                  <p className="text-muted-foreground">
                    {currentSection.description}
                  </p>
                )}
              </div>

              <div className="space-y-8">
                {currentSection.questions.map((question) => (
                  <QuestionRenderer
                    key={question.id}
                    question={question}
                    answer={answers[question.id]}
                    onAnswer={handleAnswer}
                    allAnswers={answers}
                  />
                ))}
              </div>

              <div className="flex gap-4 pt-8 border-t border-border">
                {currentSectionIndex > 0 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>
                )}

                <Button
                  onClick={handleNext}
                  className="ml-auto gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {currentSectionIndex < totalSections - 1 ? 'Next Section' : 'View Results'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
