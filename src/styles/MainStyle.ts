import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: "100%",
    marginTop: 10
  },
  cancelButton: {
    backgroundColor: "#c00"
  },
  maskedInput: {
    flexGrow: 1,
    height: 40,
    fontSize: 18,
    borderBottomColor: "#999",
    borderBottomWidth: 1,
    borderStyle: "solid",
    alignSelf: "flex-start"
  },
  containerMask: {
    flexDirection: "row",
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10
  },
  errorMessage: {
    alignSelf: "flex-start",
    marginLeft: 16,
    color: "#f00",
    fontSize: 12
  }
});

export default styles;
