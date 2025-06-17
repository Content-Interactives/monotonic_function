import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { RefreshCw } from 'lucide-react';

const MonotonicFunction = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showMonotonic, setShowMonotonic] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [hasError, setHasError] = useState(false);

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
      path: "M 20,20 L 60,40 L 120,40 L 180,80",
      isMonotonic: true
    },
    {
      path: "M 20,20 Q 60,80 100,20 T 180,80",
      isMonotonic: false
    },
    {
      path: "M 20,50 L 60,80 L 120,80 L 180,20",
      isMonotonic: false
    },
    {
      path: "M 20,20 C 60,40 100,60 180,80",
      isMonotonic: true
    }
  ];

  const nextQuestion = () => {
    if (currentQuestion < practiceQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setUserAnswer('');
      setFeedback('');
      setHasError(false);
    } else {
      setIsComplete(true);
    }
  };

  const resetQuestions = () => {
    setCurrentQuestion(0);
    setUserAnswer('');
    setFeedback('');
    setIsComplete(false);
    setHasError(false);
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

  return (
    <>
      <style>{`
        @property --r {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }

        .glow-button { 
          min-width: auto; 
          height: auto; 
          position: relative; 
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          transition: all .3s ease;
          padding: 7px;
        }

        .glow-button::before {
          content: "";
          display: block;
          position: absolute;
          background: rgb(250, 245, 255);
          inset: 2px;
          border-radius: 4px;
          z-index: -2;
        }

        .simple-glow {
          background: conic-gradient(
            from var(--r),
            transparent 0%,
            rgb(0, 255, 132) 2%,
            rgb(0, 214, 111) 8%,
            rgb(0, 174, 90) 12%,
            rgb(0, 133, 69) 14%,
            transparent 15%
          );
          animation: rotating 3s linear infinite;
          transition: animation 0.3s ease;
        }

        .simple-glow.stopped {
          animation: none;
          background: none;
        }

        @keyframes rotating {
          0% {
            --r: 0deg;
          }
          100% {
            --r: 360deg;
          }
        }
      `}</style>
      <div className="w-[500px] h-auto mx-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] bg-white rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[#5750E3] text-sm font-medium select-none">Monotonic Functions Practice</h2>
            <button
              onClick={resetQuestions}
              className="text-gray-500 hover:text-gray-700 text-sm px-3 py-1 rounded border border-gray-300 hover:border-gray-400 transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Practice Section */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-purple-900 font-bold">Question {currentQuestion + 1}</h2>
              <div className="flex gap-2">
                {[0,1,2,3,4,5].map((num) => (
                  <div
                    key={num}
                    className={`rounded-full transition-all duration-300 ${
                      num < currentQuestion || (num === 5 && currentQuestion === 5 && feedback) ? 'w-3 h-3 bg-[#008545]' : 
                      num === currentQuestion ? 'w-2 h-2 bg-[#5750E3] mt-0.5' : 
                      'w-3 h-3 bg-purple-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <p className="font-medium text-sm">Look at this function:</p>
              <svg viewBox="0 0 200 100" className="w-full h-32 mt-4">
                <path d={practiceQuestions[currentQuestion].path} stroke="blue" fill="none" strokeWidth="2"/>
                <line x1="10" y1="90" x2="190" y2="90" stroke="black" strokeWidth="1"/>
                <line x1="20" y1="10" x2="20" y2="90" stroke="black" strokeWidth="1"/>
              </svg>
              <p className="mt-4 font-semibold text-sm">Is this function monotonic?</p>
            </div>

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
                    className={`flex-1 ${hasError ? 'border-yellow-500' : 'border-gray-200'} bg-white`}
                  />
                  <div className="glow-button simple-glow flex gap-4">
                    <Button 
                      onClick={checkAnswer}
                      className="bg-[#00783E] hover:bg-[#006633] text-white text-sm px-4 py-2 rounded"
                    >
                      Check
                    </Button>
                    <Button
                      onClick={() => {
                        setFeedback(true);
                        setHasError(false);
                      }}
                      className="bg-gray-400 hover:bg-gray-500 text-white text-sm px-4 py-2 rounded"
                    >
                      Skip
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-lg ${feedback ? "bg-[#008545]/10 border border-[#008545]" : "bg-yellow-50 border border-yellow-200"} flex-1`}>
                    <p className={`font-medium text-sm ${feedback ? "text-[#008545]" : "text-yellow-800"}`}>
                      {practiceQuestions[currentQuestion].isMonotonic ? 
                        "Yes, this function is monotonic!" : 
                        "No, this function is not monotonic!"
                      }
                    </p>
                  </div>
                  {!isComplete && feedback && currentQuestion < practiceQuestions.length - 1 && (
                    <div className="glow-button simple-glow">
                      <Button
                        onClick={nextQuestion}
                        className="bg-[#008545] hover:bg-[#00703d] text-white text-sm px-4 py-2 rounded"
                      >
                        Continue
                      </Button>
                    </div>
                  )}
                  {feedback && currentQuestion === practiceQuestions.length - 1 && (
                    <div className="glow-button simple-glow">
                      <Button
                        onClick={resetQuestions}
                        className="bg-[#008545] hover:bg-[#00703d] text-white text-sm px-4 py-2 rounded flex items-center gap-2"
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
      </div>
    </>
  );
};

export default MonotonicFunction;