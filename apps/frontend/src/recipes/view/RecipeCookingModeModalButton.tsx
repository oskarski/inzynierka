import { IRecipe } from '../api';
import React, { useState } from 'react';
import { Button, Mask, PageIndicator, SafeArea } from 'antd-mobile';
import {
  BarsOutlined,
  CloseOutlined,
  LeftOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { LinkButton, SectionSubTitle } from '@fe/components';

interface RecipeCookingModeModalButtonProps {
  recipe: IRecipe;
  portionsProportion: number;
}

export const RecipeCookingModeModalButton = ({
  recipe,
  portionsProportion,
}: RecipeCookingModeModalButtonProps) => {
  const [visible, toggleVisible] = useState(false);

  return (
    <>
      <Mask visible={visible} color="white" opacity={100}>
        <RecipeCookingModeModalContent
          recipe={recipe}
          portionsProportion={portionsProportion}
          onClose={() => toggleVisible(false)}
        />
      </Mask>

      <Button block={true} color="primary" onClick={() => toggleVisible(true)}>
        Gotujemy!
      </Button>
    </>
  );
};

interface RecipeCookingModeModalContentProps {
  recipe: IRecipe;
  portionsProportion: number;
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

  const resetStepper = () => setStep(0);

  return {
    stepIndex,
    stepsTotal,
    canGoForward: canGoForward(stepIndex),
    canGoBack: canGoBack(stepIndex),
    goToPrevStep,
    goToNextStep,
    resetStepper,
  };
};

function RecipeCookingModeModalContent({
  recipe,
  portionsProportion,
  onClose,
}: RecipeCookingModeModalContentProps) {
  const {
    stepIndex,
    stepsTotal,
    canGoForward,
    canGoBack,
    goToPrevStep,
    goToNextStep,
    resetStepper,
  } = useStepper(recipe.instructions.length);

  const [view, setView] = useState<
    'single-instruction' | 'ingredients-list' | 'instructions-list'
  >('single-instruction');

  const currentInstruction = recipe.instructions[stepIndex];

  return (
    <div className="flex flex-col justify-between h-screen px-4 py-6">
      <button
        onClick={() => {
          resetStepper();
          onClose();
        }}
        className="absolute right-4 top-6 text-2xl"
      >
        <CloseOutlined />
      </button>

      {view === 'single-instruction' && (
        <>
          <div>
            <SectionSubTitle className="text-center mb-4">
              Krok {stepIndex + 1} z {stepsTotal}
            </SectionSubTitle>

            <div className="fex items-center space-x-4">
              <LinkButton
                onClick={() => setView('ingredients-list')}
                className="inline-flex items-center"
              >
                <BarsOutlined className="flex leading-none text-base mr-2" />
                Pokaż składniki
              </LinkButton>

              <LinkButton
                onClick={() => setView('instructions-list')}
                className="inline-flex items-center"
              >
                <ReadOutlined className="flex leading-none text-base mr-2" />
                Pokaż wszystkie kroki
              </LinkButton>
            </div>
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
        </>
      )}

      {view === 'ingredients-list' && (
        <>
          <button
            className="absolute left-4 top-6 text-2xl"
            onClick={() => setView('single-instruction')}
          >
            <LeftOutlined />
          </button>

          <SectionSubTitle className="text-center mb-4">
            Składniki
          </SectionSubTitle>

          <ul className="list-disc list-inside text-xl space-y-2 pt-4 h-full overflow-y-auto">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.name} -{' '}
                {+(ingredient.quantity * portionsProportion).toFixed(2)}{' '}
                {ingredient.unit}
              </li>
            ))}
          </ul>
        </>
      )}

      {view === 'instructions-list' && (
        <>
          <button
            className="absolute left-4 top-6 text-2xl"
            onClick={() => setView('single-instruction')}
          >
            <LeftOutlined />
          </button>

          <SectionSubTitle className="text-center mb-4">
            Instrukcje
          </SectionSubTitle>

          <div className="pt-4 h-full overflow-y-auto">
            {recipe.instructions.map(({ step }, i) => (
              <React.Fragment key={i}>
                <SectionSubTitle className="mb-2">
                  Krok {i + 1}:
                </SectionSubTitle>

                <p className="text-lg text-secondary mb-4">{step}</p>
              </React.Fragment>
            ))}
          </div>
        </>
      )}

      <SafeArea position="bottom" />
    </div>
  );
}
