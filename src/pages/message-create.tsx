import { Button } from "@react-md/button";
import { DialogFooter } from "@react-md/dialog";
import {
  Checkbox,
  Form,
  FormMessage,
  TextArea,
} from "@react-md/form";
import React, { ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextContainer } from "react-md";
import { useDispatch } from "react-redux";
import { addMessageAsync } from "../actions/messages";
import Container from "../components/container";
import { VISIBILITY } from "../types";

interface FormData {
  text?: string;
  private?: "yes" | "";
}

export default function MessageCreate(): ReactElement {
  const {
    control,
    reset,
    handleSubmit,
    errors: { text },
  } = useForm<FormData>({ mode: "onChange" });


  const dispatch = useDispatch();
  const doSubmit = (data: FormData) => {
    (addMessageAsync({
      text: data?.text || "<No message>",
      visibility: data?.private === "yes" ? VISIBILITY.PRIVATE : VISIBILITY.PUBLIC
    }))(dispatch).then
  };

  return (
    <TextContainer>
      <Text type="headline-4">Créer un nouveau message</Text>
      <Container>
        <Form
          onReset={() => {
            reset({
              text: "",
              private: "",
            });
          }}
          onSubmit={handleSubmit(doSubmit)}
        >
          <Controller
            as={<TextArea id="mc-text" animate />}
            control={control}
            rules={{
              required: "Le texte est obligatoire",
              maxLength: {
                value: 500,
                message: "La taille maximale est de 500 caractères",
              },
            }}
            id="mc-text-controller"
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
            id="mc-private"
            name="private"
            label="Ce message est privé"
            defaultValue=""
            defaultChecked={false}
          />
          <DialogFooter align="end">
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
              type="submit"
              theme="primary"
              themeType="outline"
            >
              Ajouter
          </Button>
          </DialogFooter>
        </Form>
      </Container>
    </TextContainer>
  );
}