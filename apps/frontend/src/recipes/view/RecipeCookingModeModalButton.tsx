import { IRecipe } from '../api';
import React, { useState } from 'react';
import { Button, Mask, PageIndicator } from 'antd-mobile';
import { CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';

interface RecipeCookingModeModalButtonProps {
  recipe: IRecipe;
}

export const RecipeCookingModeModalButton = ({
  recipe,
}: RecipeCookingModeModalButtonProps) => {
  const [visible, toggleVisible] = useState(false);

  return (
    <>
      <Mask visible={visible} color="white" opacity={100}>
        <RecipeCookingModeModalContent
          recipe={recipe}
          onClose={() => toggleVisible(false)}
        />
      </Mask>

      <div className="fixed bottom-20 left-4 right-4">
        <Button
          block={true}
          color="primary"
          onClick={() => toggleVisible(true)}
        >
          Gotujemy!
        </Button>
      </div>
    </>
  );
};

interface RecipeCookingModeModalContentProps {
  recipe: IRecipe;
  onClose: () => void;
}

const useStepper = (stepsTotal: number) => {
  const [stepIndex, setStep] = useState(0);

  const canGoForward = (step: number) => step < stepsTotal - 1;

  const canGoBack = (step: number) => step > 0;

  const goToPrevStep = () =>
    setStep((prev) => (canGoBack(prev) ? prev - 1 : prev));

  const goToNextStep = () =>
    setStep((prev) => (canGoForward(prev) ? prev + 1 : prev));

  return {
    stepIndex,
    stepsTotal,
    canGoForward: canGoForward(stepIndex),
    canGoBack: canGoBack(stepIndex),
    goToPrevStep,
    goToNextStep,
  };
};

function RecipeCookingModeModalContent({
  recipe,
  onClose,
}: RecipeCookingModeModalContentProps) {
  const {
    stepIndex,
    stepsTotal,
    canGoForward,
    canGoBack,
    goToPrevStep,
    goToNextStep,
  } = useStepper(recipe.instructions.length);

  const currentInstruction = recipe.instructions[stepIndex];

  return (
    <div className="flex flex-col justify-between h-screen px-4 py-6">
      <div>
        <button onClick={onClose} className="absolute right-4 top-4 text-2xl">
          <CloseOutlined />
        </button>

        <h4 className="text-xl text-default font-medium text-center mb-4">
          Krok {stepIndex + 1} z {stepsTotal}
        </h4>
      </div>

      <p
        className={classNames('grow-0 text-center mb-4 overflow-y-auto', {
          'text-2xl': currentInstruction.step.length < 330,
          'text-xl':
            currentInstruction.step.length >= 330 &&
            currentInstruction.step.length < 400,
          'text-lg':
            currentInstruction.step.length >= 400 &&
            currentInstruction.step.length < 500,
          'text-base':
            currentInstruction.step.length >= 500 &&
            currentInstruction.step.length < 650,
          'text-sm': currentInstruction.step.length >= 650,
        })}
      >
        {currentInstruction.step}
      </p>

      <div>
        <div className="mb-4">
          {canGoForward && (
            <Button block={true} color="primary" onClick={goToNextStep}>
              Kolejny krok
            </Button>
          )}

          {!canGoForward && (
            <Button block={true} color="primary" onClick={onClose}>
              Kończymy na dziś!
            </Button>
          )}
        </div>

        <div className="mb-6">
          <Button
            block={true}
            color="primary"
            fill="outline"
            onClick={goToPrevStep}
            disabled={!canGoBack}
          >
            Poprzedni krok
          </Button>
        </div>

        <PageIndicator
          total={stepsTotal}
          current={stepIndex}
          color="primary"
          className="justify-center"
          style={{
            '--dot-size': '10px',
            '--active-dot-size': '30px',
            '--dot-border-radius': '50%',
            '--active-dot-border-radius': '15px',
            '--dot-spacing': '8px',
          }}
        />
      </div>
    </div>
  );
}
