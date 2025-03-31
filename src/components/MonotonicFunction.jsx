import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { RefreshCw } from 'lucide-react';

const MonotonicFunction = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSteps, setShowSteps] = useState(true);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showMonotonic, setShowMonotonic] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const practiceQuestions = [
    {
      path: "M 20,50 C 60,80 100,20 180,50",
      isMonotonic: false
    },
    {
      path: "M 20,80 C 60,60 100,40 180,20",
      isMonotonic: true
    },
    {
      path: "M 20,20 Q 60,80 100,20 T 180,80",
      isMonotonic: false
    },
    {
      path: "M 20,20 L 60,40 L 120,40 L 180,80",
      isMonotonic: true
    },
    {
      path: "M 20,50 L 60,80 L 120,80 L 180,20",
      isMonotonic: false
    },
    {
      path: "M 20,80 Q 100,40 180,20",
      isMonotonic: true
    }
  ];

  const nextQuestion = () => {
    if (currentQuestion < practiceQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setUserAnswer('');
      setFeedback('');
    } else {
      setIsComplete(true);
    }
  };

  const resetQuestions = () => {
    setCurrentQuestion(0);
    setUserAnswer('');
    setFeedback('');
    setIsComplete(false);
  };

  const checkAnswer = () => {
    const normalizedAnswer = userAnswer.toLowerCase().trim();
    const isCorrect = 
      ((normalizedAnswer === 'yes') && practiceQuestions[currentQuestion].isMonotonic) ||
      ((normalizedAnswer === 'no') && !practiceQuestions[currentQuestion].isMonotonic);
    
    setFeedback(isCorrect);
    if (!isCorrect) {
      setHasError(true);
    }
  };

  const [hasError, setHasError] = useState(false);
  
  return (
    <div className="bg-gray-100 p-8 w-[780px] overflow-auto">
      <Card className="w-[748px] mx-auto shadow-md bg-white">
        <div className="bg-sky-50 p-6 rounded-t-lg w-[748px]">
          <h1 className="text-sky-900 text-2xl font-bold">Monotonic Functions</h1>
          <p className="text-sky-800">Learn how to identify and understand monotonic functions!</p>
        </div>

        <CardContent className="space-y-6 pt-6 w-[748px]">
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h2 className="text-blue-900 font-bold mb-2">What is a Monotonic Function?</h2>
            <p className="text-blue-600 mb-4">
              A function is monotonic if it either always increases or always decreases. In other words, 
              the function never switches between increasing and decreasing. There are two types:
            </p>
            <div className="flex flex-row gap-4 justify-center">
              <div className="flex-1 p-4 bg-white rounded-lg border border-blue-200">
                <h3 className="font-semibold mb-2">Strictly Monotonic</h3>
                <p className="text-sm text-gray-600 mb-2">The function strictly increases/decreases with no flat sections.</p>
                <svg viewBox="0 0 200 100" className="w-full h-24">
                  <line x1="10" y1="50" x2="190" y2="50" stroke="black" strokeWidth="1"/>
                  <line x1="100" y1="10" x2="100" y2="90" stroke="black" strokeWidth="1"/>
                  <path d="M 20,80 Q 100,20 180,20" stroke="blue" fill="none" strokeWidth="2"/>
                </svg>
              </div>
              <div className="flex-1 p-4 bg-white rounded-lg border border-blue-200">
                <h3 className="font-semibold mb-2">Weakly Monotonic</h3>
                <p className="text-sm text-gray-600 mb-2">The function increases/decreases but may have flat sections.</p>
                <svg viewBox="0 0 200 100" className="w-full h-24">
                  <line x1="10" y1="50" x2="190" y2="50" stroke="black" strokeWidth="1"/>
                  <line x1="100" y1="10" x2="100" y2="90" stroke="black" strokeWidth="1"/>
                  <path d="M 20,80 L 60,40 L 140,40 L 180,20" stroke="green" fill="none" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <p className="text-blue-600 mt-4">
              Practice identifying monotonic functions below!
            </p>
          </div>

          <Card className="border border-gray-200">
            <CardContent className="pt-4 p-6">
              <h3 className="font-semibold mb-4">Examples:</h3>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setShowMonotonic(true)}
                    className={showMonotonic ? 'bg-blue-950 hover:bg-blue-900 text-white' : 'bg-gray-200 hover:bg-gray-300'}
                  >
                    Monotonic
                  </Button>
                  <Button 
                    onClick={() => setShowMonotonic(false)}
                    className={!showMonotonic ? 'bg-blue-950 hover:bg-blue-900 text-white' : 'bg-gray-200 hover:bg-gray-300'}
                  >
                    Non-Monotonic
                  </Button>
                </div>
              </div>

              {showMonotonic ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    These functions are monotonic because they consistently move in one direction.
                    Notice how none of them change direction.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <svg viewBox="0 0 200 100" className="w-full h-20">
                          <line x1="10" y1="50" x2="190" y2="50" stroke="black" strokeWidth="1"/>
                          <line x1="100" y1="10" x2="100" y2="90" stroke="black" strokeWidth="1"/>
                          {index === 1 && <path d="M 40,70 L 160,30" stroke="purple" fill="none" strokeWidth="2"/>}
                          {index === 2 && <path d="M 40,80 L 80,40 L 120,40 C 140,40 150,20 160,15" stroke="blue" fill="none" strokeWidth="2"/>}
                          {index === 3 && <path d="M 100,80 Q 120,60 140,55 L 160,53" stroke="green" fill="none" strokeWidth="2"/>}
                          {index === 4 && <path d="M 40,80 Q 100,80 160,20" stroke="teal" fill="none" strokeWidth="2"/>}
                          {index === 5 && <path d="M 40,70 C 60,70 80,30 100,20 C 120,10 140,10 160,10" stroke="orange" fill="none" strokeWidth="2"/>}
                          {index === 6 && <path d="M 40,50 L 160,50" stroke="red" fill="none" strokeWidth="2"/>}
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    These functions are non-monotonic because they change direction.
                    Notice how each one switches between increasing and decreasing.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <svg viewBox="0 0 200 100" className="w-full h-20">
                          <line x1="10" y1="50" x2="190" y2="50" stroke="black" strokeWidth="1"/>
                          <line x1="100" y1="10" x2="100" y2="90" stroke="black" strokeWidth="1"/>
                          {index === 1 && <path d="M 20,20 Q 100,90 180,20" stroke="blue" fill="none" strokeWidth="2"/>}
                          {index === 2 && <path d="M 20,40 L 100,80 L 180,40" stroke="purple" fill="none" strokeWidth="2"/>}
                          {index === 3 && <path d="M 40,50 C 60,20 80,20 100,50 C 120,80 140,80 160,50" stroke="red" fill="none" strokeWidth="2"/>}
                          {index === 4 && <path d="M 20,50 Q 60,20 100,50 T 180,20" stroke="orange" fill="none" strokeWidth="2"/>}
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-purple-900 font-bold">Practice Time!</h2>
              <div className="flex gap-2">
                {[0,1,2,3,4,5].map((num) => (
                  <div
                    key={num}
                    className={`rounded-full transition-all duration-300 ${
                      num < currentQuestion ? 'w-3 h-3 bg-green-500' : 
                      num === currentQuestion ? (num === 5 && isComplete ? 'w-3 h-3 bg-green-500' : 'w-2 h-2 bg-purple-600 mt-0.5') : 
                      'w-3 h-3 bg-purple-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-4">
              <p className="mb-4">Look at this function:</p>
              <svg viewBox="0 0 200 100" className="w-full h-32 mb-4">
                <path d={practiceQuestions[currentQuestion].path} stroke="blue" fill="none" strokeWidth="2"/>
                <line x1="10" y1="90" x2="190" y2="90" stroke="black" strokeWidth="1"/>
                <line x1="20" y1="10" x2="20" y2="90" stroke="black" strokeWidth="1"/>
              </svg>
              <p className="mb-2">Is this function monotonic?</p>
              <div className="space-y-4">
                {!feedback ? (
                  <div className="flex items-center gap-4">
                    <Input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => {
                        setUserAnswer(e.target.value);
                        setHasError(false);
                      }}
                      placeholder="Enter yes or no"
                      className={`flex-1 ${hasError ? 'border-red-500' : 'border-blue-300'}`}
                    />
                    <div className="flex gap-4">
                      <Button 
                        onClick={checkAnswer}
                        className="bg-blue-400 hover:bg-blue-500"
                      >
                        Check
                      </Button>
                      <Button
                        onClick={() => {
                          setFeedback(true);
                          setHasError(false);
                        }}
                        className="bg-gray-400 hover:bg-gray-500 text-white"
                      >
                        Skip
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-green-600 font-bold text-lg">
                    {userAnswer.toLowerCase().includes('yes') ? 'Yes' : 'No'}, this function is {practiceQuestions[currentQuestion].isMonotonic ? '' : 'not '}monotonic!
                  </p>
                )}
                {feedback !== '' && (
                  <div className="space-y-4">
                    {!isComplete && feedback && currentQuestion < practiceQuestions.length - 1 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="text-green-800 text-xl font-bold">Great Work!</h3>
                        <p className="text-green-700">
                          You've correctly identified this function!
                        </p>
                        <Button
                          onClick={nextQuestion}
                          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          Next Question
                        </Button>
                      </div>
                    )}
                    {feedback && currentQuestion === practiceQuestions.length - 1 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="text-green-800 text-xl font-bold">Congratulations!</h3>
                        <p className="text-green-700">
                          You've completed all the practice questions!
                        </p>
                        <Button
                          onClick={resetQuestions}
                          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Start Over
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-gray-600 mt-4">
        Understanding monotonic functions is essential for calculus and mathematical analysis!
      </p>
    </div>
  );
};

export default MonotonicFunction;