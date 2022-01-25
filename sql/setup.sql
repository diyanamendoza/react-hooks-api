-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS hooks;

CREATE TABLE hooks (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  explanation TEXT NOT NULL,
  source TEXT NOT NULL
);

INSERT INTO hooks (title, explanation, source)
VALUES
  ('useReducer',
  'Used to store and update state(s), especially complex states with lots of values and dependencies. Accepts a reducer function as its first parameter, initial state as the second. Returns an array that holds current state value and a dispatch function (const [state, dispatch] = useReducer(reducer, initialState)). You can pass action objects (const action = { type: <action-type>}) to the dispatch function so you can use them later (dispatch(action)). The action object describes how to update the state (increase? decrease?). Action objects can have additional properties beyond type, and a payload, which is the piece of info that the action will add to state.',
  'https://blog.logrocket.com/guide-to-react-usereducer-hook/'
  ),
  ('useRef',
  'Used to create persisted mutable values (refs) and to access DOM elements. Accepts one argument as the initial value and returns a reference (const refersence = useRef(initialValue)), which has a special property called current (const value = reference.current). The value of the reference stays the same (persists) between component re-renderings. Updating the reference does NOT trigger a re-render of the component, so it is synchronous - the value is available right away (in contrast to state, where updating DOES re-render, and the new state is only updated after the re-render). Sample use case: focusing an input by assigning the input ref property to the return (e.g., inputRef ) from useRef() and using a useEffect to set inputRef.current.focus().',
  'https://dmitripavlutin.com/react-useref-guide/'
  ),
  ('useCallback',
  'Used to return the same function instance between renderings (aka memoization), thereby optimizing component rendering behavior. Receives a function as a parameter and an array of dependencies. Returns a memoized version of the callback that only changes if a dependency changes.',
  'https://dmitripavlutin.com/dont-overuse-react-usecallback/'
  )


