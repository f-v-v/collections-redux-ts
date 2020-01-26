import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';

type MyRootState = {
    isLoading:boolean;
    mystr:string
};
type MyExtraArg = undefined;
type MyThunkResult<R> = ThunkAction<R, MyRootState, MyExtraArg, Action>;
// Next Line:
// It is important to use Action as last type argument, does not work with any.
type MyThunkDispatch = ThunkDispatch<MyRootState, MyExtraArg, Action>;
const SET_STRING = 'SET_STRING'
const SET_LOADING = 'SET_LOADING'
const myDefaultState: MyRootState = {isLoading:true, mystr:""}

interface ISettring {
    type: typeof SET_STRING;
    payload:string
  }

interface ISetLoading {
    type: typeof SET_LOADING;
}

  export type myStringActionTypes =
    | ISettring
    | ISetLoading

const setMyStringReducer = (
    state = myDefaultState,
    action: myStringActionTypes
  ): MyRootState => {
    switch (action.type) {
      case SET_STRING:
        return {...state,
          mystr:action.payload,
        };
      case SET_LOADING:
        return {...state,
          isLoading:true,
        };
      default:
        return state;
    }
  };

const setString = (str:string):myStringActionTypes => {
    return {
        type: SET_STRING,
        payload:str
    }
};
const setLoading = ():myStringActionTypes => {
    return {
        type: SET_LOADING,
    }
};

function getStr(str:string): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.95) {
          reject(new Error('Something bad happened'));
        } else {
          resolve(str);
        }
      }, 700);
    });
  }

const anotherThunkAction = (str:string): MyThunkResult<Promise<string>> => (dispatch, getState) => {
//   return Promise.resolve(true);
//   return Promise.resolve<string>(str);
    dispatch(setLoading())
    return getStr(str).then(
        (str) => {
            dispatch(setString(str))
        return str
        }
    )

};

export interface IProps {
  anotherThunkAction: (str:string) => Promise<string>;
}

export class Foo extends React.Component<IProps> {
  componentDidMount() {
    this.props.anotherThunkAction('hello').then(value => {
      console.log('hello world, got', value);
    });
    this.props.anotherThunkAction('hello').then()
  }
  render() {
    return null;
  }
}

const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({
  anotherThunkAction: (str:string) => dispatch(anotherThunkAction(str)),
});

export default connect(
  () => undefined,
  mapDispatchToProps
)(Foo);