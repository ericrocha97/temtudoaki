import * as React from 'react';
import { Provider, Button as PaperButton, Paragraph, Dialog, Portal } from 'react-native-paper';

interface CustomDialogProps {
  visible: boolean;
  title: string;
  message: string;
  type: string;
  onClose: (status: boolean) => void;
}

const CustomDialog = (props: CustomDialogProps) => {
  return (
    <Provider>
      <Portal>
        <Dialog visible={props.visible} onDismiss={() => props.onClose(false)}>
          <Dialog.Title>{props.title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{props.message}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={() => props.onClose(false)}>OK</PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  )
}

export default CustomDialog;