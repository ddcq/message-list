import { Button } from '@react-md/button'
import { DialogFooter } from '@react-md/dialog'
import { Checkbox, Form, FormMessage, TextArea } from '@react-md/form'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, TextContainer } from 'react-md'
import { useDispatch } from 'react-redux'
import { addMessageAsync } from '../actions/messages'
import Container from '../components/container'
import { AppThunkDispatch } from '../store'
import { VISIBILITY } from '../types'

interface FormData {
  text?: string
  private?: boolean
}

export default function MessageCreate(): ReactElement {
  const {
    control,
    reset,
    handleSubmit,
    errors: { text },
  } = useForm<FormData>({ mode: 'onChange' })

  const dispatch: AppThunkDispatch = useDispatch()
  const router = useRouter()
  const doSubmit = (data: FormData) => {
    dispatch(
      addMessageAsync({
        text: data?.text || '<No message>',
        visibility: data?.private ? VISIBILITY.PRIVATE : VISIBILITY.PUBLIC,
      })
    ).then(() => {
      router.push('/')
    })
  }

  return (
    <TextContainer>
      <Text type="headline-4">Créer un nouveau message</Text>
      <Container>
        <Form
          onReset={() => {
            reset({
              text: '',
              private: false,
            })
          }}
          onSubmit={handleSubmit(doSubmit)}
        >
          <Controller
            as={<TextArea id="mc-text" animate />}
            control={control}
            rules={{
              required: 'Le texte est obligatoire',
              maxLength: {
                value: 500,
                message: 'La taille maximale est de 500 caractères',
              },
            }}
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
            // as={Checkbox}
            control={control}
            name="private"
            defaultValue=""
            defaultChecked={false}
            render={({ onChange, value, name }) => (
              <Checkbox
                label="Ce message est privé"
                id="mc-private"
                onChange={(e) => onChange(e.target.checked)}
                checked={value}
                name={name}
              />
            )}
          />
          <DialogFooter align="end">
            <Button id="mc-reset" type="reset" theme="secondary">
              Effacer
            </Button>
            <Button id="mc-submit" type="submit" theme="primary">
              Ajouter
            </Button>
          </DialogFooter>
        </Form>
      </Container>
    </TextContainer>
  )
}
