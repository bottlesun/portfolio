import React from 'react'
import {Pressable, StyleSheet, Text, View} from "react-native";
import CheckBoxUnchecked from "../assets/checkbox-unchecked.svg";
import CheckBoxChecked from "../assets/checkbox-checked.svg";
import DeleteIcon from "../assets/delete.svg";
import {useDispatch} from "react-redux";
import {deleteTodo, updateTodo} from "../redux/slices/todoSlice";

const TodoItem = ({...props}) => {
  const dispatch = useDispatch();

  return <View style={styles.itemContainer}>
    <Pressable
      hitSlop={10}
      style={styles.itemTextChecked}
      onPress={() => dispatch(updateTodo(props.id))}
    >
      {
        props.state === 'done' ? <CheckBoxChecked style={styles.itemCheckBoxCheckedIcon}/>
          : <CheckBoxUnchecked/>
      }
    </Pressable>
    <Text
      style={[styles.itemText, props.state === 'done' && styles.itemTextChecked]} >
      {props.text}
    </Text>

    <Pressable
      style={[
        styles.deleteButton,
        props.state === 'done' && styles.deleteButtonDone
      ]}
      hitSlop={10}
      onPress={() => dispatch(deleteTodo(props.id))}
    >
      <DeleteIcon/>
    </Pressable>
  </View>
}

export default TodoItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f7f8fa',
  },
  itemCheckBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    marginRight: 13,
    borderRadius: 6,
  },
  itemCheckBoxCheckedIcon: {
    shadowColor: '#000000',
    shadowOpacity: 0.14,
    shadowRadius: 15,
    lineHeight: 20,
    color: '#737373',
  },
  deleteText: {
    marginRight: 'auto',
    paddingRight: 10,
    fontSize: 15,
    lineHeight: 20,
    color: '#737373',
  },
  itemText: {
    marginRight: 'auto',
    paddingRight: 25,
    fontSize: 15,
    lineHeight: 20,
    color: '#737373',
  },
  itemTextChecked: {
    textDecorationLine: 'line-through',
    opacity: 0.3,
  },
  deleteButton: {
    opacity: 0.8
  },
  deleteButtonDone: {
    opacity: 0.3
  }

});
