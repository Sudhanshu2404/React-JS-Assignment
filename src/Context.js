import React, { useContext, useEffect, useState, useReducer } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

//Creating Context
const AppContext = React.createContext();

// API base url
let API =
  "https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=";

const questionsID = [
  "AreaUnderTheCurve_901",
  "BinomialTheorem_901",
  "DifferentialCalculus2_901",
];

// Defining App provider
const AppProvider = ({ children }) => {
  // State for question indexing
  const [index, setIndex] = useState(0);
  const [prevHandle, setPrevHandle] = useState("");

  // Defining initial state
  const initialstate = {
    index: index,
    ques: questionsID[index],
  };

  //   Defining reducer function
  const reducer = (state, action) => {
    if (action.type === "Next" && index <= questionsID.length - 1) {
      setPrevHandle("");
      return {
        ...state,
        index: action.payload.index + 1,
        ques: questionsID[index],
      };
    } else if (action.type === "Prev" && index >= 0) {
      if (action.payload.index === 0) {
        setPrevHandle("There is no previous question!");
      }
      return {
        ...state,
        index: action.payload.index - 1,
        ques: questionsID[index],
      };
    } else if (index > questionsID.length - 1) {
      setIndex(0);
      return {
        ...state,
        ques: questionsID[0],
      };
    }
    return state;
  };

  //   Creating Reducer function
  const [state, dispatch] = useReducer(reducer, initialstate);

  const [question, setQuestion] = useState("");

  useEffect(() => {
    try {
      fetch(`${API}${state.ques}`) //Fetching URL
        .then((res) => res.json())
        .then((data) => {
          return setQuestion(data[0].Question);
        });
    } catch (error) {
      setQuestion(error);
    }
  }, [state]);

  return (
    <>
      <Nav />
      <div className="question-box">
        <h1 className="question-box--heading">Questions</h1>
        <AppContext.Provider
          className={"question-box--question"}
          value={`Ques${index + 1}: ${question}`}
        >
          {children}
        </AppContext.Provider>
        <div className="button">
          <button
            className="button--btn1"
            onClick={() => {
              setIndex((prevIndex) => {
                if (prevIndex <= 0) {
                  return prevIndex;
                } else {
                  return prevIndex - 1;
                }
              });
              dispatch({
                type: "Prev",
                payload: { index: index, ques: state.ques },
              });
            }}
          >
            {" << Previous "}
          </button>
          <button
            className="button--btn2"
            onClick={() => {
              setIndex((prevIndex) => {
                return prevIndex + 1;
              });
              dispatch({
                type: "Next",
                payload: { index: index, ques: state.ques },
              });
            }}
          >
            {" Next  >>"}
          </button>
        </div>
      <div className="Prev-handle">
        <h2>{prevHandle}</h2>
      </div>
      </div>

      <Footer />
    </>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
