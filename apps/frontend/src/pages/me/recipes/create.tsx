import Head from 'next/head';
import { headTitle } from '@fe/utils';
import { SectionTitle } from '@fe/components';
import { HydrateReactQueryState } from '../../../server/server-react-query';
import { SignedInGuard } from '../../../server/server-guards';
import { GetServerSideProps } from 'next/types';
import { CapsuleTabs, Form, List } from 'antd-mobile';
import {
  AppForm,
  HiddenField,
  PickerBasedSelectField,
  StepperField,
  SubmitButton,
  TextAreaField,
  TextField,
} from '@fe/form';
import React from 'react';
import {
  ClockCircleOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {
  useIngredientsSelection,
  IngredientsSearchBar,
  IngredientsSearchResultList,
  IngredientsSearch,
} from '@fe/ingredients';
import {
  FormValidationErrorMessage,
  FormValidationOrApiError,
} from '@fe/errors';
import { useCreateRecipe } from '@fe/recipes';

export const getServerSideProps: GetServerSideProps = HydrateReactQueryState(
  SignedInGuard()
);

export default function CreateYourRecipePage() {
  const [createRecipe, loading, error] = useCreateRecipe();

  return (
    <>
      <Head>
        <title>{headTitle('Dodaj przepis')}</title>
      </Head>

      <main>
        <SectionTitle className="mb-6">Dodaj przepis</SectionTitle>

        <AppForm
          className="pb-8"
          onSubmit={(formValues) =>
            createRecipe({
              ...formValues,
              ingredients:
                formValues.ingredients && Object.values(formValues.ingredients),
            })
          }
          error={error}
          footerClassName="fixed bottom-20 left-4 right-4"
          submitBtn={
            <div className="bg-white">
              <SubmitButton loading={loading} block={true} fill="outline">
                Zapisz
              </SubmitButton>
            </div>
          }
        >
          <CapsuleTabs>
            <CapsuleTabs.Tab title="Ogólne" key="general" forceRender={true}>
              <GeneralTab error={error} />
            </CapsuleTabs.Tab>

            <CapsuleTabs.Tab
              title="Składniki"
              key="ingredients"
              forceRender={true}
            >
              <IngredientsTab error={error} />
            </CapsuleTabs.Tab>

            <CapsuleTabs.Tab
              title="Instrukcje"
              key="instructions"
              forceRender={true}
            >
              <InstructionsTab error={error} />
            </CapsuleTabs.Tab>
          </CapsuleTabs>
        </AppForm>
      </main>
    </>
  );
}

interface GeneralTabProps {
  error: FormValidationOrApiError | null;
}

function GeneralTab({ error }: GeneralTabProps) {
  return (
    <>
      <TextField name="name" label="Tytuł" error={error} />

      <TextAreaField name="description" label="Opis" rows={3} error={error} />
    </>
  );
}

interface IngredientsTabProps {
  error: FormValidationOrApiError | null;
}

function IngredientsTab({ error }: IngredientsTabProps) {
  const {
    selectedIngredients,
    selectIngredient,
    unselectIngredient,
    isIngredientSelected,
  } = useIngredientsSelection();

  return (
    <>
      <div className="border-b mb-3">
        <StepperField
          name="portions"
          min={1}
          initialValue={4}
          error={error}
          label={
            <div className="flex items-center">
              <TeamOutlined className="mr-2" />
              Ilość porcji
            </div>
          }
        />
      </div>

      <IngredientsSearch>
        <IngredientsSearchBar className="mb-3" />

        <FormValidationErrorMessage name="ingredients" error={error} />

        <div className="overflow-y-auto">
          <IngredientsSearchResultList
            selectIngredient={selectIngredient}
            isIngredientSelected={isIngredientSelected}
          />

          {selectedIngredients.length > 0 && (
            <>
              <h5 className="text-2xl text-default font-medium mt-7 mb-3">
                Składniki
              </h5>

              <List>
                {selectedIngredients.map((ingredient) => (
                  <List.Item key={ingredient.id}>
                    <HiddenField
                      name={['ingredients', ingredient.id, 'id']}
                      initialValue={ingredient.id}
                      noStyle={true}
                    />

                    <StepperField
                      name={['ingredients', ingredient.id, 'quantity']}
                      min={1}
                      error={error}
                      label={ingredient.name}
                      initialValue={1}
                      noStyle={true}
                      suffix={
                        <div className="ml-2 flex items-center">
                          <PickerBasedSelectField
                            name={['ingredients', ingredient.id, 'unit']}
                            error={error}
                            noStyle={true}
                            initialValue="szt."
                            // TODO Extract to enum? Or <UnitSelect />
                            options={[
                              { value: 'szt.', label: 'szt.' },
                              { value: 'l', label: 'l' },
                              { value: 'ml', label: 'ml' },
                              { value: 'g', label: 'g' },
                              { value: 'łyżki', label: 'łyżki' },
                              { value: 'łyżeczki', label: 'łyżeczki' },
                              { value: 'szklanki', label: 'szklanki' },
                            ]}
                          />

                          <button
                            className="ml-3 text-sm text-red-500"
                            onClick={() => unselectIngredient(ingredient.id)}
                          >
                            Usuń
                          </button>
                        </div>
                      }
                    />
                  </List.Item>
                ))}
              </List>
            </>
          )}
        </div>
      </IngredientsSearch>
    </>
  );
}

interface InstructionsTabProps {
  error: FormValidationOrApiError | null;
}

function InstructionsTab({ error }: InstructionsTabProps) {
  return (
    <>
      <div className="border-b mb-3">
        <StepperField
          name="preparationTime"
          min={5}
          initialValue={30}
          step={5}
          error={error}
          suffix="min"
          label={
            <div className="flex items-center">
              <ClockCircleOutlined className="mr-2" />
              Czas przygotowania
            </div>
          }
        />
      </div>

      <div className="instructions-field">
        <Form.Array
          name="instructions"
          renderAdd={() => (
            <PlusCircleOutlined className="text-primary text-xl" />
          )}
          initialValue={[{}]}
        >
          {(fields, { add, remove }) =>
            fields.map(({ index }) => (
              <>
                <button
                  type="button"
                  className="text-primary text-xl block mx-auto"
                  onClick={() => add({}, index)}
                >
                  <PlusCircleOutlined />
                </button>

                <div className="flex items-center">
                  <button
                    type="button"
                    className="text-primary mr-2"
                    onClick={() => remove(index)}
                  >
                    <MinusCircleOutlined />
                  </button>

                  <h6 className="text-sm text-secondary font-normal">
                    Krok {index + 1}
                  </h6>
                </div>

                <TextAreaField
                  errorNamePrefix="instructions,"
                  name={[index, 'step']}
                  rows={3}
                  error={error}
                  placeholder="Wpisz instrukcje ..."
                />
              </>
            ))
          }
        </Form.Array>

        <FormValidationErrorMessage name="instructions" error={error} />
      </div>
    </>
  );
}
