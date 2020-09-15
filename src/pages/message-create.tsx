/*
import React, { ReactElement, useCallback } from 'react'
import { TextContainer, Text, Form, TextArea, Checkbox, Button } from 'react-md'

export default function MessageCreate(): ReactElement {
  // const dispatch = useDispatch();
  const submitForm = useCallback((message) => {
    console.log(message.target);
  }, []);
  return (
    <TextContainer>
      <Text type="headline-4">Créer un nouveau message</Text>
      <Form onSubmit={submitForm}>
        <TextArea
          id="text"
          label="Contenu du message"
          placeholder="Saisissez vorte message"
          animate
        />
        <Checkbox id="visibility" label="Ce message est privé"/>
        <Button type="submit" theme="primary" themeType="outline">Ajouter</Button>
      </Form>
    </TextContainer>
  )
}
*/
import React, { ReactElement, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@react-md/button";
import { DialogFooter } from "@react-md/dialog";
import {
  Checkbox,
  Form,
  FormMessage,
  TextField,
} from "@react-md/form";
import { CircularProgress } from "@react-md/progress";
import { useTimeout } from "@react-md/utils";
import { Text, TextContainer } from "react-md";

interface FormData {
  text: string;
  private: "yes" | "";
}

interface State {
  loading: boolean;
  data: FormData | null;
}

export default function MessageCreate(): ReactElement {
  const {
    control,
    reset,
    handleSubmit,
    errors: { text },
  } = useForm<FormData>({ mode: "onChange" });

  const [{ data, loading }, setState] = useState<State>({
    loading: false,
    data: null,
  });

  const [start] = useTimeout(() => {
    setState((prevState) => ({ loading: false, data: prevState.data }));
  }, 10000);
  useEffect(() => {
    if (loading) {
      start();
    }
  }, [loading, start]);

  return (
    <TextContainer>
      <Text type="headline-4">Créer un nouveau message</Text>
      <Form
        onReset={() => {
          setState({ loading: false, data: null });
          reset({
            text: "",
            private: "",
          });
        }}
        onSubmit={handleSubmit((data) => setState({ data, loading: true }))}
      >
        <Controller
          as={TextField}
          control={control}
          disabled={loading}
          rules={{
            required: "Le texte est obligatoire",
            maxLength: {
              value: 500,
              message: "La taille maximale est de 500 caractères",
            },
          }}
          id="mc-text"
          aria-describedby="mc-text-error"
          name="text"
          label="Contenu du message "
          placeholder="Veuillez entrer un texte"
          defaultValue=""
          error={!!text}
        />
        <FormMessage id="mc-text-error" error>
          {text?.message}
        </FormMessage>

        <Controller
          as={Checkbox}
          control={control}
          disabled={loading}
          id="mc-private"
          name="private"
          label="Ce message est privé"
          defaultValue=""
          defaultChecked={false}
        />
        <DialogFooter align="end">
          {loading ? (
            <CircularProgress id="rhf-submit-progress" centered={false} />
          ) : (
              <>
                <Button
                  id="mc-reset"
                  type="reset"
                  theme="secondary"
                  themeType="outline"
                >
                  Effacer
                </Button>
                <Button
                  id="mc-submit"
                  type={loading ? "button" : "submit"}
                  disabled={!!loading}
                  theme="primary"
                  themeType="outline"
                  aria-label={loading ? "Submitting" : undefined}
                >
                  Ajouter
                </Button>
              </>
            )}
        </DialogFooter>
      </Form>
      {data && (
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )}
    </TextContainer>
  );
}